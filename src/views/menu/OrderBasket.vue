<template>
    <div class="container-main-basket">

        <breadcrumbs current='Корзина' />

        <h4 class="basket-title">Корзина</h4>
        <div class="basket-wrapper-cont">
            <section class="cart-container">
                <div v-for="dish in menuCart" :key="dish.id" class="cart-item">
                    <div class="cart-item-dish-profile">
                        <div class="cart-item-img-container">
                            <img v-if="dish.thumb" :src="dish.thumb" alt="dish" />
                            <div v-else></div>
                        </div>
                        <div class="card-item-info">
                            <h5>{{ dish.name }}</h5>
                            <p>Название заведения</p>
                        </div>
                    </div>
                    <div>
                        <span class="menuDish__action">
                            <span class="menuDish__action-price">{{ dish.price }}</span>
                        </span>
                        <div class="menuDish_cart-push menuDish_cart-push-active">
                            <button @click="decrementDish(dish.id, dish.price)" class="btn_menu_cart-start-minus">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10.5" cy="10.5" r="10" stroke="black" />
                                    <path d="M8.27438 11.84V10.544H12.7224V11.84H8.27438Z" fill="#242424" />
                                </svg>
                            </button>
                            <span class="count_menu-cart">{{ countDish[dish.id]["count"] }}</span>
                            <button @click="incrementDish(dish.id, dish.price)">
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
                </div>

            </section>
            <div class="controlMenu-cart">
                <div class="info-order-and-price">
                    <h5>Ваш заказ</h5>
                    <div>
                        <p>Итого:</p> <span>{{ costOrder }} тг</span>
                    </div>
                </div>
                <div class="basket-selected-delivery">
                    <div @click="openModalDelivery" class="basket-selected-delivery-head">
                        <p v-if="selectedDelivery === 0">Доставка</p>
                        <img v-if="selectedDelivery === 1" src="/static/img/delivery/yandex.png" alt="delivery" />
                        <img v-if="selectedDelivery === 2" src="/static/img/delivery/choco.png" alt="delivery" />
                        <img v-if="selectedDelivery === 3" src="/static/img/delivery/wolt.png" alt="delivery" />
                        <img v-if="selectedDelivery === 4" src="/static/img/delivery/glovo.png" alt="delivery" />

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.41 8.57812L12 13.1681L16.59 8.57812L18 9.99813L12 15.9981L6 9.99813L7.41 8.57812Z"
                                fill="black" />
                        </svg>
                    </div>

                    <div class="selected-delivery-popup">
                        <div @click='deliveryHandler(0)' class="selected-delivery-popup-head selected-delivery-popup-item">
                            <p>Доставка</p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.59 15.42L12 10.83L7.41 15.42L6 14L12 8.00004L18 14L16.59 15.42Z"
                                    fill="black" />
                            </svg>
                        </div>
                        <div @click='deliveryHandler(1)'
                            class="selected-delivery-popup-item selected-delivery-popup-item-with-img">
                            <img src="/static/img/delivery/yandex.png" alt="delivery" />
                        </div>
                        <div @click='deliveryHandler(2)'
                            class="selected-delivery-popup-item selected-delivery-popup-item-with-img">
                            <img src="/static/img/delivery/choco.png" alt="delivery" />

                        </div>
                        <div @click='deliveryHandler(3)'
                            class="selected-delivery-popup-item selected-delivery-popup-item-with-img">
                            <img src="/static/img/delivery/wolt.png" alt="delivery" />

                        </div>
                        <div @click='deliveryHandler(4)'
                            class="selected-delivery-popup-item selected-delivery-popup-item-with-img">
                            <img src="/static/img/delivery/glovo.png" alt="delivery" />

                        </div>
                    </div>
                </div>
                <button @click="orderGoHandler()">Предзаказать</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import moment from 'moment'

export default {
    components: {
        breadcrumbs
    },
    data() {
        return {
            menuCart: [],
            countDish: {},
            costOrder: 0,
            allInfoEstb: {},
            selectedDelivery: 0,
            statistics: {
                establishmentID: '',
                date: '',
                visitors: 0,
                booking: 0,
                delivery: 0
            }
        }
    },
    setup() {
        useHead({
            title: 'Корзина',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/menu.css'
            }],
        })
    },
    beforeMount() {
        const cartDish = JSON.parse(localStorage.getItem(`cart-${this.$route.params.slug}`))
        this.countDish = cartDish
        const costDishCart = localStorage.getItem(`cost-${this.$route.params.slug}`);
        this.costOrder = costDishCart
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
                this.allInfoEstb = result
                const tmpDishes = [];
                result.menu.forEach(item => tmpDishes.push(...item["dishes"]))
                let filteredCart = tmpDishes.filter(item => {
                    const count = cartDish[item.id.toString()] && cartDish[item.id.toString()].count;
                    return count && count > 0;
                });
                const seenIds = new Map();
                filteredCart = filteredCart.filter(item => {
                    if (!seenIds.has(item.id)) {
                        seenIds.set(item.id, true);
                        return true;
                    }
                    return false;
                });
                this.menuCart = filteredCart;

                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/statistics?filter={establishmentID:"' + this.allInfoEstb.id + `",date:"${this.formattedDate()}"}`, requestOptions)
                    .then(response => response.json())
                    .then(result2 => {
                        this.statistics = result2
                    })
                    .catch(() => {
                        this.statistics = {
                            establishmentID: this.allInfoEstb.id,
                            date: this.formattedDate(),
                            visitors: 0,
                            booking: 0,
                            delivery: 0
                        }

                        let raw = JSON.stringify({
                            "data": this.statistics
                        })
                        let requestOptionsPost = {
                            method: 'POST',
                            headers: {
                                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                                'Content-Type': 'application/json'
                            },
                            body: raw,
                            redirect: 'follow'
                        }
                        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/statistics', requestOptionsPost)
                    })
            });
    },
    methods: {
        formattedDate() {
            return moment().format('YYYY-MM-DD');
        },
        openModalDelivery() {
            const popup = document.querySelector('.selected-delivery-popup')
            popup.classList.add('active')
            document.body.classList.add('lock')

        },
        deliveryHandler(num) {
            document.body.classList.remove('lock')
            document.querySelector('.selected-delivery-popup').classList.remove('active')
            this.selectedDelivery = num;
        },
        orderGoHandler() {
            const update = {
                establishmentID: this.allInfoEstb["id"],
                userID: this.$store.state.auth.user["id"],
                selectedDishes: this.menuCart,
                date: Date.now(),
                status: 'active'
            };
            if (this.selectedDelivery !== 0){
                update.delivery = true
                this.statistics.delivery+=1
            }
            else{
                update.delivery = false
            }

            let raw = JSON.stringify({
                "data": update
            })
            let requestOptions = {
                method: 'POST',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: raw,
                redirect: 'follow'
            }
            let rawStat = JSON.stringify({
                "data": this.statistics
            })
            let requestOptionsPost = {
                method: 'POST',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: rawStat,
                redirect: 'follow'
            }
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/statistics', requestOptionsPost)
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/order', requestOptions)
                .then(response => response.json())
                .then(() => {
                    this.$router.push(`/${this.$route.params.cat_city}/${this.$route.params.slug}`)
                })
                .catch(error => console.log('error', error))
        },
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