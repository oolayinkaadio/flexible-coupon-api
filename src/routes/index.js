const express = require('express');

const { couponRouter } = require('./coupon');
const { discountRouter } = require('./discount');
const { ruleRouter } = require('./rule');
const { productRouter } = require('./product');
const { cartRouter } = require('./cart');

const router = express.Router();

router.use('/coupon', couponRouter);
router.use('/discount', discountRouter);
router.use('/rule', ruleRouter);
router.use('/cart', cartRouter);
router.use('/product', productRouter);

module.exports = router;