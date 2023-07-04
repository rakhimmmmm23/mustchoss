<template>
    <!-- 23 августа 2022 г. -->
    <h2 class="edit_letter-title">Резервы</h2>
    <template v-for="key in Object.keys(resulReserves)" :key="resulReserves[key][0]['_id']+'keys'">
        <div class="was-preorder-section div-content-vstk">
            <h4 class="title-preorder-time">{{ formatDate(key) }}</h4>
            <template v-for="reserv in resulReserves[key]" :key="reserv['_id']">
                <div v-if="reserv.status === 'active'" class="was-preorder-item-cont reserves-item-cont">
                    <span class="preoder-time">{{ reserv.time }}</span>
                    <button @click="editReserveHandler(reserv)" class="edit_btn-reserves"><svg width="16" height="16"
                            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.8067 4.69305C14.0667 4.43305 14.0667 3.99971 13.8067 3.75305L12.2467 2.19305C12 1.93305 11.5667 1.93305 11.3067 2.19305L10.08 3.41305L12.58 5.91305M2 11.4997V13.9997H4.5L11.8733 6.61971L9.37333 4.11971L2 11.4997Z"
                                fill="#BDBDBD" />
                        </svg>
                    </button>
                    <div class="was-preorder-item-info">
                        <div class="was-preorder-item-info-header">
                            <div class="preorder-profile">
                                <div class="preoder-img-cont">
                                    <img v-if="reserv?.userObj?.avatar?.path?.length > 0" :src="imgLinkHandler(reserv)"
                                        alt="photo">
                                </div>
                                <h4>{{ reserv.userObj.name }}</h4>
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
                    <span class="preoder-time">{{ reserv.time }}</span>
                    <button @click="editReserveHandler(reserv)" class="edit_btn-reserves"><svg width="16" height="16"
                            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.8067 4.69305C14.0667 4.43305 14.0667 3.99971 13.8067 3.75305L12.2467 2.19305C12 1.93305 11.5667 1.93305 11.3067 2.19305L10.08 3.41305L12.58 5.91305M2 11.4997V13.9997H4.5L11.8733 6.61971L9.37333 4.11971L2 11.4997Z"
                                fill="#BDBDBD" />
                        </svg>
                    </button>
                    <div class="was-preorder-item-info">
                        <div class="was-preorder-item-info-header">
                            <div class="preorder-profile">
                                <div class="preoder-img-cont">
                                    <img v-if="reserv?.userObj?.avatar?.path?.length > 0" :src="imgLinkHandler(reserv)"
                                        alt="photo">
                                </div>
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
    </template>
    <div class="popup-edit-reserve">
        <div class="popup-edit-reserve-container">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h4>Изменить дату и время</h4>
            <div class="popup-edit-reserve-inputs">
                <label class="popup-edit-reserve-date form__input form__phone" :class="{ filled: isFilled(editDate) }">
                    <input type="text" name="estbSlug" v-maska data-maska="##-##-####" v-model="editDate">
                    <span class="label">Дата</span>
                </label>
                <label class="popup-edit-reserve-time form__input form__phone" :class="{ filled: isFilled(editTime) }">
                    <input type="text" name="estbSlug" v-maska data-maska="##:##" v-model="editTime">
                    <span class="label">Время</span>
                </label>
            </div>
            <button @click="saveEditReserveHandler" class="btn-save-edit-reserv">Сохранить</button>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/ru';
import { isFilled } from '@/helpers/helper.js'
import { vMaska } from "maska"

export default {
    directives: { maska: vMaska },
    data() {
        return {
            reserves: [],
            resulReserves: {},
            editDate: '',
            editTime: '',
            reservForEdit: {}
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/booking?filter={establishmentID:"' + this.$route.params.id + '"}', requestOptions)
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
                    this.reserves = results;
                    this.resulReserves = results.reduce((acc, curr) => {
                        const date = curr.date.slice(0, 10);
                        if (acc[date]) {
                            acc[date].push(curr);
                        } else {
                            acc[date] = [curr];
                        }
                        return acc;
                    }, {});
                    Object.values(this.resulReserves).forEach(arr =>
                        arr.sort((a, b) => new Date(a.date) - new Date(b.date))
                    );
                    this.resulReserves = Object.keys(this.resulReserves)
                        .sort((a, b) => new Date(a) - new Date(b))
                        .reduce((obj, key) => {
                            obj[key] = this.resulReserves[key];
                            return obj;
                        }, {});
                });
            });
    },
    methods: {
        saveEditReserveHandler() {
            const editTime = this.editTime
            const editDate = this.editDate

            if (this.editTime.length === 5) {
                this.reservForEdit.time = editTime
            }
            if (editDate.length === 10) {
                const dataFormated = moment.utc(editDate, 'DD-MM-YYYY').local();
                this.reservForEdit.date = dataFormated.toISOString()
                console.log(dataFormated.toISOString())
            }
            let raw = JSON.stringify({
                "data": this.reservForEdit
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/booking?_id=' + this.reservForEdit._id, requestOptions)
                .then(() => {
                   this.$router.go(0)
                })
                .catch(error => console.log('error', error))
        },
        editReserveHandler(reserv) {
            this.reservForEdit = reserv
            document.querySelector('.popup-edit-reserve').classList.add('active')
            document.body.classList.add('lock')
        },
        isFilled,
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
        imgLinkHandler(reserve) {
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + reserve.userObj.avatar.path
        },
        formatDate(value) {
            return moment(value).format('D MMMM YYYY [г.]');
        },
    }
}
</script>   