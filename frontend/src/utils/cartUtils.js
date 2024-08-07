export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    // calculate item price
    state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price, 0));
    // calculate shipping price (if course price is over 100$ then free, else 10$ shipping)
    state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
    // calculate tax price
    state.taxPrice = addDecimal(Number((0.05 * state.itemsPrice).toFixed(2)));
    // calculate total price
    const itemsPriceNum = parseFloat(state.itemsPrice);
    const shippingPriceNum = parseFloat(state.shippingPrice);
    const taxPriceNum = parseFloat(state.taxPrice);
    state.totalPrice = addDecimal(itemsPriceNum + shippingPriceNum + taxPriceNum);
    // save cart to local storage
    localStorage.setItem("cart", JSON.stringify(state));

    return state;
}