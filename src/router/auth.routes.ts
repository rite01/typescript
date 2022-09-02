import {
  registerHandler, verifyUser, resendOtp, loginHandler, getUser,
} from '../controller';
import { userValidation } from '../validation/auth.validation';

const authRouter = require('express').Router();
const {
  Routes: { AUTH },
} = require('../constants');

// user log
authRouter.post(AUTH.REGISTER, userValidation, registerHandler);
authRouter.post(AUTH.VERIFY, verifyUser);
authRouter.post(AUTH.RESEND, resendOtp);
authRouter.post(AUTH.LOGIN, loginHandler);
authRouter.get(AUTH.ALLUSER, getUser);

export default authRouter;
