<template>
    <h2 class="edit_letter-title">Доставка</h2>
    <template v-for="key in Object.keys(resulOrders)" :key="resulOrders[key][0]['_id']+'keys'">
        <div class="was-preorder-section div-content-vstk">
            <h4 class="title-preorder-time">{{ formatDate(key) }}</h4>
            <template v-for="order in resulOrders[key]" :key="order.id">
                <div v-if="order.status === 'active'" class="was-preorder-item-cont delivery-item-cont">
                    <span class="preoder-time">{{ formatTime(order.date) }}</span>
                    <div class="was-preorder-item-info" @click="wasLetterClickHandler($event)">
                        <div class="was-preorder-item-info-header">
                            <div class="preorder-profile">
                                <div class="preoder-img-cont">
                                    <img v-if="order?.userObj?.avatar?.path?.length > 0" :src="imgLinkHandler(order)"
                                        alt="photo">
                                </div>
                                <h4>{{ order.userObj.name }}</h4>
                            </div>
                            <div class="preoder-sum">
                                <p>Адрес: <span>Доставка по адресу</span></p>
                                <div><span class="preorder-item-main-title">Список</span>
                                    <ul class="preorder-item-main-text">
                                        <li v-for="dish in order.selectedDishes" :key="dish.id">{{ dish.name }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="preoder-sum">
                                <p>Сумма: <span>{{ countOrder(order.selectedDishes) }} тг</span></p>
                                <div><span class="preorder-item-main-title">Цена</span>
                                    <ul class="preorder-item-main-text">
                                        <li v-for="dish in order.selectedDishes" :key="dish.id">{{ dish.price }} тг</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button @click="deleteOrder(order)">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white" stroke="#242424" />
                            <path
                                d="M14.0013 10V10.6667H10.668V12H11.3346V20.6667C11.3346 21.0203 11.4751 21.3594 11.7252 21.6095C11.9752 21.8595 12.3143 22 12.668 22H19.3346C19.6883 22 20.0274 21.8595 20.2774 21.6095C20.5275 21.3594 20.668 21.0203 20.668 20.6667V12H21.3346V10.6667H18.0013V10H14.0013ZM12.668 12H19.3346V20.6667H12.668V12ZM14.0013 13.3333V19.3333H15.3346V13.3333H14.0013ZM16.668 13.3333V19.3333H18.0013V13.3333H16.668Z"
                                fill="black" />
                        </svg>
                    </button>
                </div>
            </template>
        </div>
    </template>
</template>

<script>
import moment from 'moment';
import 'moment/locale/ru';

export default {
    data() {
        return {
            resulOrders: {},
            orders: []
        }
    },
    mounted() {
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/order?filter={establishmentID:"' + this.$route.params.id + '",delivery:true}', requestOptions)
            .then(response => response.json())
            .then(result => {
                const promises = result.map(itemRes => {
                    return fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/users/' + itemRes.userID, requestOptions)
                        .then(response => response.json())
                        .then(result2 => {
                            itemRes.userObj = result2;
                            return itemRes;
                        })
                        .catch(error => console.error(error))

                });

                Promise.all(promises).then(results => {
                    this.orders = results;
                    this.resulOrders = this.groupObjectsByDate(results);

                    for (let date in this.resulOrders) {
                        this.resulOrders[date] = this.sortObjectsByDate(this.resulOrders[date]);
                    }

                });
            });
    },
    methods: {
        groupObjectsByDate(objects) {
            let result = {};
            objects.forEach(obj => {
                let date = moment(obj.date).format('DD.MM.YYYY');
                if (!result[date]) {
                    result[date] = [];
                }
                result[date].push(obj);
            });
            return result;
        },
        sortObjectsByDate(objects) {
            return objects.sort((a, b) => moment(a.date).diff(moment(b.date)));
        },
        deleteOrder(order) {
            order.status = 'disabled'
            let raw = JSON.stringify({
                "data": order
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/order?_id=' + order._id, requestOptions)
                .catch(error => console.log('error', error))
        },
        imgLinkHandler(order) {
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + order.userObj.avatar.path
        },
        countOrder(orderDishes) {
            return orderDishes.reduce((accumulator, currentValue) => {
                return accumulator + parseInt(currentValue.edit.price);
            }, 0);
        },
        formatTime(value) {
            return moment(value).format('HH:mm');
        },
        formatDate(value) {
            return moment(value, 'DD.MM.YYYY').format('D MMMM YYYY [г.]');
        },
        wasLetterClickHandler(e) {
            e.currentTarget.classList.toggle("delivery-item-info-toggle");
        },
    }
}
</script>