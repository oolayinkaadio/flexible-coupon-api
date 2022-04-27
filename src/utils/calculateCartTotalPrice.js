function calculateCartTotalPrice(cartProducts) {
  let totalPrice = 0;

  if (cartProducts && cartProducts.length > 0) {
    totalPrice = cartProducts.reduce((a, b) => {
      console.log('QQ', a.price, b.price);
      return a.price + b.price;
    }, 0);
    console.log(totalPrice);
  };

  return totalPrice;
};

module.exports = {calculateCartTotalPrice};