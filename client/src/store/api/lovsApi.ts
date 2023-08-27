import api from '.'

export const extendedApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCountries: builder.mutation({ query: (url: string) => ({ url }) }),
    }),
})

export const { useGetCountriesMutation } = extendedApi
