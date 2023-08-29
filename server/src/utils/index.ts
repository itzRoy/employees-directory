import jwt from 'jsonwebtoken';
import config from '../config.js';
import { Types } from 'mongoose';
import { get } from 'https';

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

function downloadImage(url) {
  return new Promise<WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>>((resolve, reject) => {
    get(url, {rejectUnauthorized: false}, response => {
      const chunks: Uint8Array[] = [];
      
      response.on('data', (chunk: Uint8Array) => {
        chunks.push(chunk);
      });

      response.on('end', () => {
        const imageData = Buffer.concat(chunks);
        resolve(imageData);
      });

      response.on('error', error => {
        
        reject(error); 
      });
    });
  });
}

export { createToken, createError, CustomError, getRandomData, downloadImage};
