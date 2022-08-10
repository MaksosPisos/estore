const state = () => ({
  cart: localStorage.tmpCart ? JSON.parse(localStorage.tmpCart) : [],
  showCart: false,
  showAlert: false,
  typeAlert: '',
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
      total += item.price * item.quantity;
    });
    return total;
  },
  getShowCart: (state) => state.showCart,
  getShowAlert: (state) => state.showAlert,
  getTypeAlert: (state) => state.typeAlert,
};

const mutations = {
  changeShowAlert: (state, show, type) => {
    state.showAlert = show
  },
  changeTypeAlert: (state, type) => {
    state.typeAlert = type
  },
  changeShowCart: (state, show) => {
    state.showCart = show;
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
  incrementQuantity: (state, slug) => {
    let index = state.cart.findIndex((item) => item.slug === slug);
    state.cart[index].quantity++;
  },
  decrementQuantity: (state, slug) => {
    let index = state.cart.findIndex((item) => item.slug === slug);
    if (state.cart[index].quantity > 1) {
      state.cart[index].quantity--;
    }
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
