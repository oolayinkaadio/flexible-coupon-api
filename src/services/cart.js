const { cartDal, productDal, cartProductDal,couponDal, db } = require('../dal');


const {
  successResponseWithData, successResponse, errorResponseWithData, errorResponse, generateCouponCode,
  messages, statusCodes, calculateCartTotalPrice
} = require('../utils');
 
const cartService = {
  addProductToCart: async (data, res) => {
    try {
      const { productIds } = data;

      let cart_id;
     await db.sequelize.transaction(async transaction => {
        const createCart = await cartDal.createCart(transaction);
        if (!createCart) {
          return errorResponse(res, statusCodes.badRequest, messages.badRequest);
        };

        cart_id  = createCart.id;

        const getProducts = await productDal.getProductsByArrayOfIds(productIds, transaction); 

        if (!getProducts) {
          return errorResponse(res, statusCodes.badRequest, messages.badRequest);
        };

       const cartProductIds = getProducts.map(product => {
          return {product_id: product.id, cart_id};
        });

        const createCartProductRecord = await cartProductDal.createCartProductRecord(cartProductIds, transaction);
        if(!createCartProductRecord) { return errorResponse(res, statusCodes.badRequest, messages.badRequest); }
     });
      
      
     const getNewCartAndItsProducts = await cartDal.getCartById(cart_id);
     if (!getNewCartAndItsProducts) {
       return errorResponse(res, statusCodes.badRequest, messages.badRequest);
     }
     return successResponseWithData(res, statusCodes.success, messages.success, getNewCartAndItsProducts);

    } catch (error) {
      throw new Error(error);
    }
  },

  getCartAndItsProductsTotalPrice: async (cart_id, res) => {
    try {
      const getCartAndItsProducts = await cartDal.getCartById(cart_id);
      if (!getCartAndItsProducts) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      };
      
      let totalPrice = 0;
      if (getCartAndItsProducts && getCartAndItsProducts.products.length > 0) {
        const { products } = getCartAndItsProducts;
        totalPrice += calculateCartTotalPrice(products);
      };
  
      const returnedData = {cart: getCartAndItsProducts, cartTotalPrice: totalPrice};
  
      return successResponseWithData(res, statusCodes.success, messages.success, returnedData);
    } catch (error) {
    throw new Error(error);
    };    
  },

  calculateDiscountForCart: async (data, res) => {
    try {
      const { cart_id, coupon_code } = data;
      const getCartAndItsProducts = await cartDal.getCartById(cart_id);
      if (!getCartAndItsProducts) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      };

      const { products } = getCartAndItsProducts;
      const cartProductLength = products.length;
      const cartTotalPrice = calculateCartTotalPrice(products);

      const couponCodeExists = await couponDal.getCouponByField({code: coupon_code});
      if (!couponCodeExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };

      const { rules, discounts } = couponCodeExists;

      for (let i = 0; i < rules.length; i++) {
        const currentRule = rules[i];
        if (currentRule.minimum_cart_price && currentRule.minimum_cart_price > cartTotalPrice) {
          return errorResponse(res, statusCodes.badRequest, messages.couponDiscountAndRuleError);
        };

        if (currentRule.minimum_cart_length && currentRule.minimum_cart_length > cartProductLength) {
          return errorResponse(res, statusCodes.badRequest, messages.couponDiscountAndRuleError);
        }
      };

      let discount = 0;
      for (let i = 0; i < discounts.length; i++) {
        const currentDiscount = discounts[i];
        const discountValue = parseInt(currentDiscount.value);
        const percentageDiscount =parseInt(((discountValue / 100) * cartTotalPrice).toFixed(2));
        const fixedDiscount = cartTotalPrice - discountValue;
        
        if (currentDiscount.type === 'both') { discount =  discount + percentageDiscount > discountValue ? percentageDiscount : discountValue; };

        if (currentDiscount.type === 'fixed_price') { discount = discount + discountValue; };

        if (currentDiscount.type === 'percentage') { discount = discount + percentageDiscount; };

      };


      const returnedData = {
        cartId: cart_id,
        cartTotalPrice,
        cartDiscountPrice: discount,
        cartTotalAdjustedPrice: parseInt((cartTotalPrice - discount).toFixed(2)),
      };

      return successResponseWithData(res, statusCodes.success, messages.success, returnedData);
        
    } catch (error) {
      throw new Error(error);
    }
  },

};

module.exports = {cartService};