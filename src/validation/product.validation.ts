import { NextFunction, Response } from 'express';
import { RequestB } from 'src/middleware/authCheck';
import { HttpMessageCode } from '../constants';

const joi = require('joi');

/**
 *
 * @param {String} heading
 * @param {String} title
 * @param {Number} price
 * @param {String} image
 * @param {String} courseTitle
 * @param {Number} updateDate
 * @param {String} discription
 * @param {String} courseAuther
 * @param {String} aboutProduct
 * @param {String} courseSummry
 * @param {Number} hours
 * @returns {message}
 * @description joi validation product
 */

export const productValidation = (req: RequestB, res: Response, next: NextFunction) => {
  const productSchema = joi.object({
    heading: joi.string().required().label('Heading'),
    title: joi.string().required().label('Product Title'),
    price: joi.number().required().label('Price'),
    image: joi.any(),
    updateDate: joi.string().required().label('Update Date'),
    courseTitle: joi.string().required().label('Course Title'),
    description: joi.string().required().label('Product description'),
    courseAuther: joi.string().label('Course Auther'),
    hours: joi.number().required().label('course Hours'),
    category: joi.string(),
    courseSummary: joi.string().required().label('Course Summry'),
    aboutProduct: joi.string().required().label('About Product'),
  });
  if (!req.body) {
    return res.json({
      message: 'file is req',
    });
  }
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.json({
      status: HttpMessageCode.BAD_REQUEST,
      message: error.details[0].message,
    });
  }
  return next();
};
