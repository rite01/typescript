import { NextFunction, Response } from 'express';
import { Error } from 'mongoose';
import { HttpMessageCode, HttpMessage } from '../constants';
import { RequestB } from './authCheck';

export class ApiError {
  message: string;

  statusCode: number;

  constructor(statusCode: number, message: string) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
export const errorHandler = (err: Error, _: RequestB, res: Response, __: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).send({
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  return res.status(HttpMessageCode.INTERNAL_SERVER_ERROR).send({
    statusCode: HttpMessageCode.INTERNAL_SERVER_ERROR,
    message: HttpMessage.INTERNAL_SERVER_ERROR,
  });
};
