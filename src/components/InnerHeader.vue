<template>
    <header class="flex gap-2 lg:gap-4 items-center">
        <button @click.prevent="back" class="btn btn-outline rounded-full border-2  text-base-100 w-[48px] h-[48x]">
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h3 class="font-extrabold uppercase text-xl text-base-100">
            {{ title }}
        </h3>
        <button class="relative btn btn-outline rounded-full border-2  text-base-100 ml-auto w-[48px] h-[48x]"
            @click="changeShowCart(true)">
            <i class="fa-solid fa-cart-shopping"></i>
            <span
                class="absolute -top-1 -right-1 bg-secondary rounded-full w-5 h-5 text-white flex items-center justify-center text-xs leading-3">{{
                        getCartlength
                }}</span>
        </button>
        <button class="btn btn-outline rounded-full border-2 m-1 text-base-100 w-[48px] h-[48x]"
            @click="showMenu = true"><i class="  fa-solid fa-bars"></i></button>
        <Transition name="menu">
            <OverlayMenu v-if="showMenu" />
        </Transition>
        <Transition name="component-fade">
            <OverlayShadow v-if="showMenu || $store.getters.getShowCart" @click="changeShowCart(false)" />
        </Transition>
        <Transition name="cart">
            <OverlayCart v-if="$store.getters.getShowCart" />
        </Transition>
    </header>
</template>


<script>
import OverlayMenu from './OverlayMenu.vue'
import OverlayShadow from './OverlayShadow.vue'
import OverlayCart from './OverlayCart.vue'
export default {
    data() {
        return {
            showMenu: false,
            // showCart: false,
        }
    },
    props: ['title'],
    components: {
        OverlayMenu,
        OverlayShadow,
        OverlayCart
    },
    computed: {
        getCartlength() {
            return this.$store.getters.getCartlength
        },
    },
    methods: {
        back() {
            this.$router.back()
        },
        changeShowCart(show) {
            this.showMenu = false;
            this.$store.commit('changeShowCart', show)
        },
    },
    watch: {
        showMenu: function () {
            if (this.showMenu) {
                document.documentElement.style.overflow = 'hidden'
                return
            } else {
                document.documentElement.style.overflow = 'auto'
            }
        },
    }
}
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
    transition: .4s ease;
}

.menu-enter-to {
    left: 0;
}

.menu-enter-from {
    left: -320px;
}

.menu-leave-to {
    left: -320px;
}

.menu-leave-from {
    left: 0;
}

.cart-enter-active,
.cart-leave-active {
    transition: .4s ease;
}

.cart-enter-from,
.cart-leave-to {
    top: 0;
    opacity: 0;
}

.cart-leave-from,
.cart-enter-to {
    top: 50%;
    opacity: 1;
}
</style>