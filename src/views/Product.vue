<template>

    <div class="bg-base-100 min-h-screen w-full p-3 lg:p-5 2xl:p-6 flex">
        <div class="container bg-slate-50 rounded-2xl p-4 lg:p-6 shadow-lg mx-auto">
            <div>
                <InnerHeader :title="product ? product.name : 'Product'"></InnerHeader>
            </div>
            <div class="card sm:w-96 card-compact bg-base-100 shadow-xl mt-4 mx-auto" v-if="product">
                <figure><img
                        :src="product.image && product.image.thumbnail ? product.image.thumbnail : '/images/default-product-image.png'"
                        :alt="product.name" class="min-h-[292px] lg:min-h-[304px] object-cover object-center w-full" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title"> {{ product.name }} </h2>

                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="flex items-center justify-between pt-4">
                        <div class="flex gap-2 flex-col">
                            <span v-if="product.oldPrice" class=" line-through text-sm">${{ product.oldPrice.toFixed(2)
                            }}</span>
                            <span v-if="product.oldPrice" class="text-error font-bold text-lg">${{
                                    product.price.toFixed(2)
                            }}</span>
                            <span v-else-if="product.price && product.inStock" class="font-bold text-xl">
                                ${{ product.price.toFixed(2) }}
                            </span>
                            <span v-else class="font-bold flex flex-wrap uppercase">
                                Товара нет :(
                            </span>
                        </div>
                        <div class="">
                            <button class="btn rounded-r-none" :disabled="!product.inStock"
                                :class="{ 'btn-success': $store.getters.getProductInCart(product.slug) !== -1, 'btn-secondary': $store.getters.getProductInCart(product.slug) === -1 }"
                                @click="changeCart(product)">
                                <i class="fa-duotone fa-cart-plus"
                                    v-if="$store.getters.getProductInCart(product.slug) === -1 && product.inStock"></i>
                                <i class="fa-solid fa-cart-circle-xmark" v-else-if="!product.inStock"></i>
                                <i class="fa-solid fa-cart-circle-check" v-else></i>
                            </button>
                            <router-link to="/shop/pay" class="btn btn-primary rounded-l-none"
                                :class="{ 'pointer-events-none': !product.inStock, 'opacity-30': !product.inStock }"
                                @click="addToPay(product)">Buy Now</router-link>
                        </div>

                    </div>
                </div>
            </div>
            <!-- <router-link to="/product/amazon-boxer" class="text-black"> shoes </router-link> -->
        </div>
        <AlertCart v-if="$store.getters.getShowAlert" :alertType="$store.getters.getTypeAlert"
            @click="changeShowAlert(false)" class="z-[100]" />
    </div>

</template>


<script>
import AlertCart from '../components/AlertCart.vue'
import InnerHeader from '../components/InnerHeader.vue'
export default {
    components: {
        InnerHeader,
        AlertCart,
    },
    data() {
        return {
            slug: '',
        }
    },
    computed: {
        product() {
            return this.$store.state.product
        },
        loading() {
            return this.$store.state.loading
        },
        error() {
            return this.$store.state.error
        },
        fetchProduct() {
            this.slug = this.$route.params.slug
            return this.$store.dispatch('fetchProduct', this.slug)
        },
    },
    methods: {
        changeShowAlert(show) {
            this.$store.commit('changeShowAlert', show)
        },
        changeCart(productItem) {
            if (this.$store.getters.getProductInCart(productItem.slug) !== -1) {
                this.$store.commit('delFromCart', productItem.slug)
                this.$store.commit('changeTypeAlert', 'error')
            } else {
                this.$store.commit('addToCart', productItem)
                this.$store.commit('changeTypeAlert', 'success')
            }
            this.changeShowAlert(true)
        },
        addToPay(productItem) {
            if (this.$store.getters.getProductInCart(productItem.slug) === -1) {
                this.$store.commit('addToCart', productItem)
            }
        }
    },
    mounted() {
        this.changeShowAlert(false)
        this.fetchProduct
    },
    watch: {
        '$route.path'() {
            this.slug = this.$route.params.slug
            this.fetchProduct
        },
        $route(to, from) {
            if (to.name === 'Shop') {
                to.meta.transitionName = 'slide-left'
                from.meta.transitionName = 'slide-left'
                // console.log(from.meta.transitionName);
            }
            // console.log(to, from);
        }
    },

}
</script>