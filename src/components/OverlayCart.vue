<template>
    <div class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="bg-white text-base-100 w-screen lg:w-[500px] rounded-md shadow-md flex flex-col p-4 gap-4">
            <div class="text-black uppercase font-bold flex items-center justify-between text-xl pb-4">
                <span class="flex-grow text-center">Cart shopstore</span>
                <button @click="changeShowCart(false)" class="btn btn-outline rounded-full border-2 text-base-100">
                    <i class="fa-solid fa-xmark text-xl font-extrabold w-3 h-3 leading-3"></i>
                </button>
            </div>
            <div v-if="cart.length" v-for="product in cart" class="flex flex-col gap-2 border-2 p-2 rounded relative">
                <div class="flex items-center justify-between">
                    <img :src="product.image && product.image.thumbnail ? product.image.thumbnail : '/images/default-product-image.png'"
                        :alt="product.name" class="h-12 w-16 object-cover object-center rounded shadow-md">
                    <router-link :to="`/product/${product.slug}`" class="font-bold uppercase">
                        {{ product.name }}
                    </router-link>
                    <div class="text-black font-bold flex flex-col items-center gap-1">
                        <span>{{ product.price.toFixed(2) }}$</span>
                        <div class="flex items-center justify-between gap-2">
                            <button class="bg-rose-400 px-2 rounded-md" @click="decrementQuantity(product.slug)">
                                -
                            </button>
                            <span class="w-6 text-center">{{ product.quantity }}</span>
                            <button class="bg-emerald-400 px-2 rounded-md" @click="incrementQuantity(product.slug)">
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <button class="absolute -top-1 -right-0" @click="delFromCart(product.slug)">
                    <i class="fa-solid fa-xmark w-4 h-4"></i>
                </button>
            </div>
            <div v-else class="flex items-center flex-col gap-4">
                <h4 class="font-bold uppercase text-xl text-base-100">Корзина пустая :(</h4>
            </div>
            <div class="text-black font-bold flex items-center justify-end gap-4">
                <span class="uppercase">Total price:</span>
                <div class="flex items-center gap-1">
                    <span>{{ getTotalPrice.toFixed(2) }}$</span>
                </div>
            </div>
            <router-link to="/shop/pay" class="btn btn-primary rounded-l-none text-black"
                @click="closeModalCart">Buy Now</router-link>
        </div>
    </div>
</template>


<script>

export default {
    data() {
        return {};
    },
    computed: {
        cart() {
            return this.$store.getters.getCart;
        },
        getTotalPrice() {
            return this.$store.getters.getTotalPrice;
        },
        getTotalQuantity() {
            return this.$store.getters.getTotalQuantity;
        }
    },
    methods: {
        changeShowCart(show) {
            return this.$store.commit('changeShowCart', show)
        },
        incrementQuantity(slug) {
            return this.$store.commit('incrementQuantity', slug)
        },
        decrementQuantity(slug) {
            return this.$store.commit('decrementQuantity', slug)
        },
        delFromCart(slug) {
            return this.$store.commit('delFromCart', slug)
        },
        closeModalCart() {
            this.changeShowCart(false)
        },
    },
}
</script>