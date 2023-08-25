import { NextFunction, Request, Response } from 'express';
import { createError } from '../utils/index.js';
import Country from './model.js';

const getCountries = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const countries = await Country.find();

    return res.status(200).json(countries);
    
  } catch (error) {
    
      
    return next(createError('something went wrong', 500));
  
  }
};

export { getCountries };