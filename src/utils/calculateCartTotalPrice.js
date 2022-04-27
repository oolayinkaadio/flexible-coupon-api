function calculateCartTotalPrice(cartProducts) {
  let totalPrice = 0;

  if (cartProducts && cartProducts.length > 0) {
    totalPrice = cartProducts.reduce((a, b) => a.price + b.price,0);
  };

  return totalPrice;
};

module.exports = {calculateCartTotalPrice};