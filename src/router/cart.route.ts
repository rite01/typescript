import { addCart, getCartProduct, removeCart } from '../controller';
import { verifyToken } from '../middleware/authCheck';

const cartRoute = require('express').Router();
const {
  Routes: { CART },
} = require('../constants');

cartRoute.post(CART.ADDTOCART, verifyToken, addCart);
cartRoute.get(CART.GETCART, verifyToken, getCartProduct);
cartRoute.delete(CART.REMOVECART, verifyToken, removeCart);

export default cartRoute;
