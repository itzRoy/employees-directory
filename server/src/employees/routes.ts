import {Router} from 'express';
import {deleteEmployee, getEmployees, insertEmployee, updateEmployee} from './controller.js';
import { getEmployeesSchema, validateEmployee } from './validation.schema.js';
import validator from '../middlware/validator.js';

const router = Router();

router.get('/employees', validator(getEmployeesSchema, 'query'), getEmployees);
router.post('/employees', validateEmployee, insertEmployee);
router.put('/employees/:id', validateEmployee, updateEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;