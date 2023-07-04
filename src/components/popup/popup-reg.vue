<template>
    <!-- Выбор -->
    <div class="popup ani popup__choice">
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z" fill="#242424"/>
            </svg>
        </button>

        <div class="reg_step active">
            <h4>Тип регистрации</h4>

            <button type="button" class="regChoiceType" data-type="user">
                <span class="regChoiceType__txt">
                    <h6>Клиент</h6>
                    <p class="ani">Где можно покушать в алматы.</p>
                </span>

                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.334 21.8757L17.377 15.8327L11.334 9.77643L13.1944 7.91602L21.1111 15.8327L13.1944 23.7493L11.334 21.8757Z" fill="#242424"/>
                </svg>
            </button>

            <button type="button" class="regChoiceType" data-type="seller">
                <span class="regChoiceType__txt">
                    <h6>Заведение</h6>
                    <p class="ani">Где можно покушать в алматы.</p>
                </span>
                
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.334 21.8757L17.377 15.8327L11.334 9.77643L13.1944 7.91602L21.1111 15.8327L13.1944 23.7493L11.334 21.8757Z" fill="#242424"/>
                </svg>
            </button>
        </div>
    </div>

    <!-- Клиент -->
    <div class="popup ani popup__reguser">
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z" fill="#242424"/>
            </svg>
        </button>

        <form @submit.prevent="handleReg" class="registration">

            <div class="reg_step active">
                <h4>Имя фамилия</h4>

                <label class="form__input form__row" :class="{filled: isFilled(userData.name)}">
                    <input type="text" name="name" v-model="userData.name" required>
                    <span class="label">Имя</span>
                </label>

                <label class="form__input form__row" :class="{filled: isFilled(userData.surname)}">
                    <input type="text" name="surname" v-model="userData.surname">
                    <span class="label">Фамилия</span>
                </label>

                <button type="button" class="form__row js-nextRegStep" :disabled="isDisabled(userData.name)">Далее</button>

                <ul class="stepProgress">
                    <li class="active"></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div class="reg_step">
                <h4>Контактная информация</h4>

                <label class="form__input form__row" :class="{filled: isFilled(userData.phone)}">
                    <input type="tel" name="phone" v-model="userData.phone" v-maska data-maska="+7 (###)-###-##-##" required placeholder="+7 (___)-___-__-__">
                    <span class="label">Телефон</span>
                </label>

                <label class="form__input form__row" :class="{filled: isFilled(userData.email)}">
                    <input type="email" name="email" v-model="userData.email">
                    <span class="label">Email</span>
                </label>

                <button type="button" class="form__row js-nextRegStep" :disabled="isDisabled(userData.phone)">Далее</button>

                <ul class="stepProgress">
                    <li></li>
                    <li class="active"></li>
                    <li></li>
                </ul>
            </div>

            <div class="reg_step">
                <h4>Придумайте пароль</h4>

                <label class="form__input form__row" :class="{filled: isFilled(userData.pwd)}">
                    <input type="password" name="pwd" class="checkPWD" v-model="userData.pwd" required>
                    <span class="label">Пароль</span>

                    <div class="inputExtraOptions">
                        <button type="button" class="pwdView">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9C11.25 9.59674 11.0129 10.169 10.591 10.591C10.169 11.0129 9.59674 11.25 9 11.25C8.40326 11.25 7.83097 11.0129 7.40901 10.591C6.98705 10.169 6.75 9.59674 6.75 9C6.75 8.40326 6.98705 7.83097 7.40901 7.40901C7.83097 6.98705 8.40326 6.75 9 6.75ZM9 3.375C12.75 3.375 15.9525 5.7075 17.25 9C15.9525 12.2925 12.75 14.625 9 14.625C5.25 14.625 2.0475 12.2925 0.75 9C2.0475 5.7075 5.25 3.375 9 3.375ZM2.385 9C3.6225 11.52 6.18 13.125 9 13.125C11.82 13.125 14.3775 11.52 15.615 9C14.3775 6.48 11.82 4.875 9 4.875C6.18 4.875 3.6225 6.48 2.385 9Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                </label>

                <label class="form__input form__row" :class="{filled: isFilled(userData.pwd2), error: pwdMatch(userData)}" error="Пароли не совпадают">
                    <input type="password" name="pwd2" class="checkPWD" v-model="userData.pwd2" required>
                    <span class="label">Повторить пароль</span>

                    <div class="inputExtraOptions">
                        <button type="button" class="pwdView">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9C11.25 9.59674 11.0129 10.169 10.591 10.591C10.169 11.0129 9.59674 11.25 9 11.25C8.40326 11.25 7.83097 11.0129 7.40901 10.591C6.98705 10.169 6.75 9.59674 6.75 9C6.75 8.40326 6.98705 7.83097 7.40901 7.40901C7.83097 6.98705 8.40326 6.75 9 6.75ZM9 3.375C12.75 3.375 15.9525 5.7075 17.25 9C15.9525 12.2925 12.75 14.625 9 14.625C5.25 14.625 2.0475 12.2925 0.75 9C2.0475 5.7075 5.25 3.375 9 3.375ZM2.385 9C3.6225 11.52 6.18 13.125 9 13.125C11.82 13.125 14.3775 11.52 15.615 9C14.3775 6.48 11.82 4.875 9 4.875C6.18 4.875 3.6225 6.48 2.385 9Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                </label>

                <button type="submit" class="form__row" :disabled="checkPassword(userData)">Регистрация</button>
                <input type="hidden" name="type" v-model="userData.type">

                <ul class="stepProgress">
                    <li></li>
                    <li></li>
                    <li class="active"></li>
                </ul>
            </div>
        </form>
    </div>

    <!-- Заведение -->
    <div class="popup ani popup__regseller">
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z" fill="#242424"/>
            </svg>
        </button>

        <form @submit.prevent="handleRegSeller" class="registration">

            <div class="reg_step active">
                <h4>Регистрация заведения</h4>

                <label class="form__input form__row" :class="{filled: isFilled(sellerData.name)}">
                    <input type="text" name="name" v-model="sellerData.name" required>
                    <span class="label">Название заведения</span>
                </label>

                <label class="form__input form__row" :class="{filled: isFilled(sellerData.phone)}">
                    <input type="tel" name="phone" v-model="sellerData.phone" v-maska data-maska="+7 (###)-###-##-##" required placeholder="+7 (___)-___-__-__">
                    <span class="label">Телефон</span>
                </label>

                <button type="button" class="form__row js-nextRegStep" :disabled="isDisabled([sellerData.name,sellerData.phone])">Далее</button>

                <ul class="stepProgress">
                    <li class="active"></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div class="reg_step">
                <h4>Придумайте пароль</h4>

                <label class="form__input form__row" :class="{filled: isFilled(sellerData.pwd)}">
                    <input type="password" name="pwd" class="checkPWD" v-model="sellerData.pwd" required>
                    <span class="label">Пароль</span>

                    <div class="inputExtraOptions">
                        <button type="button" class="pwdView">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9C11.25 9.59674 11.0129 10.169 10.591 10.591C10.169 11.0129 9.59674 11.25 9 11.25C8.40326 11.25 7.83097 11.0129 7.40901 10.591C6.98705 10.169 6.75 9.59674 6.75 9C6.75 8.40326 6.98705 7.83097 7.40901 7.40901C7.83097 6.98705 8.40326 6.75 9 6.75ZM9 3.375C12.75 3.375 15.9525 5.7075 17.25 9C15.9525 12.2925 12.75 14.625 9 14.625C5.25 14.625 2.0475 12.2925 0.75 9C2.0475 5.7075 5.25 3.375 9 3.375ZM2.385 9C3.6225 11.52 6.18 13.125 9 13.125C11.82 13.125 14.3775 11.52 15.615 9C14.3775 6.48 11.82 4.875 9 4.875C6.18 4.875 3.6225 6.48 2.385 9Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                </label>

                <label class="form__input form__row" :class="{filled: isFilled(sellerData.pwd2), error: pwdMatch(sellerData)}" error="Пароли не совпадают">
                    <input type="password" name="pwd2" class="checkPWD" v-model="sellerData.pwd2" required>
                    <span class="label">Повторить пароль</span>

                    <div class="inputExtraOptions">
                        <button type="button" class="pwdView">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9C11.25 9.59674 11.0129 10.169 10.591 10.591C10.169 11.0129 9.59674 11.25 9 11.25C8.40326 11.25 7.83097 11.0129 7.40901 10.591C6.98705 10.169 6.75 9.59674 6.75 9C6.75 8.40326 6.98705 7.83097 7.40901 7.40901C7.83097 6.98705 8.40326 6.75 9 6.75ZM9 3.375C12.75 3.375 15.9525 5.7075 17.25 9C15.9525 12.2925 12.75 14.625 9 14.625C5.25 14.625 2.0475 12.2925 0.75 9C2.0475 5.7075 5.25 3.375 9 3.375ZM2.385 9C3.6225 11.52 6.18 13.125 9 13.125C11.82 13.125 14.3775 11.52 15.615 9C14.3775 6.48 11.82 4.875 9 4.875C6.18 4.875 3.6225 6.48 2.385 9Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                </label>

                <button type="button" class="form__row js-nextRegStep" :disabled="checkPassword(sellerData)">Далее</button>

                <ul class="stepProgress">
                    <li></li>
                    <li class="active"></li>
                    <li></li>
                </ul>
            </div>

            <div class="reg_step">
                <h4>Реквизиты заведения</h4>

                <label class="form__input form__row" :class="{filled: isFilled(sellerData.name__too)}">
                    <input type="text" name="nameToo" v-model="sellerData.name__too" required>
                    <span class="label">Название ТОО</span>
                </label>

                <label class="form__input form__row" :class="{filled: isFilled(sellerData.u__adress)}">
                    <input type="text" name="adressUr" v-model="sellerData.u__adress" required>
                    <span class="label">Юридический адрес</span>
                </label>

                <label class="form__input form__row" :class="{filled: isFilled(sellerData.bik)}">
                    <input type="text" name="bik" v-model="sellerData.bik" required>
                    <span class="label">БИК</span>
                </label>

                <label class="form__input form__row" :class="{filled: isFilled(sellerData.bin)}">
                    <input type="text" name="bin" v-model="sellerData.bin" v-maska data-maska="############" required>
                    <span class="label">БИН</span>
                </label>

                <label class="form__input form__row" :class="{filled: isFilled(sellerData.iik)}">
                    <input type="text" name="iik" v-model="sellerData.iik" required>
                    <span class="label">ИИК</span>
                </label>

                <label class="form__input form__row" :class="{filled: isFilled(sellerData.kbe)}">
                    <input type="text" name="kbe" v-model="sellerData.kbe" required>
                    <span class="label">КБе</span>
                </label>

                <button type="submit" class="form__row" :disabled="isDisabled([sellerData.name__too,sellerData.u__adress,sellerData.bik,sellerData.bin,sellerData.iik,sellerData.kbe])">Создать</button>
                <input type="hidden" name="type" v-model="sellerData.type">

                <ul class="stepProgress">
                    <li></li>
                    <li></li>
                    <li class="active"></li>
                </ul>
            </div>
        </form>
    </div>
