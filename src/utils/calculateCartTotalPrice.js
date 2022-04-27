function calculateCartTotalPrice(cartProducts) {
  let totalPrice = 0;

  if (cartProducts && cartProducts.length > 0) {
    for (let i = 0; i <cartProducts.length; i++) {
      totalPrice += cartProducts[i].price;
    }
  };

  return totalPrice;
};

module.exports = {calculateCartTotalPrice};