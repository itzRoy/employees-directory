import {Router} from 'express';
import {activateEmployees, deactivateEmployees, deleteEmployee, getEmployee, getEmployees, insertEmployee, updateEmployee} from './controller.js';
import { getEmployeesSchema, validateEmployee } from './validation.schema.js';
import validator from '../middlware/validator.js';

const router = Router();

router.get('/employees', validator(getEmployeesSchema, 'query'), getEmployees);
router.get('/employees/:id', getEmployee);
router.post('/employees', validateEmployee, insertEmployee);
router.post('/employees/activate', activateEmployees);
router.post('/employees/deactivate', deactivateEmployees);
router.put('/employees/:id', validateEmployee, updateEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;