<template>

    <div class="bg-base-100 min-h-screen w-full p-3 lg:p-5 2xl:p-6 flex">
        <div class="container bg-slate-50 rounded-2xl p-4 lg:p-6 shadow-lg mx-auto">
            <div>
                <InnerHeader :title="product ? product.name : 'Product'"></InnerHeader>
            </div>
            <div class="card w-96 card-compact bg-base-100 shadow-xl mt-4 mx-auto" v-if="product">
                <figure><img
                        :src="product.image && product.image.thumbnail ? product.image.thumbnail : '/images/default-product-image.png'"
                        :alt="product.name" class="min-h-[292px] lg:min-h-[304px] object-cover object-center" />
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
                            <button class="btn btn-secondary rounded-r-none" :disabled="!product.inStock"><i
                                    class="fa-duotone fa-cart-plus"></i></button>
                            <button class="btn btn-primary rounded-l-none" :disabled="!product.inStock">Buy Now</button>
                        </div>

                    </div>
                </div>
            </div>
            <!-- <router-link to="/product/amazon-boxer" class="text-black"> shoes </router-link> -->
        </div>
    </div>

</template>


<script>
import InnerHeader from '../components/InnerHeader.vue'
export default {
    components: {
        InnerHeader,
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
        }
    },
    mounted() {
        this.fetchProduct
    },
    watch: {
        // '$route.path'() {
        //     this.slug = this.$route.params.slug
        //     this.fetchProduct
        // },
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