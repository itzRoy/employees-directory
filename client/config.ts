export default {
    api: import.meta.env.VITE_APP_API,
    isGraphQL: import.meta.env.VITE_IS_GRAPHQL === 'false' ? false : true,

    endpoints: { employees: '/employees', countries: '/countries', departments: '/departments' },

    routes: {
        table: '/',
        edit: {
            link: 'edit/:id',
            href: (id: string) => 'edit/' + id,
        },
        add: {
            link: 'new/:id',
            href: (id: string) => 'new/' + id,
        },
        view: {
            link: 'view/:id',
            href: (id: string) => 'view/' + id,
        },
    },
}
