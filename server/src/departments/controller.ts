import { createError } from '../utils/index.js';
import Department from './model.js';

const getDepartments = async (req, res, next) => {

  try {
    const departments = await Department.find();

    return res.status(200).json(departments);
    
  } catch {

    return next(createError('something went wrong', 500));

  }
};

export { getDepartments};