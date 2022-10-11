/* eslint-disable import/order */
import { verifyToken } from '../middleware/authCheck';
import { paymentOrder, paymentSuccess } from '../controller/payment';

const {
    Routes: { PAYMENT },
} = require('../constants');
const paymentRoute = require('express').Router();

paymentRoute.post(PAYMENT.PAYMENT, verifyToken, paymentOrder);
paymentRoute.post(PAYMENT.PAYMENT_SUCCESS, verifyToken, paymentSuccess);

export { paymentRoute };
