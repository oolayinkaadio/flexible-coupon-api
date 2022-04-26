const crypto = require('crypto');
const generateCouponCode = async () => {
  // return await crypto.randomBytes(10).toString("base64");
  let newCouponCode= "";
  const alphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 10; i++){
    newCouponCode += alphaNumeric.charAt(Math.floor(Math.random() * alphaNumeric.length));
  }
  return newCouponCode;
};

module.exports = { generateCouponCode };