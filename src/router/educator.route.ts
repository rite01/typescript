import {
  educatorLoginHandler, educatorRegisterHandler, resendOtp, verifyUser,
} from '../controller';
import { userValidation } from '../validation/auth.validation';

const educatorRoute = require('express').Router();
const {
  Routes: { EDUCATOR },
} = require('../constants');

educatorRoute.post(
  EDUCATOR.EDUCATORREGISTER,
  userValidation,
  educatorRegisterHandler,
);
educatorRoute.post(EDUCATOR.EDUCATORLOGIN, educatorLoginHandler);
educatorRoute.post(EDUCATOR.VERIFY_OTP, verifyUser);
educatorRoute.post(EDUCATOR.RESEND_OTP, resendOtp);

export default educatorRoute;
