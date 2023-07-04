<template>
    <h2 class="edit_settings-title">Настройки</h2>
    <div class="edit_settings-container">
        <div class="main-settings">
            <div class="settings_password">
                <h5>Безопасность</h5>
                <span class="tit-set-span">Пароль</span>
                <div class="pswd-hid-set">
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <button type="button" @click="editPswdHandler">Сменить пароль</button>
            </div>
            <div class="settings_number">
                <h5>Контакты</h5>
                <span class="tit-set-span">Новый телефон</span>
                <div class="set-number-mask">{{userEstb.phone}}</div>
                <button @click="openPopupEditTel">Сменить телефон</button>
            </div>
        </div>
        <div class="settings-status">
            <h5>Статус</h5>
            <div class="status-sett-select">
                <div v-if="statusPage === 1" @click="statusSelectHandler()">
                    <span class="status-active"></span>
                    <p>Активно</p>
                </div>
                <div v-if="statusPage === 1" @click="editStatusHandler(0)" class="status-select-hidden-handler">
                    <span class="status-noactive"></span>
                    <p>Неактивно</p>
                </div>
                <div v-if="statusPage === 0" @click="statusSelectHandler()">
                    <span class="status-noactive"></span>
                    <p>Неактивно</p>
                </div>
                <div v-if="statusPage === 0" @click="editStatusHandler(1)" class="status-select-hidden-handler">
                    <span class="status-active"></span>
                    <p>Активно</p>
                </div>
            </div>
        </div>
    </div>
    <div class="popup_edit-password popup-edit-vstk-estb">
        <div class="popup_edit-password-cont popup-edit-vstk-estb-cont">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h5>Смена пароля</h5>
            <p>После создания аккаунта вы сможете продолжить</p>
            <form @submit.prevent="handleReg">
                <label class="form__input form__row" :class="{ filled: isFilled(userData.currentpwd) }">
                    <input type="password" name="pwd" class="checkPWD" v-model="userData.currentpwd" required>
                    <span class="label">Старый пароль</span>

                    <div class="inputExtraOptions">
                        <button type="button" class="pwdView">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9C11.25 9.59674 11.0129 10.169 10.591 10.591C10.169 11.0129 9.59674 11.25 9 11.25C8.40326 11.25 7.83097 11.0129 7.40901 10.591C6.98705 10.169 6.75 9.59674 6.75 9C6.75 8.40326 6.98705 7.83097 7.40901 7.40901C7.83097 6.98705 8.40326 6.75 9 6.75ZM9 3.375C12.75 3.375 15.9525 5.7075 17.25 9C15.9525 12.2925 12.75 14.625 9 14.625C5.25 14.625 2.0475 12.2925 0.75 9C2.0475 5.7075 5.25 3.375 9 3.375ZM2.385 9C3.6225 11.52 6.18 13.125 9 13.125C11.82 13.125 14.3775 11.52 15.615 9C14.3775 6.48 11.82 4.875 9 4.875C6.18 4.875 3.6225 6.48 2.385 9Z"
                                    fill="black" />
                            </svg>
                        </button>
                    </div>
                </label>
                <label class="form__input form__row" :class="{ filled: isFilled(userData.pwd) }">
                    <input type="password" name="pwd" class="checkPWD" v-model="userData.pwd" required>
                    <span class="label">Новый пароль</span>

                    <div class="inputExtraOptions">
                        <button type="submit" class="pwdView">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9C11.25 9.59674 11.0129 10.169 10.591 10.591C10.169 11.0129 9.59674 11.25 9 11.25C8.40326 11.25 7.83097 11.0129 7.40901 10.591C6.98705 10.169 6.75 9.59674 6.75 9C6.75 8.40326 6.98705 7.83097 7.40901 7.40901C7.83097 6.98705 8.40326 6.75 9 6.75ZM9 3.375C12.75 3.375 15.9525 5.7075 17.25 9C15.9525 12.2925 12.75 14.625 9 14.625C5.25 14.625 2.0475 12.2925 0.75 9C2.0475 5.7075 5.25 3.375 9 3.375ZM2.385 9C3.6225 11.52 6.18 13.125 9 13.125C11.82 13.125 14.3775 11.52 15.615 9C14.3775 6.48 11.82 4.875 9 4.875C6.18 4.875 3.6225 6.48 2.385 9Z"
                                    fill="black" />
                            </svg>
                        </button>
                    </div>
                </label>

                <label class="form__input form__row" :class="{ filled: isFilled(userData.pwd2), error: pwdMatch(userData) }"
                    error="Пароли не совпадают">
                    <input type="password" name="pwd2" class="checkPWD" v-model="userData.pwd2" required>
                    <span class="label">Повторить пароль</span>

                    <div class="inputExtraOptions">
                        <button type="button" class="pwdView">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9C11.25 9.59674 11.0129 10.169 10.591 10.591C10.169 11.0129 9.59674 11.25 9 11.25C8.40326 11.25 7.83097 11.0129 7.40901 10.591C6.98705 10.169 6.75 9.59674 6.75 9C6.75 8.40326 6.98705 7.83097 7.40901 7.40901C7.83097 6.98705 8.40326 6.75 9 6.75ZM9 3.375C12.75 3.375 15.9525 5.7075 17.25 9C15.9525 12.2925 12.75 14.625 9 14.625C5.25 14.625 2.0475 12.2925 0.75 9C2.0475 5.7075 5.25 3.375 9 3.375ZM2.385 9C3.6225 11.52 6.18 13.125 9 13.125C11.82 13.125 14.3775 11.52 15.615 9C14.3775 6.48 11.82 4.875 9 4.875C6.18 4.875 3.6225 6.48 2.385 9Z"
                                    fill="black" />
                            </svg>
                        </button>
                    </div>
                </label>
                <button type="submit" class="form__row" :disabled="checkPassword(userData)">Сохранить пароль</button>
            </form>
        </div>
    </div>
    <div class="popup_edit-telnumber-warning popup-edit-vstk-estb">
        <div class="popup_edit-telnumber-warning-cont popup-edit-vstk-estb-cont">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h5 class="text-center">Сменить телефон</h5>
            <p class="text-center">Вы действительно хотите сменить номер телефона?</p>
            <div class="edittel-btn-group">
                <button @click="telnumberWarningYesHan" class="edittel-btn-group-first">Да</button>
                <button @click="telnumberWarningNoHan" class="edittel-btn-group-second">Нет</button>
            </div>
        </div>
    </div>
    <div class="popup_edit-telnumber popup-edit-vstk-estb">
        <div class="popup_edit-telnumber-cont popup-edit-vstk-estb-cont">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h5>Новый телефон</h5>
            <p>введите новый телефон, после вам нужно будет подтвердить его</p>
            <form @submit.prevent="handleEditNum">
                <label class="form__input form__row" :class="{ filled: isFilled(userData.phone) }">
                    <input type="tel" name="phone" v-model="userData.phone" v-maska data-maska="+7 (###)-###-##-##" required
                        placeholder="+7 (___)-___-__-__">
                    <span class="label">Телефон</span>
                </label>
                <button type="submit" class="form__row js-nextRegStep" :disabled="isDisabled(userData.phone)">Далее</button>
            </form>
        </div>
    </div>
    <div class="popup_edit-telnumber-success popup-edit-vstk-estb">
        <div class="popup_edit-telnumber-success-cont popup-edit-vstk-estb-cont text-center">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h5 class="text-center">Готово!</h5>
            <p class="text-center">Вы успешно сменили номер телефона</p>
            <div class="edittel-btn-group-suc">
                <button @click="telnumberWarningNoHan" class="edittel-btn-group-first">Хорошо</button>
            </div>
        </div>
    </div>
    <div class="popup_edit-telnumber-error popup-edit-vstk-estb">
        <div class="popup_edit-telnumber-error-cont popup-edit-vstk-estb-cont text-center">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <div class="error-svg-div">
                <svg class="window-close" width="36" height="36" viewBox="0 0 36 36" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.1285 17.9993L28.2077 26.0785V28.2077H26.0785L17.9993 20.1285L9.92018 28.2077H7.79102V26.0785L15.8702 17.9993L7.79102 9.92018V7.79102H9.92018L17.9993 15.8702L26.0785 7.79102H28.2077V9.92018L20.1285 17.9993Z"
                        fill="white" />
                </svg>
            </div>
            <h5 class="text-center">Ошибка</h5>
            <p class="text-center">В данный момент невозможно совершить действие. Попробуйте позже.</p>
        </div>
    </div>
