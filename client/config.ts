export default {
    api: import.meta.env.VITE_APP_API,
    isGraphQL: import.meta.env.VITE_IS_GRAPHQL === 'false' ? false : true,

    endpoints: {
        employee: (id: string) => `/employees/${id}`,
        employees: '/employees',
        activateEmployees: '/employees/activate',
        deactivateEmployees: '/employees/deactivate',
        countries: '/countries',
        departments: '/departments',
    },

    routes: {
        table: '/',
        add: 'new',
        edit: {
            link: 'edit/:id',
            href: (id: string) => 'edit/' + id,
        },
        view: {
            link: 'view/:id',
            href: (id: string) => 'view/' + id,
        },
    },
}
