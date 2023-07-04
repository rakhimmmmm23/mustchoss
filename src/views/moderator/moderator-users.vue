<template>
    <main>
        <div class="container">
            <div class="row">
                <breadcrumbs current='Посетитель' />
            </div>

            <div class="row">
                <moderatorHeader />
            </div>

            <div class="row">
                <div class="moderator__filter"></div>
            </div>

            <div class="row">
                <div class="usersList">
                    <template v-for="user in allUsers" :key="user._id">
                        <div v-if="haveAccess" class="user">
                            <div v-if="user?.avatar?.path?.length > 0" class="moderator-users-img-cont">
                                <img :src="imgLinkHandler(user)"
                                    alt="photo">
                            </div>
                            <figure v-else>
                                <span></span>
                            </figure>
                            <h3>{{user.name}}</h3>
                            <a class="userProfile" href="#">Профиль</a>
                        </div>
                    </template>
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
            moderation: [],
            allUsers: []
        }
    },
    setup() {
        useHead({
            title: 'Посетитель',
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
        else {
            let requestOptions = {
                method: 'GET',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/users', requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.allUsers = result
                })
        }
    },
    methods:{
        imgLinkHandler(user) {
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + user.avatar.path
        },
    }
}
</script>