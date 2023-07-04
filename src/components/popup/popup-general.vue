<template>
    <popupLogin v-if="!loggedIn" />
    <popupReg v-if="!loggedIn" />

    <div class="popup ani popupNotifi popup__alert">
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z" fill="#242424"/>
            </svg>
        </button>

        <h4></h4>
        <p></p>

        <button type="button" class="js-popupClose">Хорошо</button>
    </div>


    <div class="popupBG"></div>
</template>

<script>
import popupLogin from '@/components/popup/popup-login.vue'
import popupReg from '@/components/popup/popup-reg.vue'
export default {
    components: {
        popupLogin,
        popupReg
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        }
    }
}
</script>