<template>
    <header class="flex gap-4 items-center">
        <button @click.prevent="test" class="btn btn-outline rounded-full border-2  text-base-100">
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h3 class="font-extrabold uppercase text-xl text-base-100">
            {{ title }}
        </h3>
        <BurgerMenu class=" self-end ml-auto">

        </BurgerMenu>
    </header>
</template>


<script>
import BurgerMenu from './BurgerMenu.vue'
export default {
    props: ['title'],
    components: {
        BurgerMenu
    },
    methods: {
        test() {
            this.$router.back()
        },
        beforeRouteUpdate(to, from) {
            console.log(to, from);
            // called when the route that renders this component has changed, but this component is reused in the new route.
            // For example, given a route with params `/users/:id`, when we navigate between `/users/1` and `/users/2`,
            // the same `UserDetails` component instance will be reused, and this hook will be called when that happens.
            // Because the component is mounted while this happens, the navigation guard has access to `this` component instance.
        },
    }

}

</script>