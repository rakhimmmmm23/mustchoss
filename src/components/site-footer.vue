<template>
    <footer>
        <div class="footer__nav">
            <div class="container">
                <div class="footer__navBlock footer__navBlock-institution">
                    <h5>Заведения</h5>
                    <div class="footer__navBlock-link">
                        <router-link v-for="item in footerTypes" :key="item.slug" :to="'/'+item.slug">{{ item.name }}</router-link>

                        <a href="#" class="tmp"></a>
                        <a href="#" class="tmp"></a>
                    </div>
                </div>

                <div class="footer__navBlock footer__navBlock-extra">
                    <h5>Заведения</h5>
                    <div class="footer__navBlock-link">
                        <a href="#">Условия эксплуатации</a>

                        <a href="#">Политика конфиденциальности</a>

                        <a href="#">Официальное уведомление</a>
                    </div>
                </div>

                <div class="footer__navBlock footer__navBlock-nav">
                    <h5>Навигация</h5>
                    <div class="footer__navBlock-link">
                        <router-link to="/">Главная</router-link>

                        <a href="#">Избранное</a>

                        <a href="#">Карта</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer__copy">
            <div class="container">© {{ new Date().getFullYear() }} “Musatos” Все права защищены.</div>
        </div>
    </footer>
</template>

<script>
export default {
    data () {
        return {
            footerTypes: []
        }
    },
    beforeMount () {
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/institutionType', requestOptions)
        .then(response => response.json())
        .then(result => {
            this.footerTypes = result
        })
    }
}
</script>