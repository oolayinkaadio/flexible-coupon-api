function calculateCartTotalPrice(cartProducts) {
  let totalPrice = 0;

  if (cartProducts && cartProducts.length > 0) {
    totalPrice = cartProducts.reduce(((a, b) 0)=> a.price + b.price);
  };
  // arr.reduce(callback( accumulator, currentValue, [, index[, array]] )[, initialValue])

  return totalPrice;
};

module.exports = {calculateCartTotalPrice};