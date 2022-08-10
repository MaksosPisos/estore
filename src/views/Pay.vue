<template>
    <div class="bg-base-100 min-h-screen w-full p-3 lg:p-5 2xl:p-6 flex items-center justify-center">
        <div class="bg-white shadow-lg p-2 lg:p-6 rounded-md text-black flex flex-col gap-4 items-center">
            <InnerHeader title="SHOPSTOREPAY" />
            <div class=" self-center w-80 sm:w-96">
                <CreditCard :expireYear="cardYear" :expireMonth="cardMonth" :cardNumber="cardNumber" :name="cardOwner"
                    :cvv="cardCvv" :showBack="showBack" :symbolImage="'/images/card/' + symbolImage + '.png'" />
            </div>
            <form class="flex flex-col gap-2">
                <label for="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" autofocus placeholder="Type here" :value="cardNumber"
                    v-imask="cardMasks" @accept="onAcceptCardType"
                    class="input input-bordered input-primary bg-white focus:shadow-xl w-full max-w-xs" />
                <label for="cardOwner">Card Owner</label>
                <input type="text" id="cardOwner" placeholder="Type here" autocomplete="off" v-model="cardOwner" maxlength="30"
                    class="input input-bordered input-primary bg-white focus:shadow-xl w-full max-w-xs" />
                <div class="flex gap-2">
                    <div class="flex flex-col gap-2">
                        <label for="date">date</label>
                        <select id="date" class="select select-primary max-w-[120px] w-[101px] bg-white focus:shadow-xl"
                            v-model="cardMonth">
                            <option value="" disabled selected>Month</option>
                            <option v-for="n in 12" :value="n < 10 ? '0' + n : n" :key="n">
                                {{ 10 > n ? "0" + n : n }}
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="year">year</label>
                        <select id="year" class="select select-primary max-w-[120px] w-[101px] bg-white focus:shadow-xl"
                            v-model="cardYear">
                            <option value="" disabled selected>Year</option>
                            <option v-for="(n, $index) in 12" :value="$index + currentYear" :key="n">
                                {{ $index + currentYear }}
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="cvv">cvv</label>
                        <input type="text" id="cvv" placeholder="Type here" maxlength="3" v-model="cardCvv" autocomplete="off"
                            @focus="showBack = true" @blur="showBack = false" v-imask="cvvMask" @accept="onAcceptCvv"
                            class="input input-bordered input-primary bg-white focus:shadow-xl w-[101px] max-w-[120px]" />
                    </div>
                </div>
            </form>
            <div>

            </div>
            <button class="btn btn-primary text-black  self-stretch">
                to be paid: {{getTotalPrice}}$
            </button>
        </div>

    </div>
</template>

<script>
import { IMaskDirective } from "vue-imask";
import { cardMasks, cvvMask } from "@/masks";
import CreditCard from '../components/CreditCard.vue'
import InnerHeader from "../components/InnerHeader.vue";
export default {
    data() {
        return {
            cardMasks: cardMasks,
            cvvMask: cvvMask,
            cardNumber: '',
            cardOwner: '',
            cardMonth: '',
            cardYear: '',
            cardCvv: '',
            currentYear: new Date().getFullYear(),
            showBack: false,
            symbolImage: "mastercard",
        }
    },
    components: {
        CreditCard,
        InnerHeader
    },
    computed: {
        getTotalPrice() {
            return this.$store.getters.getTotalPrice;
        },
    },
    methods: {
        onAcceptCardType(e) {
            const maskRef = e.detail;
            const type = maskRef.masked.currentMask.cardtype;

            if (type !== "Unknown") {
                this.symbolImage = type;
            }

            this.cardNumber = maskRef.value;
        },
        onAcceptCvv(e) {
            const maskRef = e.detail;
            this.cvv = maskRef.value;
        }
    },
    directives: {
        imask: IMaskDirective
    },
    watch: {
        $route(to, from) {
            if (to.name === 'Shop') {
                to.meta.transitionName = 'slide-left'
                from.meta.transitionName = 'slide-left'
                // console.log(from.meta.transitionName);
            }
            // console.log(to, from);
        }
    }

}

</script>