import { Routes, Route, BrowserRouter } from 'react-router-dom'
import config from '../config'
import { EmployeesTable } from './components/organisms'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={config.routes.table}>
                    <Route index element={<EmployeesTable />} />
                    <Route path={config.routes.add.link} element={<div>add</div>} />
                    <Route path={config.routes.edit.link} element={<div>edit</div>} />
                    <Route path={config.routes.view.link} element={<div>view</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
