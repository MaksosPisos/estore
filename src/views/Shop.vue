<template>
    <div class="bg-base-100 min-h-screen w-full p-3 lg:p-5 2xl:p-6 flex">
        <div class="container bg-slate-50 rounded-2xl p-4 lg:p-6 shadow-lg mx-auto">
            <div>
                <InnerHeader title="Our products"></InnerHeader>
            </div>
            <div v-if="loading" class="text-center text-base-100 font-extrabold uppercase mt-4">
                Loading Products ...
            </div>
            <div v-else-if="error"
                class="text-center text-base-100 font-extrabold uppercase bg-rose-400 mt-4 p-4 rounded-md shadow-md">
                {{ error.message }}
            </div>
            <div class="products" v-else>
                <ProductCard v-for="item in products" :product="item"></ProductCard>
            </div>
        </div>
        <AlertCart v-if="$store.getters.getShowAlert" :alertType="$store.getters.getTypeAlert" @click="changeShowAlert(false)" class="z-[100]" />
    </div>

</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import InnerHeader from '../components/InnerHeader.vue'
import AlertCart from '../components/AlertCart.vue'
export default {
    components: {
        ProductCard,
        InnerHeader,
        AlertCart
    },
    computed: {
        products() {
            return this.$store.state.products
        },
        loading() {
            return this.$store.state.loading
        },
        error() {
            return this.$store.state.error
        },
        fetchProducts() {
            return this.$store.dispatch('fetchProducts')
        },
    },
    methods: {
        changeShowAlert(show) {
            this.$store.commit('changeShowAlert', show)
        },
    },
    mounted() {
        this.changeShowAlert(false)
        this.fetchProducts
    },
}
</script>