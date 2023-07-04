<template>
    <main>
        <div class="container">
            <div class="row">
                <breadcrumbs current='Меню Доставка Предзаказ' />
            </div>

            <div class="row">
                <div class="menu__header">
                    <h1>{{ title }}</h1>

                    <router-link v-if="costCart !== null"
                        :to="'/' + this.$route.params.cat_city + '/' + this.$route.params.slug + '/menyu/basket'"
                        class="menuBasket">
                        <span class="menuBasket__label">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.3332 12.0007C11.6868 12.0007 12.0259 12.1411 12.276 12.3912C12.526 12.6412 12.6665 12.9804 12.6665 13.334C12.6665 13.6876 12.526 14.0267 12.276 14.2768C12.0259 14.5268 11.6868 14.6673 11.3332 14.6673C10.5932 14.6673 9.99984 14.0673 9.99984 13.334C9.99984 12.594 10.5932 12.0007 11.3332 12.0007ZM0.666504 1.33398H2.8465L3.47317 2.66732H13.3332C13.51 2.66732 13.6796 2.73756 13.8046 2.86258C13.9296 2.9876 13.9998 3.15717 13.9998 3.33398C13.9998 3.44732 13.9665 3.56065 13.9198 3.66732L11.5332 7.98065C11.3065 8.38732 10.8665 8.66732 10.3665 8.66732H5.39984L4.79984 9.75398L4.77984 9.83398C4.77984 9.87819 4.7974 9.92058 4.82865 9.95183C4.85991 9.98309 4.9023 10.0007 4.9465 10.0007H12.6665V11.334H4.6665C3.9265 11.334 3.33317 10.734 3.33317 10.0007C3.33317 9.76732 3.39317 9.54732 3.49317 9.36065L4.39984 7.72732L1.99984 2.66732H0.666504V1.33398ZM4.6665 12.0007C5.02013 12.0007 5.35926 12.1411 5.60931 12.3912C5.85936 12.6412 5.99984 12.9804 5.99984 13.334C5.99984 13.6876 5.85936 14.0267 5.60931 14.2768C5.35926 14.5268 5.02013 14.6673 4.6665 14.6673C3.9265 14.6673 3.33317 14.0673 3.33317 13.334C3.33317 12.594 3.9265 12.0007 4.6665 12.0007ZM10.6665 7.33398L12.5198 4.00065H4.09317L5.6665 7.33398H10.6665Z"
                                    fill="white" />
                            </svg>
                            Корзина:
                        </span>
                        <span class="menuBasket__value">{{ costCart }}</span>
                    </router-link>
                </div>
            </div>

            <div class="row">
                <aside class="menuNav">
                    <router-link
                        :to="'/' + this.$route.params.cat_city + '/' + this.$route.params.slug + '/menyu'">Все</router-link>
                    <router-link v-for="link in menu" :key="link.id"
                        :to="'/' + this.$route.params.cat_city + '/' + this.$route.params.slug + '/menyu/' + link.slug">{{
                            link.name }}</router-link>
                </aside>

                <section class="menuContent">
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
            title: 'Меню / Доставка / Предзаказ',
            menu: [],
            costCart: null
        }
    },
    setup() {
        useHead({
            title: 'Меню / Доставка / Предзаказ',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/menu.css'
            }],
        })
    },
    computed: {
        cartCost() {
            return this.$store.state.utils.costCart;
        }
    },
    watch: {
        'cartCost': function (newValue) {
            const tmpCostCart = localStorage.getItem(`cost-${this.$route.params.slug}`);
            if (tmpCostCart == newValue)
                this.costCart = newValue
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/single?filter={slug:"' + this.$route.params.slug + '"}', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.menu = result.menu
                if (result.menu === null || result.menu === '') {
                    this.$router.push('/404')
                }
            })
    },
    methods: {}
}
</script>