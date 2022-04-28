const { couponDal, db,ruleDal, discountDal, couponRuleDal, couponDiscountDal } = require('../dal');
const {
 successResponseWithData, successResponse, errorResponseWithData, errorResponse, generateCouponCode, messages, statusCodes
} = require('../utils');

const couponService = {
  createCoupon: async (data, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      const { code } = data;
      
      const ruleIds = data.ruleIds ? data.ruleIds : null;
      const discountIds = data.discountIds ? data.discountIds : null;

      const couponExists = await couponDal.getCouponByField({ code });
      
      if (couponExists) {
        return errorResponse(res, statusCodes.conflict, messages.conflict);
      };
     
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

  getCouponByField: async (field={}, res) => {
    try {
      const couponExists = await couponDal.getCouponByField(field);
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