</template>

<script>
import { vMaska } from "maska"
import { isEmpty, isFilled, isDisabled, checkPassword, pwdMatch } from '@/helpers/helper.js'
import popup from '@/helpers/popup.js'
export default {
    directives: { maska: vMaska },
    data() {
        return {
            userData: {
                name: null,
                surname: null,
                phone: null,
                email: null,
                pwd: null,
                pwd2: null,
                type: 'user'
            },
            sellerData: {
                phone: null,
                name: null,
                pwd: null,
                pwd2: null,
                name__too: null,
                u__adress: null,
                bik: null,
                bin: null,
                iik: null,
                kbe: null,
                type: 'seller'
            }
        }
    },
    methods: {
        handleReg() {
            let name = this.userData.name,
                surname = this.userData.surname,
                phone = this.userData.phone,
                email = this.userData.email,
                pwd = this.userData.pwd,
                type = this.userData.type

            let reg = {
                phone: phone,
                pwd: pwd,
                status: 'active',
                role: type
            }

            if(!isEmpty(name)){
                reg['name'] = name
            }
            if(!isEmpty(surname)){
                reg['surname'] = surname
            }
            if(!isEmpty(email)){
                reg['email'] = email
            }
            let raw = JSON.stringify({
                "data": reg
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
            
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/reg', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('result', result)
                if (result.status === 'error') {
                    popup(result)
                }else{
                    let user = {
                        login: this.userData.phone,
                        pwd: this.userData.pwd
                    }
                    this.$store.dispatch('auth/login', user).then(result => {
                        console.log(result.status)
                        if (result.status === 'success') {
                            document.body.classList.remove('lock')
                            this.$router.push('/kabinet')
                        }
                    })
                }
            })
            .catch(error => console.log('error', error))
        },
        handleRegSeller() {
            let phone = this.sellerData.phone,
                name = this.sellerData.name,
                pwd = this.sellerData.pwd,
                name__too = this.sellerData.name__too,
                u__adress = this.sellerData.u__adress,
                bik = this.sellerData.bik,
                bin = this.sellerData.bin,
                iik = this.sellerData.iik,
                kbe = this.sellerData.kbe,
                type = this.sellerData.type

            let reg = {
                phone: phone,
                pwd: pwd,
                status: 'active',
                role: type
            }

            if(!isEmpty(name)){
                reg['name'] = name
            }
            if(!isEmpty(name__too)){
                reg['name__too'] = name__too
            }
            if(!isEmpty(u__adress)){
                reg['u__adress'] = u__adress
            }
            if(!isEmpty(bik)){
                reg['bik'] = bik
            }
            if(!isEmpty(u__adress)){
                reg['bin'] = bin
            }
            if(!isEmpty(u__adress)){
                reg['iik'] = iik
            }
            if(!isEmpty(kbe)){
                reg['kbe'] = kbe
            }
            let raw = JSON.stringify({
                "data": reg
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

            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/reg', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('result', result)
                if (result.status === 'error') {
                    popup(result)
                }else{
                    let user = {
                        login: this.sellerData.phone,
                        pwd: this.sellerData.pwd
                    }
                    this.$store.dispatch('auth/login', user).then(result => {
                        if (result.status === 'success') {
                            document.body.classList.remove('lock')
                            this.$router.push('/kabinet')
                        }
                    })
                }
            })
            .catch(error => console.log('error', error))
        },
        isEmpty,
        isFilled,
        isDisabled,
        checkPassword,
        pwdMatch
    }
}
</script>