import {
  registerHandler, verifyUser, resendOtp, loginHandler, getUser,
} from '../controller';
import { userValidation } from '../validation/auth.validation';

const authRouter = require('express').Router();
const {
  Routes: { AUTH },
} = require('../constants');

/**
 * @swagger
 * components:
 *      schemas:
 *          UserRegister and login api:
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
/api/v1/register:
 *  post:
 *      summary: UserRegister and login api
 *      tags: [UserRegister and login api]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/UserRegister and login api'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
authRouter.post(AUTH.REGISTER, userValidation, registerHandler);

/**
 * @swagger
 * components:
 *      schemas:
 *          UserRegister and login api:
 *              type: object
 *              required :
 *                  - confirmationCode
 *              properties:
 *                  confirmationCode:
 *                      type: number
 */

/**
 * @swagger
/api/v1/otpverify:
 *  post:
 *      summary: Otp Verification and Resend Otp
 *      tags: [UserRegister and login api]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/UserRegister and login api'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
authRouter.post(AUTH.VERIFY, verifyUser);

/**
 * @swagger
 * components:
 *      schemas:
 *          UserRegister and login api:
 *              type: object
 *              required :
 *                  - confirmationCode
 *              properties:
 *                  confirmationCode:
 *                      type: number
 */

/**
 * @swagger
/api/v1/resend:
 *  post:
 *      summary: Otp Verification and Resend Otp
 *      tags: [UserRegister and login api]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/UserRegister and login api'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
authRouter.post(AUTH.RESEND, resendOtp);

/**
 * @swagger
 * components:
 *      schemas:
 *          UserRegister and login api:
 *              type: object
 *              required :
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 */

/**
 * @swagger
/api/v1/login:
 *  post:
 *      summary: Login User
 *      tags: [UserRegister and login api]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/UserRegister and login api'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '400':
 *              description: Something Wrong
 *          '404':
 *              description: Your Email has not been verified. Please click on resend
 *          '500':
 *                  description: Internal server error
 */
authRouter.post(AUTH.LOGIN, loginHandler);

/**
 * @swagger
 * components:
 *      schemas:
 *          UserRegister and login api:
 *              type: object
 */

/**
 * @swagger
/api/v1/alluser:
 *  get:
 *      summary: Get all user and educator
 *      tags: [UserRegister and login api]

 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '400':
 *              description: Something Wrong
 *          '404':
 *              description: Your Email has not been verified. Please click on resend
 *          '500':
 *                  description: Internal server error
 */
authRouter.get(AUTH.ALLUSER, getUser);

export default authRouter;
