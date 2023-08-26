import { DataTableStateEvent } from 'primereact/datatable'
import api from '.'
import config from '../../../config'

const {
    endpoints: { employees },
} = config

export type TEmployeeData = {
    country: { _id: string; label: string }
    department: { _id: string; label: string }
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
        insertEmployee: builder.mutation<TEmployees, TInsertEmployee>({
            query: (args) => ({
                url: employees,
                method: 'POST',
                params: args,
            }),
        }),
        deleteEmployee: builder.mutation({
            query: (id: string) => ({
                url: employees + '/' + id,
                method: 'DELETE',
            }),
        }),
    }),
})

export const { useGetEmployeesMutation, useInsertEmployeeMutation, useDeleteEmployeeMutation } = extendedApi
