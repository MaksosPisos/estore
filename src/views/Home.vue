<template>
    <div class="min-h-screen w-full flex items-center justify-center lg:justify-start lg:items-stretch">
        <div class=" basis-1/2 bg-slate-200 items-center justify-center text-base-100 hidden lg:flex">
            <Logo />
        </div>
        <div class=" lg:basis-1/2 flex items-center justify-center">
            <div class="flex flex-col justify-center gap-2 max-w-[300px] items-center">
                <h2 class="font-extrabold text-xl ">
                    Welcome to the SHOPSTORE
                </h2>
                <p class=" font-medium">
                    Lorem ipsum dolor sit amet adipisicing elit. Impedit eos non sunt
                    saepe pariatur ea quia, aspernatur quasi?
                </p>
                <router-link class="btn btn-outline mt-2 rounded-full border-2" to="/shop">
                    Lets go shopping
                </router-link>
            </div>
        </div>
    </div>
</template> 

<script>
import Logo from "../components/Logo.vue";
export default {
    components: {
        Logo,
    }
}
</script>