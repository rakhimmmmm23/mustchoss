<template>
    <main>
        <div class="container">
            <section class="news-section-main">
                <h2>Новости</h2>
                <div class="news-items-cont">
                    <template v-for="newsItem in openNews" :key="newsItem._id">
                        <a v-if="newsItem.status === 'active'" class="news-item"
                            :href="`/${newsItem.estabInfo.slug}/news/${newsItem._id}`">
                            <div class="news-item-img-cont">
                                <img v-if="newsItem.banner[0]?.path" :src="imgLinkHandler(newsItem)" alt="Новость" />
                            </div>
                            <h4>{{ newsItem.estabInfo.name }}</h4>
                            <span>{{ formattedDate(newsItem.date) }}</span>
                            <p>Подробнее <svg class="vector" width="5" height="8" viewBox="0 0 5 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.0107422 6.67167L2.68241 4L0.0107422 1.3225L0.833242 0.5L4.33324 4L0.833242 7.5L0.0107422 6.67167Z"
                                        fill="black" />
                                </svg></p>
                        </a>
                    </template>
                </div>
                <button v-if="openNews.length < news.length" @click="addNews" class="btn-all-news">Показать еще</button>
            </section>
        </div>
    </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import moment from 'moment';

export default {
    data() {
        return {
            establishments: [],
            openNews: [],
            count: 1,
            news: [],
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
        const cache = {};
        if (!this.$route.params.slug) {
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/news?filter={city:"${this.$route.params.city}"}`, requestOptions)
                .then(response => response.json())
                .then(result2 => {
                    if (result2.length > 0) {
                        const processCustomNews = async () => {
                            for (let i = 0; i < result2.length; i++) {
                                const itemNews = result2[i];
                                if (cache[itemNews.establishmentID]) {
                                    itemNews.estabInfo = cache[itemNews.establishmentID]
                                    this.news = [...this.news, itemNews]
                                } else {
                                    const response = await fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/musatos/archive?filter={_id:"${itemNews.establishmentID}"}`, requestOptions)
                                    const result = await response.json()
                                    this.establishments = [...this.establishments, ...result]
                                    itemNews.estabInfo = result[0]
                                    cache[itemNews.establishmentID] = result[0]
                                    this.news = [...this.news, itemNews]
                                }
                            }
                            this.openNews = this.news.slice(0, 20)
                        };
                        processCustomNews();
                    }
                }).catch((er) => console.error(er))
        } else {
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/musatos/archive?filter={slug:"${this.$route.params.slug}"}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.establishments = result
                    result = result[0]
                    fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/news?filter={establishmentID:"${result.id}"}`, requestOptions)
                        .then(response => response.json())
                        .then(result2 => {
                            if (result2.length > 0) {
                                result2.forEach(itemNews => itemNews.estabInfo = result)
                                this.news = [...this.news, ...result2]
                            }
                            this.openNews = this.news.slice(0, 20)
                        })
                }).catch((er) => console.error(er))
        }
    },
    methods: {
        formattedDate(date) {
            return moment(date).format('DD.MM.YYYY');
        },
        imgLinkHandler(news) {
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + news.banner[0]?.path
        },
        addNews() {
            this.count += 1
            this.openNews = [...this.openNews, ...this.news.slice((this.count - 1) * 20, this.count * 20)]
        }
    }
}
</script>