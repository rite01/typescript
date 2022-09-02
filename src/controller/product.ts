import { NextFunction, Request, Response } from 'express';
import { ProductDetail } from '../model/productDetail';
import cloudinary from '../service/clodinary';
import { HttpMessage, HttpMessageCode } from '../constants';
import { Product } from '../model/productModel';

/**
 * route api/v1/create
 *
 * @param {string} heading
 * @param {string} title
 * @param {Number} price
 * @param {Number} updateDate
 * @param {Boolean} bestSeller
 * @param {string} image
 * @param {string} courseTitle
 * @param {string} discription
 * @param {Number} numReview
 * @param {string} discription
 * @param {string} courseSummry
 * @param {string} aboutProduct
 * @returns {message}
 * @access public
 * @discription Product Create Controller
 */

export const productCreate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const image = req?.file?.path;
    const {
      heading,
      title,
      price,
      updateDate,
      bestSeller,
      courseTitle,
      discription,
      numReview,
      hours,
      courseSummry,
      aboutProduct,
    } = req.body;
    const result = await cloudinary.uploader.upload(image);
    const prodDetail = new ProductDetail({
      courseAuther: req?.user?.id,
      courseTitle,
      discription,
      numReview,
      hours,
      courseSummry,
      bestSeller,
      aboutProduct,
    });
    const test = await prodDetail.save();
    const createProduct = new Product({
      heading,
      title,
      image: { public_id: result.public_id, url: result.secure_url },
      price,
      updateDate,
      bestSeller,
      detail: test.id,
    });
    await createProduct.save();
    return res.status(HttpMessageCode.CREATED).json({
      message: HttpMessage.PRODUCT_CREATED_SUCCESSFULLY,
      data: createProduct,
    });
  } catch (error: any) {
    console.log('error', error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

/**
 * Route api/v1/get/product
 *
 * @param {String} detail
 * @access public
 * @returns {message}
 * @discription Get product Api controller.
 */

export const getProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const productList = await Product.find({}).populate('detail');
    if (productList.length === 0) {
      return res
        .status(HttpMessageCode.BAD_REQUEST)
        .json(HttpMessage.NO_DATA_FOUND);
    }
    return res
      .status(HttpMessageCode.OK)
      .json({ message: HttpMessage.PRODUCT_FOUND, data: productList });
  } catch (error: any) {
    console.log('error', error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

/**
 * Route api/v1/get/product/bytitle/:navtitle
 *
 * @param {String} navTitle
 * @access public
 * @returns {message}
 * @discription Get Product By Title controller.
 */

export const getProductByTitle = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { navTitle } = req.params;
    const data = await Product.find({ navTitle }).populate('detail');
    return res.status(HttpMessageCode.OK).json({
      statusCode: HttpMessageCode.OK,
      message: `Product List ${navTitle}`,
      data,
    });
  } catch (error: any) {
    console.log('error', error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

/**
 * Route api/v1/get/product/:id
 *
 * @param {String} id
 * @access public
 * @returns {message}
 * @discription Get Single Product controller.
 */

export const getSingleProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const data = await Product.findOne({ id }).populate('detail');
    return res.status(HttpMessageCode.OK).json({
      statusCode: HttpMessageCode.OK,
      message: HttpMessage.GET_SINGLE_PRODUCT,
      data,
    });
  } catch (error: any) {
    console.log('error', error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

/**
 * Route api/v1/update/product/:id
 *
 * @param {String} id
 * @access public
 * @returns {message}
 * @discription update Product controller.
 */
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const data = await Product.findByIdAndUpdate(
      id,
      {
        heading: req.body.heading,
        title: req.body.title,
        price: req.body.price,
        updateDate: req.body.updateDate,
        bestSeller: req.body.bestSeller,
      },
      { new: true },
    );
    if (!data) {
      return res.status(HttpMessageCode.BAD_REQUEST).send({
        message: HttpMessage.PRODUCT_NOT_FOUND,
      });
    }
    return res.status(HttpMessageCode.OK).json({
      statusCode: HttpMessageCode.OK,
      message: HttpMessage.DELETE_SINGLE_PRODUCT,
      data,
    });
  } catch (error: any) {
    console.log('error', error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

/**
 * Route api/v1/get/product/:id
 *
 * @param {String} _id
 * @access public
 * @returns {message}
 * @discription Delete Single Product controller.
 */
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const data = await Product.findOneAndDelete({ id });
    return res.status(HttpMessageCode.OK).json({
      statusCode: HttpMessageCode.OK,
      message: HttpMessage.DELETE_SINGLE_PRODUCT,
      data,
    });
  } catch (error: any) {
    console.log('error', error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
