import { NextFunction, Request, Response } from 'express';
import { HttpMessage } from '../constants';

/**
 *
 * @param {String} role
 * @returns {message}
 * @access public
 * @discription Role check middleware.
 */

export const checkRole = (...role: string[]): any => (req: Request, res: Response, next: NextFunction) => {
  if (!role.includes(req?.user.role)) {
    return res.json({ msg: HttpMessage.YOU_ARE_NOT_AUTHORIZED });
  }
  return next();
};
