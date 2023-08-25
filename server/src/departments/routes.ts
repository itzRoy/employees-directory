import {Router} from 'express';
import { getDepartments } from './controller.js';

const router = Router();

router.get('/departments', getDepartments);

export default router;