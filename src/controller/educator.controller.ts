import { NextFunction, Response } from 'express';
import { RequestB } from 'src/middleware/authCheck';
import { HttpMessageCode, HttpMessage } from '../constants';
import { User } from '../model';
import { sendMail } from '../service/emailsend';

/**
 * route api/v1/educator/register
 *
 * @param {string} fullName
 * @param {string} email
 * @param {string} password
 * @returns {message}
 * @access public
 * @discription educator Registration
 */
export const educatorRegisterHandler = async (req: RequestB, res: Response, _: NextFunction): Promise<any> => {
  try {
    const { email, fullName, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(HttpMessageCode.CONFLICT)
        .json({ error: HttpMessage.EDUCATOR_ALREADY_REGISTER });
    }
    const data = await new User({
      fullName,
      email,
      password,
      role: 'educator',
    }).save();
    const newCode = data.confirmationCode;
    await sendMail(email, newCode);
    return res
      .status(HttpMessageCode.CREATED)
      .json({ message: HttpMessage.PLEASE_VERIFY_EMAIL });
  } catch (error: any) {
    console.log(error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ error: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

/**
 * api end point api/v1//educator/login
 *
 * @param {String} email
 * @param {String} password
 * @access public
 * @discription Educator token verification controller.
 */

export const educatorLoginHandler = async (req: RequestB, res: Response, _: NextFunction): Promise<object> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isPasswordMatched(password)) {
      return res
        .status(HttpMessageCode.UNAUTHORIZED)
        .json({ error: HttpMessage.INVALID_EMAIL });
    }
    if (!user.isVerified) {
      return res.status(HttpMessageCode.NOT_FOUND).send({
        message: HttpMessage.USER_EMAIL_NOT_VERIFIED,
      });
    }
    const educatorToken = user.generateAuthToken();
    return res
      .json({
        statusCode: HttpMessageCode.OK,
        message: HttpMessage.LOGIN_SUCCESSFULLY,
        data: educatorToken,
      });
  } catch (error: any) {
    return res
      .status(HttpMessageCode.NOT_ACCEPTABLE)
      .json({ error: error.message });
  }
};
