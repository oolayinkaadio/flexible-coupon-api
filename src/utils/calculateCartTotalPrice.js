function calculateCartTotalPrice(cartProducts) {
  let totalPrice = 0;

  if (cartProducts && cartProducts.length > 0) {
    totalPrice = cartProducts.reduce((a, b) => {return a.price + b.price}, 0);
  };
  arr.reduce(callback( accumulator, currentValue, [, index[, array]] )[, initialValue])

  return totalPrice;
};

module.exports = {calculateCartTotalPrice};