<template>
    <main>
        <div class="container container__new">
            <div class="row">
                <breadcrumbs v-if="this.$store.state.auth.user.role === 'admin'&& currentTitle" prev="Модератор|moderator"
                :current="currentTitle" />
                <breadcrumbs v-else-if="currentTitle" prev="Бизнес|biznes" :current="currentTitle" />
            </div>

            <div class="row">
                <div class="edit__header">
                    <h1>{{ title }}</h1>
                    <!-- <router-link v-if="this.$store.state.auth.user.role === 'admin'" to="/moderator/new" class="btnHeader">
                        Добавить страницу
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.91081 14.24V10.944H6.58281V9.792H9.91081V6.496H11.0948V9.792H14.4228V10.944H11.0948V14.24H9.91081Z"
                                fill="#242424" />
                            <circle cx="10.5" cy="10.5" r="10" stroke="black" />
                        </svg>
                    </router-link> -->
                    <router-link v-if="this.$store.state.auth.user.role === 'seller'" to="/biznes/novoe" class="btnHeader">
                        Добавить страницу
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.91081 14.24V10.944H6.58281V9.792H9.91081V6.496H11.0948V9.792H14.4228V10.944H11.0948V14.24H9.91081Z"
                                fill="#242424" />
                            <circle cx="10.5" cy="10.5" r="10" stroke="black" />
                        </svg>
                    </router-link>
                    <div class="edit-est-admin-broadcast" v-if="this.$store.state.auth.user.role === 'admin'">
                        <p>Передать аккаунт владельцу</p>
                        <router-link to="#" class="connectTariffs">
                        Передать
                    </router-link>
                    </div>
                  
                    <router-link v-if="this.$store.state.auth.user.role === 'seller'" :to="'/rates/'+this.$route.params.id" class="connectTariffs">
                        Подключить тарифы
                    </router-link>
                </div>
            </div>

            <div class="row">
                <aside class="nav">
                    <router-link :to="'/edit/' + id">
                        Сводка
                    </router-link>

                    <router-link :to="'/edit/' + id + '/menu'">
                        Меню
                    </router-link>

                    <router-link :to="'/edit/' + id + '/reviews'">
                        Отзывы
                    </router-link>

                    <router-link :to="'/edit/' + id + '/promo'">
                        Акции
                    </router-link>
                    <router-link :to="'/edit/' + id + '/news'">
                        Новости
                    </router-link>
                    <router-link :to="'/edit/' + id + '/reserves'">
                        Резервы
                    </router-link>

                    <router-link :to="'/edit/' + id + '/delivery'">
                        Доставка
                    </router-link>

                    <router-link :to="'/edit/' + id + '/preorder'">
                        Предзаказ
                    </router-link>

                    <router-link :to="'/edit/' + id + '/newsletter'">
                        Рассылка
                    </router-link>

                    <router-link :to="'/edit/' + id + '/edit'">
                        Редактирование страницы
                    </router-link>

                    <router-link :to="'/edit/' + id + '/settings'">
                        Настройки
                    </router-link>
                </aside>

                <section class="content">
                    <router-view></router-view>
                </section>
            </div>
        </div>
    </main>
</template>
  
<script>
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
export default {
    components: {
        breadcrumbs
    },
    data() {
        return {
            title: null,
            institution: [],
            id: null,
            userID: null,
            currentTitle: null
        }
    },
    methods: {
        setCurrentTitle (newPath){
            if (newPath.name === 'edit_settings') {
                this.currentTitle = 'Настройки';
            } else if (newPath.name === 'edit_edit') {
                this.currentTitle = 'Редактирование страницы';
            } else if (newPath.name === 'edit_newsletter') {
                this.currentTitle = 'Рассылка';
            } else if (newPath.name === 'edit_preorder') {
                this.currentTitle = 'Предзаказ';
            } else if (newPath.name === 'edit_delivery') {
                this.currentTitle = 'Доставка';
            } else if (newPath.name === 'edit_reserves') {
                this.currentTitle = 'Резервы';
            } else if (newPath.name === 'edit_promo') {
                this.currentTitle = 'Акции';
            } else if (newPath.name === 'edit_reviews') {
                this.currentTitle = 'Отзывы';
            } else if (newPath.name === 'edit_menu') {
                this.currentTitle = 'Меню';
            } else {
                this.currentTitle = 'Сводка';
            }
        }
    },
    watch: {
        '$route': function (newPath) {
            this.setCurrentTitle(newPath)
        }
    },
    setup() {
        useHead({
            link: [
                {
                    rel: 'stylesheet',
                    href: '/static/css/edit.css'
                },
                {
                    rel: 'stylesheet',
                    href: '/static/css/businessNew.css'
                }
            ],
            script: [
                {
                    src: '/static/js/edit.js'
                }
            ],
        })
    },
    computed: {
        currentUser() {
            let user = this.$store.state.auth.user
            if (user.role === 'admin' || user.role === 'seller') {
                return true
            } else {
                return false
            }
        }
    },
    mounted() {
        this.setCurrentTitle(this.$route)
        if (!this.currentUser) {
            this.$router.push('/404')
        }
        // if (this.$store.state.auth.user.role === 'seller' && this.$store.state.auth.user.id != this.userID) {
        //     this.$router.push('/404')
        // }
        this.id = this.$route.params.id
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/establishments/' + this.$route.params.id, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.institution = result
                this.title = this.institution.name
                this.userID = this.institution.userID
                document.title = this.title

                // console.log('id', this.$store.state.auth.user.id)
                // console.log('userID', result.userID)
                if (this.$store.state.auth.user.role === 'seller' && this.$store.state.auth.user.id != result.userID) {
                    this.$router.push('/404')
                }
            })
    }
}
</script>