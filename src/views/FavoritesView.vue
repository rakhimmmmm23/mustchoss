<template>
    <main>
        <div class="container">
            <div class="row">
                <breadcrumbs :current='title' />
            </div>
            <section class="archiveHeader">
                <h1>{{ title }}</h1>
                {{ title }}
            </section>

            <section class="archiveContent" v-if="is_data_fetched">
                <router-link v-for="item in favorites" :key="item.slug" :to="'/'+item.type+'/'+item.slug" class="archiveInstitution">
                    <figure v-if="item.thumb === null || item.thumb === ''"></figure>
                    <img v-else v-bind:src="item.thumb" v-bind:alt="item.name">
                    <h5 v-html="item.name"></h5>
                    <p v-if="item.adress != null || item.adress != ''">{{ item.adress }}</p>
                </router-link>

                <div class="archiveInstitution__tpl"></div>
                <div class="archiveInstitution__tpl"></div>
            </section>

            <section class="archiveContent" v-else>
                <svg
                role="img"
                width="260"
                height="320"
                aria-labelledby="loading-aria"
                viewBox="0 0 260 320"
                preserveAspectRatio="none"
                >
                <title id="loading-aria">Loading...</title>
                <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    clip-path="url(#clip-path)"
                    style='fill: url("#fill");'
                ></rect>
                <defs>
                    <clipPath id="clip-path">
                        <rect x="0" y="0" rx="14" ry="14" width="260" height="260" /> 
                        <rect x="0" y="274" rx="0" ry="0" width="170" height="17" /> 
                        <rect x="0" y="305" rx="0" ry="0" width="220" height="15" />
                    </clipPath>
                    <linearGradient id="fill">
                    <stop
                        offset="0.599964"
                        stop-color="#f3f3f3"
                        stop-opacity="1"
                    >
                        <animate
                        attributeName="offset"
                        values="-2; -2; 1"
                        keyTimes="0; 0.25; 1"
                        dur="2s"
                        repeatCount="indefinite"
                        ></animate>
                    </stop>
                    <stop
                        offset="1.59996"
                        stop-color="#ecebeb"
                        stop-opacity="1"
                    >
                        <animate
                        attributeName="offset"
                        values="-1; -1; 2"
                        keyTimes="0; 0.25; 1"
                        dur="2s"
                        repeatCount="indefinite"
                        ></animate>
                    </stop>
                    <stop
                        offset="2.59996"
                        stop-color="#f3f3f3"
                        stop-opacity="1"
                    >
                        <animate
                        attributeName="offset"
                        values="0; 0; 3"
                        keyTimes="0; 0.25; 1"
                        dur="2s"
                        repeatCount="indefinite"
                        ></animate>
                    </stop>
                    </linearGradient>
                </defs>
                </svg>
            </section>

            <mobile />
        </div>
    </main>
</template>
  
<script>
import { useHead } from '@vueuse/head'
import { isEmpty } from '@/helpers/helper.js'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import mobile from '@/components/app-mobile.vue'

export default {
    components: {
        breadcrumbs,
        mobile
    },
    data() {
        return {
            title: 'Избранные',
            type: null,
            favorites: [],
            is_data_fetched: false
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    setup(){
        useHead({
            link: [{
                rel: 'stylesheet',
                href: '/static/css/archive.css'
            }],
        })
    },
    computed: {
        haveAccess() {
            let user = this.$store.state.auth.user
            if(user.role === 'user'){
                return true
            }else{
                return false
            }
        },
    },
    methods: {
        
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/users/' + this.$store.state.auth.user.id, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(!isEmpty(result.favorites)){
                // не пусто
                let updateFav = {
                    favorites: JSON.parse(result.favorites),
                }

                let rawFav = JSON.stringify({
                    "data": updateFav
                })
                let requestOptionsFav = {
                    method: 'POST',
                    headers: {
                        'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                        'Content-Type': 'application/json'
                    },
                    body: rawFav,
                    redirect: 'follow'
                }

                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/favorites', requestOptionsFav)
                .then(response => response.json())
                .then(result => {
                    this.favorites = result
                    this.is_data_fetched = true
                })
                .catch(error => console.log('error', error))
            }
        })
    },
    mounted() {
        if (!this.haveAccess) {
            this.$router.push('/404');
        }
    }
}
</script>