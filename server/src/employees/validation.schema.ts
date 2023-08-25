import Joi from 'joi';
import mongoose, { isValidObjectId } from 'mongoose';
import { TEmployee } from './model.js';
import Country from '../countries/model.js';
import { createError, getRandomData } from '../utils/index.js';
import Department from '../departments/model.js';
import { NextFunction, Request, Response } from 'express';

const normalizeData = async (obj: TEmployee) => {
  try {
    let randomData;
    
    if (!obj.country || !obj.image || !obj.name) {
      randomData = await getRandomData();

      if (!obj.country) {obj.country = randomData.location.country;}
      if (!obj.image) {obj.image = randomData.picture.medium;}
      if (!obj.name) {obj.name = randomData.name.first;}
        
    }
    
    if (!isValidObjectId(obj.country)) {
      let country = await Country.findOne({label: obj.country});
      if (!country) {
        country = await Country.create({label: obj.country});
      }
      obj.country = country._id;
    }

    if (!isValidObjectId(obj.department)) {
      let department = await Department.findOne({label: obj.department});
      if (!department) {
        department = await Department.create({label: obj.department});
      }
    
      obj.department = department._id;
    }
    
    return obj;
  } catch { 
    return createError('something went wrong', 500);
  }
};

const emplyeeSchema = Joi.object({
  name: Joi.string(),
  title: Joi.string().required(),
  image: Joi.string().required(),
  department: Joi.custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }).message('Invalid ObjectId format'),
    
  country: Joi.custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }).message('Invalid ObjectId format'),
});

const validateEmployee = async (req: Request, res: Response, next: NextFunction) => {
        
  try {
    const normalizedBody = await normalizeData(req.body);
           
    const values = await emplyeeSchema.validateAsync(normalizedBody);
        
    req.body = values;
        
    return next();
  
  } catch (error: unknown) {
  
    if (error instanceof Joi.ValidationError) {
      return next(createError(error.details[0].message, 422));
    }
    next();
  }
};

const getEmployeesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(15),
  search: Joi.string().allow('').default(''),

  filter: Joi.string().custom((value) => {
    if (Object.keys(JSON.parse(value)).length) {
      const partsedValues = JSON.parse(value);
      if (partsedValues?.country) partsedValues.country = new mongoose.Types.ObjectId(partsedValues.country);
      if (partsedValues?.department) partsedValues.department = new mongoose.Types.ObjectId(partsedValues.department);

      return partsedValues;
  
    }
  }).default({}),

  sort: Joi.string().custom((value) => {if (Object.keys(JSON.parse(value)).length) return JSON.parse(value);}).default({updatedAt: -1})
});
  
export {validateEmployee, getEmployeesSchema};