</template>

<script>
import { isFilled, checkPassword, pwdMatch, isDisabled } from '@/helpers/helper.js'
import { vMaska } from "maska"

export default {
    directives: { maska: vMaska },
    data() {
        return {
            statusPage: 1,
            establishments: {},
            userData: {
                currentpwd: null,
                pwd: null,
                pwd2: null,
                phone: ''
            },
            userEstb: {}
        }
    },
    beforeMount() {
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/establishments?filter={_id:"' + this.$route.params.id + '"}', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.establishments = result
                this.statusPage = result._state
                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/users?filter={_id:"' + result.userID + '"}', requestOptions)
                    .then(response => response.json())
                    .then(result2 => {
                        this.userEstb = result2
                    })
            })
    },
    methods: {
        openPopupEditTel() {
            document.querySelector('.popup_edit-telnumber-warning').classList.add('active')
            document.body.classList.add('lock')
        },
        telnumberWarningNoHan() {
            document.querySelector('.active').classList.remove('active')
            document.body.classList.remove('lock')
        },
        telnumberWarningYesHan() {
            document.querySelector('.active').classList.remove('active')
            document.querySelector('.popup_edit-telnumber').classList.add('active')
        },
        editPswdHandler() {
            document.querySelector('.popup_edit-password').classList.add('active')
            document.body.classList.add('lock')
        },
        handleEditNum(e) {
            e.preventDefault()
            this.userEstb.phone = this.userData.phone
            let raw = JSON.stringify({
                "data": this.userEstb
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/users', requestOptions)
                .then(response => response.json())
                .then(() => {
                    document.querySelector('.active').classList.remove('active')
                    document.querySelector('.popup_edit-telnumber-success').classList.add('active')
                }).catch(e => {
                    console.error(e)
                    document.querySelector('.active').classList.remove('active')
                    document.querySelector('.popup_edit-telnumber-error').classList.add('active')
                })
        },
        handleReg(e) {
            e.preventDefault()
            this.userEstb.pwd = this.userData.pwd
            let raw = JSON.stringify({
                "data": this.userEstb
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/users', requestOptions)
                .then(response => response.json())
                .then(() => {
                    document.querySelector('.popup_edit-password').classList.remove('active')
                    document.body.classList.remove('lock')
                }).catch(e => console.error(e))
        },
        isFilled,
        checkPassword,
        pwdMatch,
        isDisabled,
        editStatusHandler(status) {
            this.statusPage = status
            let update = {
                _id: this.establishments._id,
                _state: status
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/establishments', requestOptions)
                .then(response => response.json())
                .then(() => {
                    console.log('Успешно')
                }).catch(e => console.error(e))
        },
        statusSelectHandler() {
            document.querySelector(".status-select-hidden-handler").classList.toggle("status-select-set-active")
        }
    }
}
</script>