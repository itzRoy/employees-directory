import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import PageWrapper from '../HOC/PageWrapper'
import {
    TEmployeeData,
    TEmployeeQuery,
    useDeleteEmployeeMutation,
    useGetEmployeesMutation,
} from '../../store/api/employeesApi'
import { ChangeEvent, useEffect, useMemo, useReducer } from 'react'
import { TableHeader } from '../molecules'
import useDebounce from '../../hooks/useDebounce'
import { Actions } from '../molecules'
import { useNavigate } from 'react-router'
import config from '../../../config'
import { AsyncSelect } from '../atoms'

const initialTableState: TEmployeeQuery = {
    page: 1,
    limit: 25,
    sort: '',
    filter: {},
    search: '',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: TEmployeeQuery, action: any) => {
    switch (action.type) {
        case 'SET_PAGE':
            return { ...state, page: action.page, limit: action.limit }

        case 'SORT':
            return { ...state, sort: action.sort }

        case 'SEARCH':
            return { ...state, search: action.search }

        case 'FILTER':
            return { ...state, filter: { ...(state.filter as Record<string, string>), ...action.filter } }

        default:
            return state
    }
}

const EmployeesTable = PageWrapper(() => {
    const navigation = useNavigate()
    const [tableState, tableDispatcher] = useReducer(reducer, initialTableState)
    const { page, limit, sort, search, filter } = tableState

    const filterValue = useMemo(
        () =>
            Object.keys(filter).reduce<Record<string, string>>((accumulator, k) => {
                if (filter?.[k]?.value) {
                    accumulator[k] = filter[k].value
                }
                return accumulator
            }, {}),
        [filter],
    )

    const [fetchData, { data, isLoading }] = useGetEmployeesMutation()
    const [deleteEmployee, { reset: resetDelete, data: deleteData }] = useDeleteEmployeeMutation()

    const debouncedSearchValue = useDebounce(search, 500)

    useEffect(() => {
        fetchData({ page, limit, sort, filter: filterValue, search: debouncedSearchValue })
    }, [fetchData, page, limit, sort, filterValue, debouncedSearchValue])

    useEffect(() => {
        if (deleteData) {
            fetchData({ page, limit, sort, search: debouncedSearchValue })

            resetDelete()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteData])

    const onDelete = (id: string) => () => deleteEmployee(id)

    const renderFilterField = (url: string, name: string) => () => (
        <AsyncSelect
            url={url}
            isClearable
            isSearchable
            selectedOption={filter?.[name]}
            setSelectedOption={(value) =>
                tableDispatcher({
                    type: 'FILTER',
                    filter: { [name]: value },
                })
            }
        />
    )

    return (
        <DataTable
            filters={{ 'country.label': { value: null, matchMode: 'equals' } }}
            globalFilterFields={['country.label', 'department.label']}
            filterDisplay='row'
            lazy
            pt={{
                header: { style: { borderTopLeftRadius: '10px', borderTopRightRadius: '10px' } },
                paginator: { root: { style: { borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' } } },
            }}
            showHeaders
            paginator
            header={
                <TableHeader
                    searchValue={search}
                    onSearchChange={(e: ChangeEvent<HTMLInputElement>) =>
                        tableDispatcher({ type: 'SEARCH', search: e.target.value })
                    }
                />
            }
            rows={limit}
            value={data?.data}
            loading={isLoading}
            scrollHeight='100%'
            style={{ height: '90%' }}
            first={(page - 1) * limit}
            totalRecords={data?.totalItems}
            rowsPerPageOptions={[5, 10, 25, 50]}
            sortField={sort.sortField}
            sortOrder={sort.sortOrder}
            onSort={(sort) => tableDispatcher({ type: 'SORT', sort })}
            onPage={(record) => {
                tableDispatcher({
                    type: 'SET_PAGE',
                    page: (record?.page || 0) + 1,
                    limit: record.rows,
                    first: record.first,
                })
            }}
        >
            <Column
                field='image'
                header='Image'
                body={(value) => <img alt='image' className='rounded-full' src={value.image} />}
            />
            <Column field='name' header='Name' sortable />
            <Column field='title' header='Title' sortable />
            <Column
                field='department.label'
                header='Department'
                sortable
                filter
                showFilterMenu={false}
                filterElement={renderFilterField(config.endpoints.departments, 'department')}
            />
            <Column
                field='country.label'
                filter
                showFilterMenu={false}
                filterElement={renderFilterField(config.endpoints.countries, 'country')}
                header='Country'
                sortable
            />
            <Column
                header='Actions'
                body={(data: TEmployeeData) => (
                    <Actions
                        onDelete={onDelete(data._id)}
                        onEdit={() => navigation(config.routes.edit.href(data._id))}
                        onView={() => navigation(config.routes.view.href(data._id))}
                    />
                )}
            />
        </DataTable>
    )
})

export default EmployeesTable
