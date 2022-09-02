import {
  productCreate, getProduct, getSingleProduct, deleteProduct, updateProduct, getProductByTitle,
} from '../controller/product';
import { verifyToken } from '../middleware/authCheck';
import { checkRole } from '../middleware/checkRole';
import uploadFile from '../service/multer';
import { productValidation } from '../validation/product.validation';

const productRoute = require('express').Router();
const {
  Routes: { PRODUCT },
} = require('../constants');

// Product Route
productRoute.post(
  PRODUCT.POSTCREATE,
  verifyToken,
  checkRole('educator'),
  uploadFile,
  productValidation,
  productCreate,
);
productRoute.get(PRODUCT.GETPRODUCT, getProduct);
productRoute.get(PRODUCT.GETPRODUCTBYID, getSingleProduct);
productRoute.delete(PRODUCT.DELETEPRODUCT, deleteProduct);
productRoute.patch(PRODUCT.UPDATEPRODUCT, updateProduct);
productRoute.get(PRODUCT.GETPRODUCTBYTITLE, getProductByTitle);

export default productRoute;
