/* eslint-disable import/order */
import { paymentOrder, paymentSuccess } from '../controller/payment';

const {
    Routes: { PAYMENT },
} = require('../constants');
const paymentRoute = require('express').Router();

paymentRoute.post(PAYMENT.PAYMENT, paymentOrder);
paymentRoute.post(PAYMENT.PAYMENT_SUCCESS, paymentSuccess);

export { paymentRoute };
