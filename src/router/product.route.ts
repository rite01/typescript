import {
  productCreate, getProduct, getSingleProduct, deleteProduct, updateProduct, getProductByTitle, titleHandler, getNevTitle,
} from '../controller/product';
import { verifyToken } from '../middleware/authCheck';
import { checkRole } from '../middleware/checkRole';
import uploadFile from '../service/multer';
import { productValidation } from '../validation/product.validation';

const productRoute = require('express').Router();
const {
  Routes: { PRODUCT },
} = require('../constants');

/**
 * @swagger
 * components:
 *      schemas:
 *          Product Create:
 *              type: object
 *              required :
 *                  - in: formData
 *                  - heading
 *                  - title
 *                  - price
 *                  - updateDate
 *                  - image
 *                  - courseTitle
 *                  - description
 *                  - numReview
 *                  - courseSummary
 *                  - aboutProduct
 *              properties:
 *                  heading:
 *                      type: string
 *                  title:
 *                      type: string
 *                  price:
 *                      type: number
 *                  updateDate:
 *                      type: string
 *                  image:
 *                      type: string
 *                      format: binary
 *                  courseTitle:
 *                      type: string
 *                  description:
 *                      type: string
 *                  courseSummary:
 *                      type: string
 *                  aboutProduct:
 *                      type: string
 *
 */

/**
 * @swagger
/api/v1/create/:id:
 *  post:
 *      summary: Product Create
 *      tags: [Product Create - (role-'educator')]
 *      content-type: multipart/form-data;
 *      requestBody:
 *         required: true
 *         content:
 *          multipart/form-data:
 *            schema:
 *              $ref: '#/components/schemas/Product Create'
 *
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */

productRoute.post(
  PRODUCT.POSTCREATE,
  verifyToken,
  checkRole('educator'),
  uploadFile,
  productValidation,
  productCreate,
);

/**
 * @swagger
 * components:
 *      schemas:
 *          Product Create:
 *              type: object
 *
 */

/**
 * @swagger
 /api/v1/getallproduct:
 *  get:
 *      summary: Get All Product
 *      tags: [Product Create - (role-'educator')]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Product Create'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
productRoute.get(PRODUCT.GETPRODUCT, getProduct);

/**
 * @swagger
 * components:
 *      schemas:
 *          Product Create:
 *              type: object
 *
 */

/**
 * @swagger
 /api/v1/get/product/:id:
 *  get:
 *      summary: Get Product By Id
 *      tags: [Product Create - (role-'educator')]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Product Create'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
productRoute.get(PRODUCT.GETPRODUCTBYID, getSingleProduct);

/**
 * @swagger
 * components:
 *      schemas:
 *          Product Create:
 *              type: object
 *
 */

/**
 * @swagger
 /api/v1/get/delete/:id:
 *  delete:
 *      summary: Delete Product
 *      tags: [Product Create - (role-'educator')]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Product Create'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
productRoute.delete(PRODUCT.DELETEPRODUCT, deleteProduct);

/**
 * @swagger
 * components:
 *      schemas:
 *          Product Create:
 *              type: object
 *              required :
 *                  - heading
 *                  - title
 *                  - price
 *                  - updateDate
 *                  - image
 *                  - courseTitle
 *                  - description
 *                  - numReview
 *                  - courseSummary
 *                  - aboutProduct
 *              properties:
 *                  heading:
 *                      type: string
 *                  title:
 *                      type: string
 *                  price:
 *                      type: number
 *                  updateDate:
 *                      type: string
 *                  image:
 *                      type: string
 *                  courseTitle:
 *                      type: string
 *                  description:
 *                      type: string
 *                  courseSummary:
 *                      type: string
 *                  aboutProduct:
 *                      type: string
 *
 */

/**
 * @swagger
/api/v1/update/product/:id:
 *  patch:
 *      summary: Product create
 *      tags: [Product Create - (role-'educator')]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Product Create'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
productRoute.patch(PRODUCT.UPDATEPRODUCT, updateProduct);

/**
 * @swagger
 * components:
 *      schemas:
 *          Product Create:
 *              type: object
 *
 */

/**
 * @swagger
 /api/v1/getproduct/bytitle/:title:
 *  get:
 *      summary: Get Title List
 *      tags: [Product Create - (role-'educator')]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Product Create'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
productRoute.get(PRODUCT.GETPRODUCTBYTITLE, getProductByTitle);

/**
 * @swagger
 * components:
 *      schemas:
 *          Product Nev Title:
 *              type: object
 *              required :
 *                  - productNev
 *              properties:
 *                  productNev:
 *                      type: string
 *
 */

/**
 * @swagger
/api/v1/createTitle:
 *  post:
 *      summary: Create Nev Title
 *      tags: [Product Nev Title - (role-'educator')]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Product Nev Title'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
productRoute.post(PRODUCT.TITLE, titleHandler);

/**
 * @swagger
 * components:
 *      schemas:
 *          Product Nev Title:
 *              type: object
 *
 */

/**
 * @swagger
 /api/v1/product/titleList:
 *  get:
 *      summary: Get Title List
 *      tags: [Product Nev Title - (role-'educator')]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Product Nev Title'
 *      responses:
 *          '200':
 *              description: success
 *          '201':
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
productRoute.get(PRODUCT.TITLELIST, getNevTitle);

export default productRoute;
