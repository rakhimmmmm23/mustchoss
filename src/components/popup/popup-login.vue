<template>
    <!-- авторизация -->
    <div class="popup ani popup__login">
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z" fill="#242424"/>
            </svg>
        </button>

        <h4>Авторизация</h4>

        <form @submit.prevent="handleLogin" class="login">
            <label class="form__input form__row" :class="{filled: isFilled(tel)}">
                <input type="tel" name="login" v-model="tel" v-maska data-maska="+7 (###)-###-##-##" required placeholder="+7 (___)-___-__-__">
                <span class="label">Телефон</span>
            </label>

            <label class="form__input form__row" :class="{filled: isFilled(pwd)}">
                <input type="password" name="pwd" v-model="pwd" required>
                <span class="label">Пароль</span>
            </label>

            <button type="submit" class="form__row">Войти</button>
        </form>

        <button type="button" class="popup__reg js-reg">Регистрация</button>
    </div>
</template>

<script>
import { vMaska } from "maska"
import { isFilled } from '@/helpers/helper.js'
export default {
    directives: { maska: vMaska },
    data() {
        return {
            loading: false,
            message: '',
            tel: null,
            pwd: null
        }
    },
    methods: {
        handleLogin(e) {
            // user.preventDefault()
            this.loading = true
            // let tel
            // if((this.tel === '') || (this.tel === 'undefined')){
            //     tel = e.target.login.value
            // }else{
            //     tel = this.tel
            // }
            let user = {
                login: e.target.login.value,
                pwd: this.pwd
            }
            this.$store.dispatch('auth/login', user).then(result => {
                console.log(result.status)
                if (result.status === 'success') {
                    window.location.reload()
                }
            })
        },
        isFilled
    }
}
</script>