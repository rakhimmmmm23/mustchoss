<template>
    <main>
        <div class="container container__new">
            <div class="row">
                <breadcrumbs current='Бизнес' />
            </div>

            <div class="row">
                <div class="business__header">
                    <h1>Бизнес</h1>
                    <router-link to="/biznes/novoe" class="btnHeader">
                        Добавить страницу
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.91081 14.24V10.944H6.58281V9.792H9.91081V6.496H11.0948V9.792H14.4228V10.944H11.0948V14.24H9.91081Z" fill="#242424"/>
                            <circle cx="10.5" cy="10.5" r="10" stroke="black"/>
                        </svg>
                    </router-link>
                </div>
            </div>

            <appIndex v-if="establishments.length != 0" :estab="establishments" />
            <appEmpty v-else />
        </div>
    </main>
</template>
  
<script>
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import appEmpty from '@/views/biznes/biznes-empty.vue'
import appIndex from '@/views/biznes/biznes-index.vue'
export default {
    components: {
        appEmpty,
        appIndex,
        breadcrumbs
    },
    data () {
        return {
            establishments: []
        }
    },
    setup(){
        useHead({
            title: 'Бизнес',
            link: [
                {
                    rel: 'stylesheet',
                    href: '/static/css/business.css'
                }
            ],
        })
    },
    computed: {
        haveAccess() {
            let user = this.$store.state.auth.user
            if(user.role === 'seller'){
                return true
            }else{
                return false
            }
        },
    },
    mounted() {
        if (!this.haveAccess) {
            this.$router.push('/404');
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/allitems/establishments?filter={userID:"'+this.$store.state.auth.user.id+'"}&sort={_created:"-1"}', requestOptions)
        .then(response => response.json())
        .then(result => {
            this.establishments = result
        })
    }
}
</script>