<template>
    <div class="popup-form-mail">
        <div class="popup-form-mail-cont">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h4>Написать на почту</h4>
            <form ref="mailFormP" @submit.prevent="formHandler">
                <input required class="popup-form-inputs" placeholder="Имя" name="name" v-model="formData.name" />
                <input required class="popup-form-inputs" placeholder="Почта" name="email" v-model="formData.email" />
                <textarea required class="popup-form-inputs" placeholder="Сообщение" name="message"
                    v-model="formData.message"></textarea>
                <p v-if="error" class="form-email_error">Ошибка, некорректно указана почта</p>
                <button type="submit" class="popup-form-mail-btn-sub">Отправить</button>
            </form>
            <div class="popup-email_success">
                <div class="popup-email_success-cont">
                    <h5>Готово!</h5>
                    <p>Сообщение отправлено</p>
                    <button @click="secondHandler" class="popup-email_success-cont-btn">
                        Хорошо
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                name: '',
                email: '',
                message: ''
            },
            error: false
        }
    },
    methods: {
        formHandler() {
            if (!this.validateEmail(this.formData.email)) {
                this.error = true
                return
            }
            const update={
                name:this.formData.name,
                email:this.formData.email,
                message:this.formData.message,
            }
            let raw = JSON.stringify({
                "data": update
            })
            let requestOptions = {
                method: 'POST',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN
                },
                body: raw,
                redirect: 'follow'
            }
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'mail.php', requestOptions)
            this.$refs.mailFormP.reset();
            document.querySelector('.popup-email_success').classList.add('sec-mail-form-active')
            this.error = false
        },
        validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },
        secondHandler() {
            document.querySelector('.popup-email_success').classList.remove('sec-mail-form-active')
            document.querySelector('.lock').classList.remove('lock')
            document.querySelector('.active').classList.remove('active')
        }
    }
}
</script>