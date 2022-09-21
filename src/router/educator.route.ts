import {
  educatorLoginHandler, educatorRegisterHandler, resendOtp, verifyUser,
} from '../controller';
import { userValidation } from '../validation/auth.validation';

const educatorRoute = require('express').Router();
const {
  Routes: { EDUCATOR },
} = require('../constants');

/**
 * @swagger
 * components:
 *      schemas:
 *          Educator Register:
 *              type: object
 *              required :
 *                  - fullName
 *                  - email
 *                  - password
 *              properties:
 *                  fullName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 */

/**
 * @swagger
/api/v1/educator/register:
 *  post:
 *      summary: Educator Register
 *      tags: [Educator Register & Login]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Educator Register & Login'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
educatorRoute.post(
  EDUCATOR.EDUCATORREGISTER,
  userValidation,
  educatorRegisterHandler,
);

/**
 * @swagger
 * components:
 *      schemas:
 *          Educator Otp Verification:
 *              type: object
 *              required :
 *                  - confirmationCode
 *              properties:
 *                  confirmationCode:
 *                      type: number
 */

/**
 * @swagger
/api/v1/educator/otpverify:
 *  post:
 *      summary: Otp verification
 *      tags: [Educator Register & Login]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Educator Register & Login'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
educatorRoute.post(EDUCATOR.VERIFY_OTP, verifyUser);

/**
 * @swagger
 * components:
 *      schemas:
 *          Educator Resend Otp:
 *              type: object
 *              required :
 *                  - confirmationCode
 *              properties:
 *                  confirmationCode:
 *                      type: number
 */

/**
 * @swagger
/api/v1/educator/resend:
 *  post:
 *      summary: Resend Otp
 *      tags: [Educator Register & Login]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Educator Register & Login'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
educatorRoute.post(EDUCATOR.RESEND_OTP, resendOtp);

/**
 * @swagger
 * components:
 *      schemas:
 *          Educator Login:
 *              type: object
 *              required :
 *                  - email
 *                  - password
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 */

/**
 * @swagger
/api/v1/educator/login:
 *  post:
 *      summary: Login Educator
 *      tags: [Educator Register & Login]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Educator Register & Login'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */

educatorRoute.post(EDUCATOR.EDUCATORLOGIN, educatorLoginHandler);

export default educatorRoute;
