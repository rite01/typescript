import { NextFunction, Request, Response } from 'express';
import { User } from '../model';
import { HttpMessage, HttpMessageCode } from '../constants';
import { sendMail } from '../service/emailsend';

/**
 * user Registration
 * route api/v1/register
 *
 * @param {string} fullName
 * @param {string} email
 * @param {string} password
 * @returns {message}
 * @access public
 * @discription user registration
 */

export const registerHandler = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
  try {
    const { email, fullName, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(HttpMessageCode.CONFLICT)
        .json({ error: HttpMessage.USER_ALREADY_REGISTER });
    }
    const data = await new User({
      fullName,
      email,
      password,
    }).save();
    const newCode = data.confirmationCode;
    await sendMail(email, newCode);
    return res
      .json({
        statusCode: HttpMessageCode.CREATED,
        message: HttpMessage.PLEASE_VERIFY_EMAIL,
      });
  } catch (error) {
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ error: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

/**
 *  route api/v1/confirm
 *  OTP verification controller
 *
 * @param {string} confirmationCode
 * @returns {message}
 * @access public
 * @discription user token verification controller.
 */

export const verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
  try {
    const { confirmationCode } = req.body;
    const test = await User.findOne({ confirmationCode });
    if (!test) {
      return res
        .status(HttpMessageCode.UNAUTHORIZED)
        .json({ error: HttpMessage.INVALID_OTP });
    }
    test.isVerified = true;
    if (test.isVerified !== true) {
      return res
        .status(HttpMessageCode.UNAUTHORIZED)
        .json({ error: HttpMessage.ALREADY_VERIFY });
    }
    await test.save();
    return res
      .json({
        statusCode: HttpMessageCode.CREATED,
        message: HttpMessage.EMAIL_VERIFIED,
      });
  } catch (error) {
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ error: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

/**
 * end point api/v1/resend
 * resend otp api
 *
 * @param {Number} confirmationCode
 * @returns {message}
 * @access public
 * @discription user token verification controller.
 */

export const resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
  try {
    const token = parseInt(`${Math.random() * 1000000}`, 10);
    const user = await User.findOne().sort({ _id: -1 });
    const _id = user?.id;
    const data = await User.findByIdAndUpdate(
      _id,
      {
        confirmationCode: token,
      },
      { new: true },
    );
    await sendMail((data?.email as unknown as string), (data?.confirmationCode as unknown as number));
    return res
      .status(HttpMessageCode.CREATED)
      .json(HttpMessage.OTP_RESEND);
  } catch (error: any) {
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json(HttpMessage.INTERNAL_SERVER_ERROR);
  }
};

/**
 *Login Controller
 * api end point api/v1/login
 *
 * @param {String} email
 * @param {String} password
 * @returns {message}
 * @access public
 * @discription user token verification controller.
 */

export const loginHandler = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user?.isPasswordMatched(password)) {
      return res
        .status(HttpMessageCode.UNAUTHORIZED)
        .json(HttpMessage.INVALID_EMAIL);
    }
    if (!user.isVerified) {
      return res
        .status(HttpMessageCode.NOT_FOUND)
        .json(HttpMessage.USER_EMAIL_NOT_VERIFIED);
    }
    const token = user?.generateAuthToken();
    return res
      .json({
        statusCode: HttpMessageCode.OK,
        message: HttpMessage.LOGIN_SUCCESSFULLY,
        data: token,
      });
  } catch (error: any) {
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

/**
 * Get user Api
 * api route api/v1/login
 *
 * @param {string} email
 * @param {string} password
 * @returns {message}
 * @access public
 * @discription get all user api .
 */

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userList = await User.find({});
    if (userList.length === 0) {
      return res
        .status(HttpMessageCode.BAD_REQUEST)
        .json(HttpMessage.BAD_REQUEST);
    }
    return res
      .json({
        statusCode: HttpMessageCode.OK,
        message: HttpMessage.USER_FOUND,
        data: userList,
      });
  } catch (err: any) {
    return res
      .status(HttpMessageCode.BAD_REQUEST)
      .json({ message: err.message });
  }
};