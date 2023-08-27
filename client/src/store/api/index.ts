import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../../config'

const baseQuery = fetchBaseQuery({
    baseUrl: config.api,
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json')
        return headers
    },
})

const interceptor = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
    }

    return result
}

const api = createApi({
    baseQuery: interceptor,

    endpoints: () => ({}),
})

export default api
