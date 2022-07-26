<template>
    <div class="bg-base-100 min-h-screen w-full p-3 lg:p-5 2xl:p-6 flex">
        <div class="container bg-slate-50 rounded-2xl p-4 lg:p-6 shadow-lg mx-auto">
            <div class="flex justify-between items-center text-base-100">
                <router-link to="/" class="btn btn-outline mt-2 rounded-full border-2  text-base-100"><i
                        class="fa-solid fa-arrow-left"></i></router-link>
                <div class=" font-bold text-3xl">
                    Page Title
                </div>
                <BurgerMenu />
            </div>
            <div class=" mt-4">
                <Product />
            </div>

        </div>
    </div>

</template>

<script>
import Product from './Product.vue'
import BurgerMenu from '../components/BurgerMenu.vue'
export default {
    components: {
        Product,
        BurgerMenu,
    }
}
</script>