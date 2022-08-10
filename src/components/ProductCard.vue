<template>
    <div class="card card-compact bg-base-100 shadow-xl">
        <router-link :to="`/product/${product.slug}`">
            <figure><img
                    :src="product.image && product.image.thumbnail ? product.image.thumbnail : '/images/default-product-image.png'"
                    :alt="product.name" class="min-h-[292px] lg:min-h-[304px] object-cover object-center" /></figure>
        </router-link>
        <div class="card-body">
            <router-link :to="`/product/${product.slug}`">
                <h2 class="card-title"> {{ product.name }} </h2>
            </router-link>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="flex items-center justify-between pt-4">
                <div class="flex gap-2 flex-col">
                    <span v-if="product.oldPrice" class=" line-through text-sm">${{ product.oldPrice.toFixed(2)
                    }}</span>
                    <span v-if="product.oldPrice" class="text-error font-bold text-lg">${{ product.price.toFixed(2)
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

</template>

<script>
import AlertCart from '../components/AlertCart.vue'
export default {
    props: [
        'product',
    ],
    components: {
        AlertCart
    },
    data() {
        return {
            alertType: '',
        }
    },
    computed: {
        
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
}
</script>