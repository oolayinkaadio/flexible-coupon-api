const {
  errorResponse, errorResponseWithData, successResponse,
  successResponseWithData
} =require('./apiResPonse');
const { messages } = require('./messages');
const { generateCouponCode } = require('./generateCouponCode');
const {calculateCartTotalPrice} = require('./calculateCartTotalPrice');

const {statusCodes} = require('./statusCodes');

module.exports = {
  generateCouponCode,
  successResponse,
  successResponseWithData,
  errorResponseWithData,
  errorResponse,
  statusCodes,
  messages,
  calculateCartTotalPrice
};