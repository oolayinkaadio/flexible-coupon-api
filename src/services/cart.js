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
      }
  
      const returnedData = {cart: getCartAndItsProducts, cartTotalPrice: totalPrice};
  
      return successResponseWithData(res, statusCodes.success, messages.success, returnedData);
  } catch (error) {
    throw new Error(error);
  }
    
  },
  getCartAndItsProductsTotalPriceProd: async (res) => {
    try {
      const cart_id = '22be981c-80ff-4868-8672-25ef3b3bfca5';
      const getCartAndItsProducts = await cartDal.getCartById(cart_id);
      if (!getCartAndItsProducts) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      };
      
      let totalPrice = 0;
      if (getCartAndItsProducts && getCartAndItsProducts.products.length > 0) {
        const { products } = getCartAndItsProducts;
        totalPrice += calculateCartTotalPrice(products);
      }
  
      const returnedData = {cart: getCartAndItsProducts, cartTotalPrice: totalPrice};
  
      return successResponseWithData(res, statusCodes.success, messages.success, returnedData);
  } catch (error) {
    throw new Error(error);
  }
    
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
      const cartTotalPrice = calculateCartTotalPrice(products);

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
  },
  calculateDiscountForCartProd: async (res) => {
    // this func takes data obj that has cart id and coupon_code
    try {
      const coupon_code = 'DllJ7Ia51K';
      const cart_id = '22be981c-80ff-4868-8672-25ef3b3bfca5';
      const getCartAndItsProducts = await cartDal.getCartById(cart_id);
      if (!getCartAndItsProducts) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      }

      const { products } = getCartAndItsProducts;
      const cartProductLength = products.length;
      console.log('::::',products)

      const cartTotalPrice = calculateCartTotalPrice(products);
      console.log('OOO', cartTotalPrice);

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
      console.log('DISCOUNT', discounts);
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