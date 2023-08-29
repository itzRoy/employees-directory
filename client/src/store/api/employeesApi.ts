import { DataTableStateEvent } from 'primereact/datatable'
import api from '.'
import config from '../../../config'
import { TInitialValues } from '../../components/organisms/Form'
import { fileDownloader } from '../../utils'

const {
    endpoints: { employee, employees, activateEmployees, deactivateEmployees, exportEmployees },
} = config

export type TEmployeeData = {
    country: { _id?: string; value?: string; label: string }
    department: { _id?: string; value?: string; label: string }
    image: string
    title: string
    name: string
    _id: string
}

type TEmployees = {
    totalItems: number
    totalPages: number
    data: TEmployeeData[]
}

export type TInsertEmployee = {
    name?: string
    title: string
    department?: string
    country?: string
    image?: string
}

export type TEmployeeQuery = {
    page: number
    limit: number
    filter?:
        | {
              country?: string
              department?: string
          }
        | string
    sort: DataTableStateEvent | string
    search?: string
}
export const extendedApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.mutation<TEmployees, TEmployeeQuery>({
            query: (arg) => {
                const params = { ...arg }

                params.filter = JSON.stringify(arg.filter)

                params.sort = !(typeof arg.sort === 'string')
                    ? JSON.stringify({ [arg.sort.sortField]: arg.sort.sortOrder })
                    : JSON.stringify({})

                const req: {
                    url: string
                    method: string
                    params?: typeof params
                } = {
                    url: employees,
                    method: 'GET',
                }

                req.params = params

                return req
            },
        }),
        getEmployee: builder.mutation<TInitialValues, string>({
            query: (id: string) => {
                const req: {
                    url: string
                    method: string
                } = {
                    url: employee(id),
                    method: 'GET',
                }

                return req
            },
            transformResponse: (data: TEmployeeData) => {
                const dataCopy = { ...data }

                dataCopy.country = { value: data.country._id, label: data.country.label }

                dataCopy.department = { value: data.department._id, label: data.department.label }
                return dataCopy
            },
        }),
        insertEmployee: builder.mutation<TEmployees, TInsertEmployee>({
            query: (body) => ({
                url: employees,
                method: 'POST',
                body,
            }),
        }),
        updateEmployee: builder.mutation<TEmployees, { body: TInsertEmployee; id: string }>({
            query: ({ body, id }) => ({
                url: employee(id),
                method: 'PUT',
                body,
            }),
        }),
        deleteEmployee: builder.mutation({
            query: (id: string) => ({
                url: employee(id),
                method: 'DELETE',
            }),
        }),
        employeesStatus: builder.mutation({
            query: ({ ids, type }: { ids: string[]; type: 'activate' | 'deactivate' }) => ({
                url: type === 'activate' ? activateEmployees : deactivateEmployees,
                method: 'POST',
                body: { ids },
            }),
        }),
        exportEmployees: builder.mutation({
            query: () => ({
                url: exportEmployees,
                method: 'GET',
                responseHandler: async (response) => fileDownloader(await response.blob(), 'employees.xlsx'),
                cache: 'no-cache',
            }),
        }),
    }),
})

export const {
    useGetEmployeeMutation,
    useGetEmployeesMutation,
    useInsertEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
    useEmployeesStatusMutation,
    useExportEmployeesMutation,
} = extendedApi
