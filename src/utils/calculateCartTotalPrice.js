function calculateCartTotalPrice(cartProducts) {
  let totalPrice = 0;

  if (cartProducts && cartProducts.length > 0) {
    totalPrice = cartProducts.reduce((a, b) => a.price + b.price);
  };

  return totalPrice;
};

module.exports = {calculateCartTotalPrice};