<template>
    <main>
        <div class="container">
            <div class="row">
                <breadcrumbs current='Мои резервы' />
            </div>

            <div class="row">
                <cabinetHeader />
            </div>

            <div class="kabinet-rezerve-serction">
                <template v-for="reserv in rezervy" :key="reserv['_id']">
                    <div v-if="reserv.status === 'active'" class="was-preorder-item-cont reserves-item-cont">
                        <span class="lk-rezerv-date">{{ formatDate(reserv.date) + ' г.' }}</span>
                        <span class="preoder-time">{{ reserv.time }}</span>
                        <div class="was-preorder-item-info">
                            <div class="was-preorder-item-info-header">
                                <div class="preorder-profile">
                                    <h4>{{ reserv.estbObj.name }}</h4>
                                </div>
                                <div class="preoder-sum">
                                    <p>Перcона(ы): <span>{{ reserv.persons }}</span></p>
                                    <p>Сумма: <span>0</span></p>
                                    <p>Стол №: <span>1</span></p>
                                </div>
                            </div>
                        </div>
                        <button @click="deleteReserve(reserv)">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white" stroke="#242424" />
                                <path
                                    d="M14.0013 10V10.6667H10.668V12H11.3346V20.6667C11.3346 21.0203 11.4751 21.3594 11.7252 21.6095C11.9752 21.8595 12.3143 22 12.668 22H19.3346C19.6883 22 20.0274 21.8595 20.2774 21.6095C20.5275 21.3594 20.668 21.0203 20.668 20.6667V12H21.3346V10.6667H18.0013V10H14.0013ZM12.668 12H19.3346V20.6667H12.668V12ZM14.0013 13.3333V19.3333H15.3346V13.3333H14.0013ZM16.668 13.3333V19.3333H18.0013V13.3333H16.668Z"
                                    fill="black" />
                            </svg>
                        </button>
                    </div>
                    <div v-else class="was-preorder-item-cont was-preorder-item-cont-disabled reserves-item-cont">
                        <span class="lk-rezerv-date">{{ formatDate(reserv.date) + ' г.' }}</span>
                        <span class="preoder-time">{{ reserv.time }}</span>
                        <div class="was-preorder-item-info">
                            <div class="was-preorder-item-info-header">
                                <div class="preorder-profile">
                                    <h4>Резерв отменен</h4>
                                </div>
                                <div class="preoder-sum">
                                    <p>Перcона(ы): <span>{{ reserv.persons }}</span></p>
                                    <p>Сумма: <span>0</span></p>
                                    <p>Стол №: <span>1</span></p>
                                </div>
                            </div>
                        </div>
                        <button @click="returnReserve(reserv)">
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
        </div>
    </main>
</template>
  
<script>
import moment from 'moment';
import 'moment/locale/ru';
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import cabinetHeader from '@/components/cabinet/cabinet-header.vue'

export default {
    components: {
        breadcrumbs,
        cabinetHeader
    },
    data() {
        return {
            rezervy: []
        }
    },
    setup() {
        useHead({
            title: 'Мои резервы',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/kabinet.css'
            },
            {
                rel: 'stylesheet',
                href: '/static/css/edit.css'
            }],
        })
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/booking?filter={userID:"' + this.currentUser.id + '"}', requestOptions)
            .then(response => response.json())
            .then(result => {
                const promises = result.map(itemRes => {
                    return fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/archive?filter={_id:"' + itemRes.establishmentID + '"}', requestOptions)
                        .then(response => response.json())
                        .then(result2 => {
                            itemRes.estbObj = result2[0];
                            return itemRes;
                        })
                        .catch(error => console.error(error))

                });
                Promise.all(promises).then(results => {
                    this.rezervy = results;
                });
            });
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD MM YYYY');
        },
        returnReserve(reserve) {
            reserve.status = 'active'
            let raw = JSON.stringify({
                "data": reserve
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/booking?_id=' + reserve._id, requestOptions)
                .catch(error => console.log('error', error))
        },
        deleteReserve(reserve) {
            reserve.status = 'disabled'
            let raw = JSON.stringify({
                "data": reserve
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/booking?_id=' + reserve._id, requestOptions)
                .catch(error => console.log('error', error))
        },
    }
}
</script>