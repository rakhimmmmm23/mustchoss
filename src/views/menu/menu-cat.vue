<template>
    <template v-for="item in menu" :key="item.slug">
        <template v-if="item.slug === this.$route.params.menucat">
            <div v-for="dish in item.dishes" :key="dish.id" class="menuDish">
                <figure v-if="dish.thumb === null || dish.thumb === ''" class="menuDish__thumb-empty"></figure>
                <img v-else :src="dish.thumb" :alt="dish.name" class="menuDish__thumb-img">

                <span class="menuDish__info">
                    <h5>{{ dish.name }}</h5>
                    <!-- <h6>title</h6> -->
                    <p v-if="dish.ingredients != null">{{ dish.ingredients }}</p>
                </span>

                <span class="menuDish__action">
                    <span class="menuDish__action-price">{{ dish.price }}</span>
                </span>
                <div :class="'menuDish_cart-push ' + (countDish[dish.id] ? 'menuDish_cart-push-active' : '')">
                    <p>В корзину</p>
                    <button @click="decrementDish(dish.id, dish.price)" class="btn_menu_cart-start-minus">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10.5" cy="10.5" r="10" stroke="black" />
                            <path d="M8.27438 11.84V10.544H12.7224V11.84H8.27438Z" fill="#242424" />
                        </svg>
                    </button>
                    <span class="count_menu-cart">{{ countDish[dish.id] ? countDish[dish.id]["count"] : '' }}</span>
                    <button @click="incrementDish(dish.id, dish.price)">
                        <svg class="svg_menu_cart-start" width="21" height="21" viewBox="0 0 21 21" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.91081 14.24V10.944H6.58281V9.792H9.91081V6.496H11.0948V9.792H14.4228V10.944H11.0948V14.24H9.91081Z"
                                fill="#242424" />
                            <circle cx="10.5" cy="10.5" r="10" stroke="black" />
                        </svg>
                        <svg class="svg_menu_cart-edit-plus" width="21" height="21" viewBox="0 0 21 21" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10.5" cy="10.5" r="10" fill="#242424" stroke="black" />
                            <path
                                d="M9.91081 14.24V10.944H6.58281V9.792H9.91081V6.496H11.0948V9.792H14.4228V10.944H11.0948V14.24H9.91081Z"
                                fill="white" />
                        </svg>

                    </button>
                </div>
            </div>
        </template>
    </template>
</template>

<script>
import { useHead } from '@vueuse/head'
export default {
    data() {
        return {
            menu: [],
            countDish: {},
            costOrder: null
        }
    },
    setup() {
        useHead({
            title: 'Меню / Доставка / Предзаказ',
        })
    },
    beforeMount() {
        // this.menu = this.$parent.$parent.menu
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/single?filter={slug:"' + this.$route.params.slug + '"}', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.menu = result.menu
            })
        const tmpObjectCount = localStorage.getItem(`cart-${this.$route.params.slug}`)
        if (tmpObjectCount !== null && tmpObjectCount !== "null")
            this.countDish = JSON.parse(tmpObjectCount)
           
         const tmpCostCart=localStorage.getItem(`cost-${this.$route.params.slug}`);
         if(tmpCostCart!==null && tmpCostCart!=="null"){
            this.costOrder = tmpCostCart;
            this.$store.dispatch('utils/setCostCart', tmpCostCart);
         }
    },
    methods: {
        decrementDish(id, dishCost) {
            if (this.countDish[id]["count"] > 0) {
                this.countDish[id]["count"] -= 1;
                this.countDish[id]["cost"] = parseInt(dishCost)
                const tmpCart = JSON.stringify(this.countDish);
                localStorage.setItem(`cart-${this.$route.params.slug}`, tmpCart);
                this.getStorageCartInfo()
            }
        },
        incrementDish(id, dishCost) {
            if (!this.countDish[id]) {
                this.countDish[id] = {};
            }
            this.countDish[id]["count"] = (this.countDish[id]["count"] || 0) + 1;
            this.countDish[id]["cost"] = parseInt(dishCost);

            const tmpCart = JSON.stringify(this.countDish);
            localStorage.setItem(`cart-${this.$route.params.slug}`, tmpCart);
            this.getStorageCartInfo();
        },
        getStorageCartInfo() {
            const data = localStorage.getItem(`cart-${this.$route.params.slug}`)
            const parsedData = JSON.parse(data);
            let totalCost = 0;
            for (const key in parsedData) {
                if (Object.prototype.hasOwnProperty.call(parsedData, key)) {
                    totalCost += parsedData[key].count * parsedData[key].cost;
                }
            }
            this.costOrder = totalCost;
            localStorage.setItem(`cost-${this.$route.params.slug}`, totalCost);
            this.$store.dispatch('utils/setCostCart', totalCost);
        }
    }
}
</script>