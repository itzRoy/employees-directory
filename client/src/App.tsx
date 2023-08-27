import { Routes, Route, BrowserRouter } from 'react-router-dom'
import config from '../config'
import { EmployeesTable, Form } from './components/organisms'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={config.routes.table}>
                    <Route index element={<EmployeesTable />} />
                    <Route path={config.routes.add} element={<Form title='Add New Employee' />} />
                    <Route path={config.routes.edit.link} element={<Form isEdit title='Edit Employee' />} />
                    <Route path={config.routes.view.link} element={<Form isView title='View Employee' />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
