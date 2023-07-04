<template>
    <main>
        <div class="container">
            <div class="row">
                <breadcrumbs v-if="this.$store.state.auth.user.role === 'admin'" prev="Модератор|moderator" current='Создание заведения' />
                <breadcrumbs v-else prev="Бизнес|biznes" current='Создание заведения' />
            </div>

            <div class="row">
                <div class="moderatorHeader">
                    <h1>Создание заведения</h1>
                </div>
            </div>

            <div class="row">
                <newForm />
            </div>
        </div>
    </main>
</template>
  
<script>
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import newForm from '@/components/new/new-est.vue'
export default {
    components: {
        breadcrumbs,
        newForm
    },
    setup(){
        useHead({
            title: 'Создание заведения',
            link: [
                {
                    rel: 'stylesheet',
                    href: '/static/css/moderator.css'
                },
                {
                    rel: 'stylesheet',
                    href: '/static/css/businessNew.css'
                }
            ]
        })
    },
    computed: {
        haveAccess() {
            let user = this.$store.state.auth.user
            if(user.role === 'admin' || user.role === 'seller'){
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
    }
}
</script>