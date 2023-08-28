import { NextFunction, Response } from 'express';
import { createError } from '../utils/index.js';
import Employee, { TEmployee } from './model.js';
import { Irequest } from '../declarations.js';
import { PipelineStage, Types } from 'mongoose';

type TQuery = {page: number; limit: number; search: string; filter: {[key: string]: string}, sort: Record<string, 1 | -1> }

const getEmployee = async (req: Irequest<unknown, TQuery>, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {

    const employee = await Employee.findById(id).populate(['country', 'department']);
    return   res.status(200).json(employee);
  } catch {
    
    return next(createError('something went wrong', 500));
  }
};

const getEmployees = async (req: Irequest<unknown, TQuery>, res: Response, next: NextFunction) => {
  const { limit, page, search, filter, sort } = req.query;
  const skip = (page - 1) * limit;

  try {
    const pipeline : Array<PipelineStage> = [
      {

        $match: filter,
      },
      {
        $lookup: {
          from: 'countries',
          localField: 'country',
          foreignField: '_id',
          as: 'country'
        }
      },
      {
        $lookup: {
          from: 'departments', 
          localField: 'department',
          foreignField: '_id',
          as: 'department'
        }
      },
      {
        $unwind: '$country'
      },
      {
        $unwind: '$department'
      },
      {
        $sort: sort 
      },
      {
        $facet: {
          totalItems: [
            {
              $count: 'count'
            }
          ],
          data: [
            {
              $skip: skip
            },
            {
              $limit: limit
            }
          ]
        }
      }
    ];

    if (search.length) pipeline.unshift({
      $match: {
        $text: { $search: `/${search}/i` },
      }
    },);

    const [result] = await Employee.aggregate(pipeline);

    const totalItems = result.totalItems.length > 0 ? result.totalItems[0].count : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({ totalItems, totalPages, data: result.data });

  } catch {
    
    return next(createError('something went wrong', 500));
  }
};


const insertEmployee = async (req:Irequest<TEmployee>, res: Response, next: NextFunction) => {
      
  try {
          
    const newEmployee = await Employee.create(req.body);

    res.status(200).json(newEmployee);

  } catch {
    return next(createError('something went wrong', 500));

  }
};

const updateEmployee = async (req:Irequest<TEmployee>, res: Response, next: NextFunction) => {
  const _id = req.params.id;
  try {
          
    const updatedEmployee = await Employee.updateOne({_id}, {$set: req.body});

    res.status(200).json(updatedEmployee);

  } catch {
    return next(createError('something went wrong', 500));

  }
};

const deleteEmployee = async (req: Irequest, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const todoExists = await Employee.findById(id);

  if (!todoExists) {
    return next(createError('Todo not found', 404));
  }

  try {
    await Employee.deleteOne({_id: id});
    return res.status(200).json({ status: 200, success: true, message: 'employee deleted'});
  } catch (error) {
    return next(createError('something went wrong', 500));
  }
};


const activateEmployees = async (req: Irequest<{ids: Types.ObjectId[]}>, res: Response, next: NextFunction) => {
  const {ids} = req.body;
  try {
    await Employee.updateMany({_id: {$in: ids}}, {$set: {isActive: true}});

    return res.status(200).json({ status: 200, success: true, message: 'employees activated'});

  } catch {

    return next(createError('something went wrong', 500));

  }

};

const deactivateEmployees = async (req: Irequest<{ids: Types.ObjectId[]}>, res: Response, next: NextFunction) => {
  const {ids} = req.body;
  try {
    await Employee.updateMany({_id: {$in: ids}}, {$set: {isActive: false}});

    return res.status(200).json({ status: 200, success: true, message: 'employees deactivated'});
    
  } catch {

    return next(createError('something went wrong', 500));

  }

};
export { getEmployee, getEmployees, insertEmployee, updateEmployee, deleteEmployee, activateEmployees, deactivateEmployees };