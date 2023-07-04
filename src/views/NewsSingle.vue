<template>
    <main>
        <div class="container">
            <div class="custom-breadcrumbs">
                <a class="custom-breadcrumbs-item" href="/">Главная</a>|
                <a class="custom-breadcrumbs-item" :href="'/' + establishments.city + '/news'">Новости</a>|
                <p class="custom-breadcrumbs-item">{{ news.title ? news.title : 'Новостной заголовок' }}</p>
            </div>
            <section class="news-single-section">
                <div class="news-single-img-cont">
                    <img v-if="Array.isArray(news.banner) && news.banner?.length > 0 && news?.banner[0]?.path"
                        :src="imgLinkHandler(news)" alt="Новость" />
                </div>
                <div class="news-single-text-cont-main">
                    <h4>{{ news.title }}</h4>
                    <div class="news-single-mini-info">
                        <p>Заведение:<span>{{ establishments.name }}</span></p>
                        <p>Адрес:<span>{{ establishments.adress }}</span></p>
                    </div>
                    <p class="news-single-text-info">
                        {{ news.text }}
                    </p>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import { useHead } from '@vueuse/head'

export default {
    data() {
        return {
            establishments: {},
            news: {}
        }
    },
    setup() {
        useHead({
            link: [{
                rel: 'stylesheet',
                href: '/static/css/promo.css'
            }],

        })
    },
    created() {
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/news/${this.$route.params.slug}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (!this.$store.state.auth?.user || this.$store.state.auth.user === null || !this.$store.state.auth.user.role || (result.status !== 'active' && this.$store.state.auth?.user &&
                    this.$store.state.auth.user.role === 'seller' && this.$store.state.auth.user.id != result.userID)) {
                    this.$router.push('/404');
                } else {
                    this.news = result;
                }
            })
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/single?filter={slug:"' + this.$route.params.city + '"}', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.establishments = result
            })

    },
    methods: {
        imgLinkHandler(news) {
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + news.banner[0]?.path
        },
    }
}
</script>