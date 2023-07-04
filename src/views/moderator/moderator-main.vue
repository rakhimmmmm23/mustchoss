<template>
    <main>
        <div class="container">
            <div class="row">
                <breadcrumbs current='Модератор' />
            </div>

            <div class="row">
                <moderatorHeader />
            </div>

            <div class="row">
                <div class="moderator__filter"></div>
            </div>

            <div class="row">
                <div class="allEstablishments">
                    <article v-for="item in moderation" :key="item.slug">
                        <div class="info">
                            <div class="top">
                                <h3>{{ item.name }}</h3>
                                <div class="type">
                                    Тип:
                                    <span>{{ item.type.name }}</span>
                                </div>
                                <div class="status">
                                    Статус:
                                    <span v-if="item.state === 0" class="inactive">
                                        На модерации
                                    </span>
                                    <span v-if="item.state === 1" class="active">
                                        Активно
                                    </span>
                                    <span v-if="item.state === -1">
                                        В архиве
                                    </span>
                                </div>
                            </div>

                            <div class="tags">
                                <span>Класс: А</span>
                                <span>Контент менеджер</span>
                                <span>Акции</span>
                                <span>Размещение в TOP</span>
                            </div>


                        </div>

                        <button class="more" @click="routerSingleMod(item.slug)">
                            Подробнее
                        </button>

                        <router-link :to="'/edit/' + item.id" class="edit">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.2583 5.86484C17.5833 5.53984 17.5833 4.99818 17.2583 4.68984L15.3083 2.73984C15 2.41484 14.4583 2.41484 14.1333 2.73984L12.6 4.26484L15.725 7.38984M2.5 14.3732V17.4982H5.625L14.8417 8.27318L11.7167 5.14818L2.5 14.3732Z"
                                    fill="white" />
                            </svg>
                        </router-link>
                    </article>
                </div>
            </div>
        </div>
    </main>
</template>
  
<script>
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import moderatorHeader from '@/components/moderator/moderator-header.vue'
export default {
    components: {
        breadcrumbs,
        moderatorHeader
    },
    data() {
        return {
            moderation: []
        }
    },
    setup() {
        useHead({
            title: 'Модератор',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/moderator.css'
            }],
        })
    },
    computed: {
        haveAccess() {
            let user = this.$store.state.auth.user
            if (user.role === 'admin') {
                return true
            } else {
                return false
            }
        },
    },
    mounted() {
        if (!this.haveAccess) {
            this.$router.push('/404');
        }
    },
    methods: {
        routerSingleMod(slug) {
            let requestOptions = {
                method: 'GET',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/musatos/single?filter={slug:"${slug}"}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.$router.push(`/${result.city}/${slug}`);
                })
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/moderation', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.moderation = result
            })
    }
}
</script>