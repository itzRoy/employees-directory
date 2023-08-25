import {Router} from 'express';
import {getCountries} from './controller.js';

const router = Router();

router.get('/countries', getCountries);

export default router;