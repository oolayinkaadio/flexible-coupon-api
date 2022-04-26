const {cartDal, productDal, cartProductDal, db } = require('../dal');

const {
  successResponseWithData, successResponse, errorResponseWithData, errorResponse, generateCouponCode, messages, statusCodes
} = require('../utils');
 
const cartService = {
  addProductToCart: async (data, res) => {
    try {
      const { productIds } = data;

     return await db.sequelize.transaction(async transaction => {
        const createCart = await cartDal.createCart(transaction);
        if (!createCart) {
          return errorResponse(res, statusCodes.badRequest, messages.badRequest);
        };

        const { id: cart_id } = createCart;

        const getProducts = await productDal.getProductsByArrayOfIds(productIds, transaction); 

        if (!getProducts) {
          return errorResponse(res, statusCodes.badRequest, messages.badRequest);
        };

        const cartProductIds = createProducts.map(product => {
          return {product_id: product.id, cart_id};
        });

        const createCartProductRecord = await cartProductDal.createCartProductRecord(productIds, transaction);
        if(!createCartProductRecord) { return errorResponse(res, statusCodes.badRequest, messages.badRequest); }

        const getNewCartAndItsProducts = await cartDal.getCartById(cart_id);
        if (!getNewCartAndItsProducts) {
          return errorResponse(res, statusCodes.badRequest, messages.badRequest);
        }

        return successResponseWithData(res, statusCodes.success, messages.success, getNewCartAndItsProducts);

      });

    } catch (error) {
      throw new Error(error);
    }
  },

  calculateCartTotalPrice: async (cartProducts) => {
    let totalPrice = 0;

    if (cartProducts && cartProducts.length > 0) {
      totalPrice = cartProducts.reduce((a,b) => a.price + b.price);
    };

    return totalPrice;
  },

  getCartAndItsProductsTotalPrice: async (cart_id, res) => {
    const getCartAndItsProducts = await cartDal.getCartById(cart_id);
    if (!getCartAndItsProducts) {
      return errorResponse(res, statusCodes.badRequest, messages.badRequest);
    };

    let totalPrice = 0;
    if (getCartAndItsProducts && getCartAndItsProducts.products.length > 0) {
      totalPrice += this.calculateCartTotalPrice(products);
    }

    // const { products } = getCartAndItsProducts;

    // let totalPrice = 0;

    // if (products && products.length > 0) {
    //   totalPrice = products.reduce((a,b) => a.price + b.price);
    // };

    getCartAndItsProducts.totalPrice = totalPrice;

    return successResponseWithData(res, statusCodes.success, messages.success, getCartAndItsProducts);
  },

  calculateDiscountForCart: async (data, res) => {
    // this func takes data obj that has cart id and coupon_code
    try {
      const { cart_id, coupon_code } = data;
      const getCartAndItsProducts = await cartDal.getCartById(cart_id);
      if (!getCartAndItsProducts) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      }

      const { products } = getCartAndItsProducts;
      const cartProductLength = products.length;
      const cartTotalPrice = this.calculateCartTotalPrice(products);

      const couponCodeExists = await couponDal.getCouponByField({coupon_code});
      if (!couponCodeExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };

      const { rules, discounts } = couponCodeExists;

      for (let i = 0; i < rules.length; i++) {
        const currentRule = rules[i];
        if (currentRule.minimum_cart_price && currentRule.minimum_cart_price > cartTotalPrice) {
          return errorResponse(res, statusCodes.badRequest, messages.badRequest);
        };

        if (currentRule.minimum_cart_length && currentRule.minimum_cart_length > cartProductLength) {
          return errorResponse(res, statusCodes.badRequest, messages.badRequest);
        }
      };

      let discount = 0;
      for (let i = 0; i < discounts.length; i++) {
        const currentDiscount = discounts[i];
        const discountValue = currentDiscount.value;
        const percentageDiscount = (discountValue / 100) * cartTotalPrice;
        const fixedDiscount = cartTotalPrice - discountValue;

        if (currentDiscount.type === 'both') {         
          discount += percentageDiscount > fixedDiscount ? percentageDiscount : fixedDiscount;
        };

        if (currentDiscount.type === 'fixed_price') { discount += fixedDiscount; };

        if (currentDiscount.type === 'percentage') { discount += percentageDiscount; };
      };

      const returnedData = {
        couponCode: coupon_code,
        cart: getCartAndItsProducts,
        cartTotalPrice,
        cartDiscountPrice: discount
      };

      return successResponseWithData(res, statusCodes.success, messages.success, returnedData);
        
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = {cartService};