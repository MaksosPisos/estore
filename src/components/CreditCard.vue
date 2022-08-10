<template>
    <div class="credit-card">
        <div class="credit-card__inner" :class="{
            'show-back': showBack
        }">
            <CardFront :backgroundImage="backgroundImage" :symbolImage="symbolImage" :cardNumber="cardNumber"
                :expireMonth="expireMonth" :expireYear="expireYear" :name="name" />
            <CardBack :cvv="cvv" :backgroundImage="backgroundImage" />
        </div>
    </div>
</template>

<script>
import CardFront from './CardFront.vue'
import CardBack from './CardBack.vue'

export default {
    data() {
        return {
            backgroundImage: this.randomCard()
        };
    },
    methods: {
        randomCard() {
            return `/images/card/card-${Math.floor(Math.random() * 5) + 1}.jpg`;
        }
    },
    props: ['cardNumber', 'expireMonth', 'expireYear', 'cvv', 'name', 'showBack', 'symbolImage'],

    components: { CardFront, CardBack }
}
</script>

<style scoped lang="scss">
.credit-card {
    font-family: "Source Code Pro", monospace;
    max-width: 420px;
    width: 100%;
    height: 245px;
    background-color: transparent;
    color: white;
    perspective: 1000px;
    display: inline-block;

    &:hover &__inner {
        transform: rotateY(180deg);
    }

    &__inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
    }

    @media screen and (max-width: 480px) {
        height: 200px;
    }

    @media screen and (max-width: 360px) {
        height: 180px;
    }
}

.show-back {
    transform: rotateY(180deg);

    &:hover {
        transform: rotateY(0deg);
    }
}
</style>
