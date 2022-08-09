const state = () => ({
  cart: localStorage.tmpCart ? JSON.parse(localStorage.tmpCart) : [],
  showCart: false,
});

const getters = {
  getCartlength: (state) => state.cart.length,
  getProductInCart: (state) => (slug) => {
    return state.cart.findIndex((item) => item.slug === slug);
  },
  getCart: (state) => state.cart,
  getTotalQuantity: (state) => {
    let total = 0;
    state.cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  },
  getTotalPrice: (state) => {
    let total = 0;
    state.cart.forEach((item) => {
        total += item.price;
    })
    return total
  },
  getShowCart: state => state.showCart
};

const mutations = {
  // setHeader (state, data) {
  //   state.header = data
  // }
  changeShowCart: (state, show) => {
    state.showCart = show
  },
  addToCart: (state, body) => {
    body.quantity = 1;
    state.cart.push(body);
    localStorage.tmpCart = JSON.stringify(state.cart);
  },
  delFromCart: (state, slug) => {
    state.cart = state.cart.filter((item) => item.slug !== slug);
    localStorage.tmpCart = JSON.stringify(state.cart);
  },
};
const actions = {
  // async setHeader ({ commit }) {
  //   const data = await this.$axios.$get('/api/sections?withPages=true')
  //   commit('setHeader', data.find(el => el.type === 'header').pages)
  // }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
