const { couponDal, db,ruleDal, discountDal, couponRuleDal, couponDiscountDal } = require('../dal');
const {
 successResponseWithData, successResponse, errorResponseWithData, errorResponse, generateCouponCode, messages, statusCodes
} = require('../utils');

const couponService = {
  createCoupon: async (data, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      const { name } = data;
      
      const ruleIds = data.ruleIds ? data.ruleIds : null;
      const discountIds = data.discountIds ? data.discountIds : null;

      const couponExists = await couponDal.getCouponByField({ name });
      
      if (couponExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };
  
      const couponCode = await generateCouponCode();
      data.coupon_code = couponCode;
     
        const newCoupon = await couponDal.createCoupon(data, transaction);
        if (!newCoupon) {
          return errorResponse(res, statusCodes.badRequest, messages.badRequest);
        };

        const {id: coupon_id} = newCoupon;
        if (ruleIds) {
          const rulesExists = await ruleDal.getRulesByArrayOfIds(ruleIds, transaction);

          if (!rulesExists || rulesExists.length === 0) {
            return errorResponse(res, statusCodes.notFound, messages.notFound);
          }

          const couponRuleData = ruleIds.map(ruleId => {
            return {rule_id: ruleId, coupon_id};
          });

          const createCouponRuleRecords = await couponRuleDal.createCouponRule(couponRuleData, transaction);
          if (!createCouponRuleRecords) {
            return errorResponse(res, statusCodes.badRequest, messages.badRequest);
          }
        }

        if (discountIds) {
          const discountExists = await discountDal.getDiscountsByArrayOfIds(discountIds, transaction);

          if (!discountExists || discountExists.length === 0) {
            return errorResponse(res, statusCodes.notFound, messages.notFound);
          }

          const couponDiscountData = discountIds.map(discountId => {
            return {discount_id: discountId, coupon_id};
          });

          const createCouponDiscountRecords = await couponDiscountDal.createCouponDiscount(couponDiscountData, transaction);
          if (!createCouponDiscountRecords) {
            return errorResponse(res, statusCodes.badRequest, messages.badRequest);
          }
        };
        await transaction.commit();

        const getNewCouponWithItsRulesAndDiscount = await couponDal.getCouponWithItsRulesAndDiscount(coupon_id);

        if (!getNewCouponWithItsRulesAndDiscount) {
          return errorResponse(res, statusCodes.badRequest, messages.badRequest);
        };
    
        return successResponseWithData(res, statusCodes.created, messages.created, getNewCouponWithItsRulesAndDiscount);

    } catch (error) {
      await  transaction.rollback();
      throw new Error(error);
    }  
  },
  couponCart: async (data, res) => { 
    // This is for '/coupon' endpoint
    // get coupon code if it exists including its rules and wwe
    // get cart array
    // calculate the total price of all items in the cart
    // get the length of items in the cart

    // retrieve the coupon rules and check if the cart total price and length conforms with the coupon rules

    // if it does not conform with the coupon rules, return an error message
    // if it conforms with the coupon rules, return the cart total price, length, total discount and the discounted price
    
  },

  getAllCoupon: async (res) => {
    try {
      const allCoupon = await couponDal.getAllCoupons();
      if (!allCoupon) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      }

      return successResponseWithData(res, statusCodes.success, messages.success, allCoupon);
    } catch (error) {
      throw new Error(error);
    }
  },

  getCouponById: async (id, res) => {
    try {
      const couponExists = await couponDal.getCouponByField({id});
      if (!couponExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };

      return successResponseWithData(res, statusCodes.created, messages.created, couponExists);
      
    } catch (error) {
      throw new Error(error);
    };
  },

  updateCoupon: async (data, res) => {
    try {
      const { id } = data;
      const couponExists = await couponDal.getCouponByField({id});
      if (!couponExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };
  
      const updatesCoupon = await couponDal.updateCoupon(data);
      if (!updatesCoupon) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      };
  
      return successResponseWithData(res, statusCodes.success, messages.success, updatesCoupon);
      
    } catch (error) {
      throw new Error(error);
    };  
  },

  deleteCouponById: async (id, res) => {
    try {
      const couponExists = await couponDal.getCouponByField({id});
      if (!couponExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };
  
      const deleteCoupon = await couponDal.deleteACouponById(id);
      if (!deleteCoupon) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      };
  
      return successResponse(res, statusCodes.deleted, messages.deleted);
      
    } catch (error) {
      throw new Error(error);
    };
  }
};

module.exports = {couponService};