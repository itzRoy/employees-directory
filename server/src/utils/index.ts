import jwt from 'jsonwebtoken';
import config from '../config.js';
import { Types } from 'mongoose';

const createToken = (id: Types.ObjectId): string => {
  return jwt.sign({ id }, config.tokenSecret, { expiresIn: 7200});
};

interface CustomError extends Error {
  status: number;
}

class CreateError extends Error implements CustomError {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.message = message;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}


const createError = (message: string, status: number) => {
  return new CreateError(message, status);
  
};

const getRandomData = async () => {
  const response = await fetch('https://randomuser.me/api/?inc=picture,name,location');
  const result = await response.json();
  return result.results[0];
  
};

export { createToken, createError, CustomError, getRandomData};
