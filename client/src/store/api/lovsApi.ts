import api from '.'

export const extendedApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCountries: builder.mutation({
            query: (url: string) => ({ url }),
            transformResponse: (res: { label: string; _id: string }[]) => {
                return res.map((el) => ({ label: el.label, value: el._id }))
            },
        }),
    }),
})

export const { useGetCountriesMutation } = extendedApi
