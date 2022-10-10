export const Routes = {
  HOME: {
    API_ENDPOINT: '/api/v1',
    SWAGGER: '/api-docs',
    HEALTH: '/health',
    NOT_MATCH_ROUTE: '*',
  },
  AUTH: {
    DEFAULT: '/',
    REGISTER: '/register',
    VERIFY: '/otpverify',
    RESEND: '/resend',
    LOGIN: '/login',
    ALLUSER: '/alluser',
  },
  ADMIN: {
    DEFAULT: '/',
    LOGIN: '/admin/login',
  },
  EDUCATOR: {
    DEFAULT: '/',
    EDUCATORREGISTER: '/educator/register',
    VERIFY_OTP: '/educator/otpverify',
    RESEND_OTP: '/educator/resend',
    EDUCATORLOGIN: '/educator/login',
  },
  PRODUCT: {
    DEFAULT: '/',
    POSTCREATE: '/create',
    GETPRODUCT: '/getallproduct',
    GETPRODUCTBYTITLE: '/getproduct/bytitle/:id',
    GETPRODUCTBYID: '/get/product/:id',
    UPDATEPRODUCT: '/update/product/:id',
    DELETEPRODUCT: '/delete/product/:id',
    TITLELIST: '/product/titleList',
    TITLE: '/createTitle',

  },
  PAYMENT: {
    DEFAULT: '/',
    PAYMENT: '/paymentOrder',
    PAYMENT_SUCCESS: '/paymentSuccess',
  },
  WISHLIST: {
    DEFAULT: '/',
    ADDTOWISHLIST: '/addwishlist',
    GETWISHLIST: '/getwishlist',
    REMOVEWISHLIST: '/removewishlist/:id',
  },
  CART: {
    DEFAULT: '/',
    ADDTOCART: '/addcart',
    GETCART: '/getcart',
    REMOVECART: '/removecart/:id',
  },
};
