/* eslint-disable no-undef */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { HttpMessageCode, HttpMessage } from '../constants';
import { IUser, User } from '../model';
import { IProductDetail } from '../model/productDetail';
import { IProduct } from '../model/productModel';

interface test {
  public_id: string
  path: string,
  image: string
}

declare module 'express' {
  export interface Request {
    file: test;
    params: { id: any; navTitle: string };
    userId: string;
    user: IUser,
    userData: string[]
    body: IProduct & IProductDetail & IUser;
    headers: {
      authorization?: string
    }
  }
}
/**
 *
 * @param {String} authorization
 * @returns {message}
 * @access public
 * @discription Token verify "auth check" middelwere.
 */

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(HttpMessageCode.UNAUTHORIZED)
      .json({ error: HttpMessage.MUST_BE_LOGIN });
  }
  const token = authorization.replace('Bearer ', '');
  const key = process.env.JWTPRIVATEKEY;
  return jwt.verify(token, (key as unknown as string), async (err: any, payload: any) => {
    if (err) {
      return res
        .status(HttpMessageCode.UNAUTHORIZED)
        .json({ error: HttpMessage.MUST_BE_LOGIN });
    }
    const { id } = payload;
    const userFound: any = await User.findById(id);
    req.user = userFound;
    return next();
  });
};
