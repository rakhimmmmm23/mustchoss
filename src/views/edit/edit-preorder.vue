<template>
    <h2 class="edit_letter-title">Предзаказ</h2>
    <template v-for="key in Object.keys(resulOrders)" :key="resulOrders[key][0]['_id']+'keys'">


        <div class="was-preorder-section div-content-vstk">
            <h4 class="title-preorder-time">{{ formatDate(key) }}</h4>
            <template v-for="order in resulOrders[key]" :key="order.id">
                <div v-if="order.status === 'active' && !order.delivery" class="was-preorder-item-cont">
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
                                <p>Сумма: <span>{{ countOrder(order.selectedDishes) }} тг</span></p>
                                <p>Депозит: <span>0 тг</span></p>
                            </div>
                        </div>
                        <div class="preorder-item-main">
                            <div><span class="preorder-item-main-title">Время</span>
                                <p class="preorder-item-main-text">19:00</p>
                            </div>
                            <div><span class="preorder-item-main-title">Количество персон</span>
                                <p class="preorder-item-main-text">2</p>
                            </div>
                            <div><span class="preorder-item-main-title">Список</span>
                                <ul class="preorder-item-main-text">
                                    <li v-for="dish in order.selectedDishes" :key="dish.id">{{ dish.name }}</li>
                                </ul>
                            </div>
                            <div><span class="preorder-item-main-title">Цена</span>
                                <ul class="preorder-item-main-text">
                                    <li v-for="dish in order.selectedDishes" :key="dish.id">{{ dish.price }} тг</li>
                                </ul>
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
                <div v-else-if="!order.delivery" class="was-preorder-item-cont  was-preorder-item-cont-disabled">
                    <span class="preoder-time">{{ formatTime(order.date) }}</span>

                    <div class="was-preorder-item-info" @click="wasLetterClickHandler($event)">
                        <div class="was-preorder-item-info-header">
                            <div class="preorder-profile">
                                <div class="preoder-img-cont">
                                    <img v-if="order?.userObj?.avatar?.path?.length > 0" :src="imgLinkHandler(order)"
                                        alt="photo">
                                    <img v-else :src="/static/img / preoder - photo.png" alt="photo">
                                </div>
                                <h4>{{ order.userObj.name }}</h4>
                            </div>
                            <p class="preorder-text-disabled">
                                Предзаказ отменен
                            </p>
                        </div>
                        <div class="preorder-item-main">
                            <p>Причина отмены</p>
                            <p>{{ order.message ? order.message : '' }}
                            </p>
                        </div>
                    </div>
                    <button @click="returnOrder(order)">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="#242424" stroke="#242424" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.7574 11.7574C12.8826 10.6321 14.4087 10 16 10C17.5913 10 19.1174 10.6321 20.2426 11.7574C21.3679 12.8826 22 14.4087 22 16C22 17.5913 21.3679 19.1174 20.2426 20.2426C19.1174 21.3679 17.5913 22 16 22C14.3333 22 12.8467 21.3333 11.76 20.24L12.7067 19.2933C13.5467 20.14 14.7133 20.6667 16 20.6667C17.2377 20.6667 18.4247 20.175 19.2998 19.2998C20.175 18.4247 20.6667 17.2377 20.6667 16C20.6667 14.7623 20.175 13.5753 19.2998 12.7002C18.4247 11.825 17.2377 11.3333 16 11.3333C14.7623 11.3333 13.5753 11.825 12.7002 12.7002C11.825 13.5753 11.3333 14.7623 11.3333 16H13.3333L10.64 18.6867L8 16H10C10 14.4087 10.6321 12.8826 11.7574 11.7574Z"
                                fill="white" />
                        </svg>

                    </button>
                </div>
            </template>
        </div>
    </template>
    <div class="popup_confirm-delete-order popup-edit-vstk-estb">
        <div class="popup_confirm-delete-order-cont popup-edit-vstk-estb-cont">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h5 class="text-center">Система предзаказа</h5>
            <p class="text-center">Вы действительно хотите отменить этот
                предзаказ?</p>
            <div class="edittel-btn-group">
                <button @click="delConfirmYesHan" class="edittel-btn-group-first">Да</button>
                <button @click="delConfirmNoHan" class="edittel-btn-group-second">Нет</button>
            </div>
        </div>
    </div>
    <div class="popup-delete-order popup-edit-vstk-estb">
        <div class="popup-delete-order-cont">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h5>
                Причина отмены
            </h5>
            <textarea placeholder="Описание отмены предзаказа" v-model="delItem.message"></textarea>
            <button @click="delOredPopupGo" class="confirm-del-oredder-btn">Подтвердить</button>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/ru';

export default {
    data() {
        return {
            resulOrders: {},
            orders: [],
            delItem: {
                message: ''
            }
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/order?filter={establishmentID:"' + this.$route.params.id + '",delivery:false}', requestOptions)
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
        delConfirmNoHan() {
            document.querySelector('.active').classList.remove('active')
            document.body.classList.remove('lock')
        },
        delConfirmYesHan() {
            document.querySelector('.active').classList.remove('active')
            document.querySelector('.popup-delete-order').classList.add('active')
        },
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

        returnOrder(order) {
            order.status = 'active'
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
        deleteOrder(order) {
            this.delItem = order
            document.querySelector('.popup_confirm-delete-order').classList.add('active')
            document.body.classList.add('lock')
        },
        delOredPopupGo() {
            let order = this.delItem
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
            this.delConfirmNoHan()
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
            e.currentTarget.classList.toggle("was-preorder-item-info-toggle");
        },
    }
}
</script>