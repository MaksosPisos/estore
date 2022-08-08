import Vuex from "vuex";
import axios from "axios";

export default new Vuex.Store({
  state: {
    API_URL: "http://localhost:3000",
    products: [],
    product: null,
    error: null,
    loading: false,
  },
  getters: {
    // getProducts: state => {}
    // вычисляемые свойства на основе состояния
  },
  mutations: {
    changeLoading: state => {
      return state.loading = !state.loading
    },
    changeError: (state, body) => {
      return state.error = body
    },
    changeProducts: (state, body) => {
      return state.products = body
    },
    changeProduct: (state, body) => {
      return state.product = body
    },
    // помещаем сюда синхронные функции для изменения состояния: добавления, редактирования, деления
  },
  actions: {
    async fetchProducts(context) {
      context.commit('changeLoading')
      context.commit('changeError', null)
      try {
        const response = await axios.get(
          `${context.state.API_URL}/products`
        );
        // console.log(response);
        context.commit('changeProducts', response.data)
      } catch (error) {
        context.commit('changeError', error);
      } finally {
        context.commit('changeLoading')
      }
    },
    async fetchProduct(context, slug) {
      context.commit('changeLoading')
      context.commit('changeError', null)
      try {
        const response = await axios.get(
          `${context.state.API_URL}/products/${slug}`
        );
        context.commit('changeProduct', response.data[0])
      } catch (error) {
        context.commit('changeError', error);
      } finally {
        context.commit('changeLoading')
      }
    },
  },
});
// json-server --watch ./src/data/products.json --routes ./routes.json