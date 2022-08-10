<template>
    <div class="toast toast-top toast-end">
        <div class="alert alert-success" v-if="alertType === 'success'">
            <div>
                <span>added to the cart</span>
            </div>
        </div>
        <div class="alert alert-error" v-else-if="alertType === 'error'">
            <div>
                <span>removed from the cart</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['alertType']
}

</script>