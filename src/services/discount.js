const { discountDal } =require('../dal');
const {
  errorResponse,
  messages,
  statusCodes,
  successResponseWithData,
  successResponse,
  errorResponseWithData
} =require('../utils');

const discountService = {
  createDiscount: async (data, res) => {
    try {
      const {name} = data;

      const discountExists = await discountDal.getDiscountByField({ name });
      console.log(discountExists);
      if (discountExists && discountExists.length > 0) {
        return errorResponse(res, statusCodes.conflict, messages.conflict);
      };
      
      const newDiscount = await discountDal.createDiscount(data);
      if (!newDiscount) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      };
  
      return successResponseWithData(res, statusCodes.created, messages.created, newDiscount);

    } catch (error) {
      throw new Error(error);
    }  
  },

  getAllDiscount: async (res) => {
    try {
      const allDiscounts = await discountDal.getAllDiscount();
      if (!allDiscounts) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      }

      return successResponseWithData(res, statusCodes.success, messages.success, allDiscounts);
    } catch (error) {
      throw new Error(error);
    }
  },

  getDiscountById: async (id, res) => {
    try {
      const discountExists = await discountDal.getDiscountByField({id});
      if (!discountExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };

      return successResponseWithData(res, statusCodes.created, messages.created, discountExists);
      
    } catch (error) {
      throw new Error(error);
    };
  },

  updateDiscount: async (data, res) => {
    try {
      const { id } = data;
      const discountExists = await discountDal.getDiscountByField({id});
      if (!discountExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };
  
      const updateDiscount = await discountDal.updateDiscount(data);
      if (!updateDiscount) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      }
  
      return successResponseWithData(res, statusCodes.success, messages.success, updateDiscount);
      
    } catch (error) {
      throw new Error(error);
    };  
  },

  deleteDiscountById: async (id, res) => {
    try {
      const discountExists = await discountDal.getDiscountByField({id});
      if (!discountExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };
  
      const deleteDiscount = await discountDal.deleteADiscountById(id);
      if (!deleteDiscount) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      };
  
      return successResponse(res, statusCodes.deleted, messages.deleted);
      
    } catch (error) {
      throw new Error(error);
    };
  }
};

module.exports = { discountService };