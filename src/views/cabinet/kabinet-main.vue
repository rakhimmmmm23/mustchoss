<template>
    <main>
        <div class="container">
            <div class="row">
                <breadcrumbs current='Личный кабинет' />
            </div>

            <div class="row">
                <cabinetHeader />
            </div>

            <div class="row">
                <form method="post" class="kabinetEdit__form" @submit.prevent="handleSave">
                    <div class="kabinetEdit">
                        <div class="kabinetEdit__personalization">
                            <h5>Персонализация</h5>

                            <div class="inputEdit">
                                <span class="input ani">
                                    {{ currentUser.name }}
                                </span>
                                <span class="label ani">Имя</span>
                                <input type="text" name="name" class="ani" v-model="user.name">
                            </div>

                            <div class="inputEdit">
                                <span class="input ani">
                                    {{ currentUser.surname }}
                                </span>
                                <span class="label ani">Фамилия</span>
                                <input type="text" name="surname" class="ani" v-model="user.surname">
                            </div>

                            <div class="inputEdit">
                                <span class="input ani">
                                    {{ currentUser.email }}
                                </span>
                                <span class="label ani">Email</span>
                                <input type="email" name="email" class="ani" v-model="user.email">
                            </div>

                            <div class="lk-phone-user">

                                <span class="label ani">Телефон</span>
                                <div @click="openPopupEditTel" class="lk-phone-user-cont">
                                    <p>{{ userEstb.phone }}</p>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.8067 4.69305C14.0667 4.43305 14.0667 3.99971 13.8067 3.75305L12.2467 2.19305C12 1.93305 11.5667 1.93305 11.3067 2.19305L10.08 3.41305L12.58 5.91305M2 11.4997V13.9997H4.5L11.8733 6.61971L9.37333 4.11971L2 11.4997Z"
                                            fill="#BDBDBD" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="kabinetEdit__nameDisplay">
                            <h5>Отображение имени</h5>

                            <label class="form__checkbox" v-if="currentUser.surname != null">
                                <input type="radio" name="name_screen" :value="currentUser.surname + ' ' + currentUser.name"
                                    v-model="user.name_screen">
                                <span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.24994 11.9107L1.62744 8.2882L3.27827 6.63737L5.24994 8.61487L11.0133 2.8457L12.6641 4.49654L5.24994 11.9107Z"
                                            fill="white" />
                                    </svg>
                                </span>
                                {{ currentUser.surname }} {{ currentUser.name }}
                            </label>

                            <label class="form__checkbox">
                                <input type="radio" name="name_screen" :value="currentUser.name" v-model="user.name_screen">
                                <span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.24994 11.9107L1.62744 8.2882L3.27827 6.63737L5.24994 8.61487L11.0133 2.8457L12.6641 4.49654L5.24994 11.9107Z"
                                            fill="white" />
                                    </svg>
                                </span>
                                {{ currentUser.name }}
                            </label>
                        </div>

                        <div class="kabinetEdit__sex">
                            <h5>Пол</h5>

                            <label class="form__checkbox">
                                <input type="radio" name="sex" value="male" v-model="user.sex">
                                <span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.24994 11.9107L1.62744 8.2882L3.27827 6.63737L5.24994 8.61487L11.0133 2.8457L12.6641 4.49654L5.24994 11.9107Z"
                                            fill="white" />
                                    </svg>
                                </span>
                                Мужской
                            </label>

                            <label class="form__checkbox">
                                <input type="radio" name="sex" value="female" v-model="user.sex">
                                <span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.24994 11.9107L1.62744 8.2882L3.27827 6.63737L5.24994 8.61487L11.0133 2.8457L12.6641 4.49654L5.24994 11.9107Z"
                                            fill="white" />
                                    </svg>
                                </span>
                                Женский
                            </label>
                        </div>
                        <div class="llk-birthday kabinetEdit__birthday">
                            <h5>День рождения</h5>

                            <div class="inputEdit ">

                                <span class="input ani">
                                    {{ user.birthday ? user.birthday : '' }}
                                </span>
                                <span class="label ani">День</span>
                                <input type="text" name="birthday" class="ani" v-maska data-maska="##-##-####"
                                    v-model="user.birthday">
                            </div>

                        </div>

                        <div class="kabinetEdit__safety">
                            <h5>Безопасность</h5>
                            <div @click="editPswdHandler" class="kabinetEdit-pswd">
                                <p>Сменить пароль</p>
                                <div class="pswd-hid-set">
                                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="novoeSubmit" style="display: none;">Сохранить</button>
                </form>
            </div>
        </div>
        <div class="popup_edit-password popup-edit-vstk-estb">
            <div class="popup_edit-password-cont popup-edit-vstk-estb-cont">
                <button type="button" class="popup__close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="ani">
                        <path
                            d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                            fill="#242424" />
                    </svg>
                </button>
                <h5>Смена пароля</h5>
                <p>После создания аккаунта вы сможете продолжить</p>
                <form @submit.prevent="handleReg">
                    <label class="form__input form__row" :class="{ filled: isFilled(userData.currentpwd) }">
                        <input type="password" name="pwd" autocomplete="current-password" class="checkPWD"
                            v-model="userData.currentpwd" required>
                        <span class="label">Старый пароль</span>

                        <div class="inputExtraOptions">
                            <button type="button" class="pwdView">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9C11.25 9.59674 11.0129 10.169 10.591 10.591C10.169 11.0129 9.59674 11.25 9 11.25C8.40326 11.25 7.83097 11.0129 7.40901 10.591C6.98705 10.169 6.75 9.59674 6.75 9C6.75 8.40326 6.98705 7.83097 7.40901 7.40901C7.83097 6.98705 8.40326 6.75 9 6.75ZM9 3.375C12.75 3.375 15.9525 5.7075 17.25 9C15.9525 12.2925 12.75 14.625 9 14.625C5.25 14.625 2.0475 12.2925 0.75 9C2.0475 5.7075 5.25 3.375 9 3.375ZM2.385 9C3.6225 11.52 6.18 13.125 9 13.125C11.82 13.125 14.3775 11.52 15.615 9C14.3775 6.48 11.82 4.875 9 4.875C6.18 4.875 3.6225 6.48 2.385 9Z"
                                        fill="black" />
                                </svg>
                            </button>
                        </div>
                    </label>
                    <label class="form__input form__row" :class="{ filled: isFilled(userData.pwd) }">
                        <input type="password" autocomplete="new-password" name="pwd" class="checkPWD"
                            v-model="userData.pwd" required>
                        <span class="label">Новый пароль</span>

                        <div class="inputExtraOptions">
                            <button type="submit" class="pwdView">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9C11.25 9.59674 11.0129 10.169 10.591 10.591C10.169 11.0129 9.59674 11.25 9 11.25C8.40326 11.25 7.83097 11.0129 7.40901 10.591C6.98705 10.169 6.75 9.59674 6.75 9C6.75 8.40326 6.98705 7.83097 7.40901 7.40901C7.83097 6.98705 8.40326 6.75 9 6.75ZM9 3.375C12.75 3.375 15.9525 5.7075 17.25 9C15.9525 12.2925 12.75 14.625 9 14.625C5.25 14.625 2.0475 12.2925 0.75 9C2.0475 5.7075 5.25 3.375 9 3.375ZM2.385 9C3.6225 11.52 6.18 13.125 9 13.125C11.82 13.125 14.3775 11.52 15.615 9C14.3775 6.48 11.82 4.875 9 4.875C6.18 4.875 3.6225 6.48 2.385 9Z"
                                        fill="black" />
                                </svg>
                            </button>
                        </div>
                    </label>

                    <label class="form__input form__row"
                        :class="{ filled: isFilled(userData.pwd2), error: pwdMatch(userData) }" error="Пароли не совпадают">
                        <input type="password" autocomplete="off" name="pwd2" class="checkPWD" v-model="userData.pwd2"
                            required>
                        <span class="label">Повторить пароль</span>

                        <div class="inputExtraOptions">
                            <button type="button" class="pwdView">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="ani">
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="ani">
                        <path
                            d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                            fill="#242424" />
                    </svg>
                </button>
                <h5>Новый телефон</h5>
                <p>введите новый телефон, после вам нужно будет подтвердить его</p>
                <form @submit.prevent="handleEditNum">
                    <label class="form__input form__row" :class="{ filled: isFilled(userData.phone) }">
                        <input type="tel" name="phone" v-model="userData.phone" v-maska data-maska="+7 (###)-###-##-##"
                            required placeholder="+7 (___)-___-__-__">
                        <span class="label">Телефон</span>
                    </label>
                    <button type="submit" class="form__row js-nextRegStep"
                        :disabled="isDisabled(userData.phone)">Далее</button>
                </form>
            </div>
        </div>
        <div class="popup_edit-telnumber-success popup-edit-vstk-estb">
            <div class="popup_edit-telnumber-success-cont popup-edit-vstk-estb-cont text-center">
                <button type="button" class="popup__close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="ani">
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="ani">
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
    </main>
