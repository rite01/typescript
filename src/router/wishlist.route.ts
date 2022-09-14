import { getWishListProduct, removeWishList, wishList } from '../controller';
import { verifyToken } from '../middleware/authCheck';

const wishListRoute = require('express').Router();
const {
    Routes: { WISHLIST },
} = require('../constants');

wishListRoute.post(WISHLIST.ADDTOWISHLIST, verifyToken, wishList);
wishListRoute.get(WISHLIST.GETWISHLIST, verifyToken, getWishListProduct);
wishListRoute.delete(WISHLIST.REMOVEWISHLIST, verifyToken, removeWishList);

export default wishListRoute;
