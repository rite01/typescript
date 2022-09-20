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
 *          Task:
 *              type: object
 *              required :
 *                  - fullName
 *                  - email
 *                  - password
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
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
 *      summary: insert user details
 *      tags: [Task]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Task'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
authRouter.post(AUTH.REGISTER, userValidation, registerHandler);
authRouter.post(AUTH.VERIFY, verifyUser);
authRouter.post(AUTH.RESEND, resendOtp);
authRouter.post(AUTH.LOGIN, loginHandler);
authRouter.get(AUTH.ALLUSER, getUser);

export default authRouter;