</template>
  
<script>
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import cabinetHeader from '@/components/cabinet/cabinet-header.vue'
import { isEmpty, isFilled, checkPassword, pwdMatch, isDisabled } from '@/helpers/helper.js'
import notify from '@/helpers/notify.js'
import { vMaska } from "maska"
import moment from 'moment'

export default {
    directives: { maska: vMaska },
    components: {
        breadcrumbs,
        cabinetHeader
    },
    data() {
        return {
            user: {
                name: null,
                surname: null,
                email: null,
                phone: null,
                name_screen: null,
                sex: null,
                birthday: null
            },
            userData: {
                currentpwd: null,
                pwd: null,
                pwd2: null,
                phone: ''
            },
            userEstb: {}
        }
    },
    setup() {
        useHead({
            title: 'Личный кабинет',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/kabinet.css'
            }],
            script: [
                {
                    src: '/static/js/cabinet.js',
                    tagPosition: 'bodyClose',
                    async: true
                }
            ],
        })
    },
    beforeMount() {
        // document.title = this.title
        this.user.name = this.currentUser.name
        this.user.surname = this.currentUser.surname
        this.user.email = this.currentUser.email
        this.user.phone = this.currentUser.phone
        this.user.name_screen = this.currentUser.name_screen
        this.user.sex = this.currentUser.sex


        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/users?filter={_id:"' + this.currentUser.id + '"}', requestOptions)
            .then(response => response.json())
            .then(result2 => {
                this.userEstb = result2
                if (result2.birthday)
                    this.user.birthday = this.formattedDate(result2.birthday)
            })
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
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
        formattedDate(date) {
            return moment(date).format('DD-MM-YYYY');
        },
        handleSave() {
            let name = this.user.name,
                surname = this.user.surname,
                // phone = this.user.phone,
                email = this.user.email,
                name_screen = this.user.name_screen,
                sex = this.user.sex

            let update = {
                _id: this.currentUser.id
            }

            update['name'] = name
            update['email'] = email
            update['surname'] = surname
            // update['phone'] = phone
            update['name_screen'] = name_screen
            update['sex'] = sex

            if (this.user.birthday) {
                let birthday = moment(this.user.birthday, 'DD-MM-YYYY').valueOf();
                update['birthday'] = birthday
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

            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/users', requestOptions)
                .then(response => response.json())
                .then(result => {
                    let notifypData = {}
                    if (!isEmpty(result._id)) {
                        notifypData = {
                            "status": "success",
                            "title": 'Сохранено'
                        }
                        let oldData = JSON.parse(localStorage.getItem('user'))

                        if (!isEmpty(this.user.name)) {
                            oldData.name = this.user.name
                        }
                        if (!isEmpty(this.user.surname)) {
                            oldData.surname = this.user.surname
                        }
                        // if(!isEmpty(this.user.phone)){
                        //     oldData.phone = this.user.phone
                        // }
                        if (!isEmpty(this.user.email)) {
                            oldData.email = this.user.email
                        }
                        if (!isEmpty(this.user.name_screen)) {
                            oldData.name_screen = this.user.name_screen
                        }
                        if (!isEmpty(this.user.sex)) {
                            oldData.sex = this.user.sex
                        }
                        localStorage.setItem('user', JSON.stringify(oldData))
                    } else {
                        notifypData = {
                            "status": "error",
                            "title": 'Ошибка!'
                        }
                    }
                    notify(notifypData)
                })
                .catch(error => console.log('error', error))
        },
        isEmpty,
        isFilled, checkPassword, pwdMatch, isDisabled
    }
}
</script>