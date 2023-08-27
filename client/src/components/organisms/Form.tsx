import { Formik } from 'formik'
import { AsyncSelect, SvgButton, TextInput } from '../atoms'
import config from '../../../config'
import {
    TInsertEmployee,
    useGetEmployeeMutation,
    useInsertEmployeeMutation,
    useUpdateEmployeeMutation,
} from '../../store/api/employeesApi'
import PageWrapper from '../HOC/PageWrapper'
import { Loader, saveIcon } from '../../assets'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'

type TForm = {
    title: string
    isEdit?: boolean
    isView?: boolean
}
export type TInitialValues = {
    country?: { _id?: string; label: string; value?: string } | undefined
    countryInput?: string
    department?: { _id?: string; label: string; value?: string }
    departmentInput?: string
    name: string
    title: string
    image: string
}

const Form = PageWrapper(({ title, isEdit, isView }: TForm) => {
    const [insertEmployee, { isLoading, isError, error, isSuccess }] = useInsertEmployeeMutation()

    const [
        updateEmployee,
        { isLoading: isUpdateLoading, isError: isUpdateError, error: updateError, isSuccess: updateSuccess },
    ] = useUpdateEmployeeMutation()

    const [getEmployeeData, { data, isLoading: loading }] = useGetEmployeeMutation()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (isSuccess || updateSuccess) navigate(config.routes.table, { replace: true })
    }, [isSuccess, navigate, updateSuccess])

    useEffect(() => {
        if ((isEdit || isView) && id) {
            getEmployeeData(id)
        }
    }, [getEmployeeData, id, isEdit, isView])

    const initialValues: TInitialValues = {
        country: data?.country || undefined,
        countryInput: '',
        department: data?.department || undefined,
        departmentInput: '',
        name: data?.name || '',
        title: data?.title || '',
        image: data?.image || '',
    }

    const onSubmit = (values: TInitialValues) => {
        const normalizedValues: Record<string, unknown> = { ...values }

        normalizedValues.country = values.country?.value || values.countryInput || null

        normalizedValues.department = values.department?.value || values.departmentInput || null

        delete normalizedValues?.countryInput

        delete normalizedValues?.departmentInput

        Object.keys(normalizedValues).forEach((key) => {
            if (!normalizedValues[key]) delete normalizedValues[key]
        })

        if (isEdit && id) {
            updateEmployee({ body: normalizedValues as TInsertEmployee, id })
        } else {
            insertEmployee(normalizedValues as TInsertEmployee)
        }
    }

    const renderError = () => {
        if (error && 'data' in error) {
            if ('message' in (error.data as Record<string, string>))
                return <p className='text-red-700'>{(error.data as Record<string, string>).message}</p>
        }

        if (updateError && 'data' in updateError) {
            if ('message' in (updateError.data as Record<string, string>))
                return <p className='text-red-700'>{(updateError.data as Record<string, string>).message}</p>
        }
    }

    return (
        <div className=' bg-white p-5 rounded-lg'>
            <h2 className='mb-5 text-2xl'>{title}</h2>
            {!loading ? (
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <TextInput
                                name='name'
                                onChange={handleChange}
                                value={values.name}
                                placeholder='Your name'
                                disabled={isView}
                            />
                            <TextInput
                                name='title'
                                onChange={handleChange}
                                value={values.title}
                                placeholder='Your title'
                                disabled={isView}
                            />
                            <div className='flex gap-2'>
                                <AsyncSelect
                                    selectedOption={values.country}
                                    inputValue={values.countryInput}
                                    isClearable
                                    isSearchable
                                    disabled={isView}
                                    setInputValue={(val) =>
                                        handleChange({ target: { value: val, name: 'countryInput' } })
                                    }
                                    setSelectedOption={(val) =>
                                        handleChange({ target: { value: val, name: 'country' } })
                                    }
                                    url={config.endpoints.countries}
                                    label='Country'
                                />
                                <AsyncSelect
                                    selectedOption={values.department}
                                    inputValue={values.departmentInput}
                                    disabled={isView}
                                    isClearable
                                    isSearchable
                                    setInputValue={(val) =>
                                        handleChange({ target: { value: val, name: 'departmentInput' } })
                                    }
                                    setSelectedOption={(val) =>
                                        handleChange({ target: { value: val, name: 'department' } })
                                    }
                                    url={config.endpoints.departments}
                                    label='Department'
                                />
                            </div>

                            {!isView ? (
                                <SvgButton
                                    Svg={isLoading || isUpdateLoading ? <Loader /> : <img alt='save' src={saveIcon} />}
                                    text='Save'
                                    onClick={handleSubmit}
                                    className='bg-blue-800 hover:bg-blue-800 hover:scale-100 text-white self-start py-2 px-3'
                                />
                            ) : null}
                            {(isError || isUpdateError) && renderError()}
                        </form>
                    )}
                </Formik>
            ) : null}
        </div>
    )
})

export default Form
