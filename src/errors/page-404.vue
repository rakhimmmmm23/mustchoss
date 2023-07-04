<template>
    <main>
        <div class="container">
            <breadcrumbs current='404' />
        </div>

        <div class="notFound">
            <h1>404</h1>
            <h2>Страница еще в духовке</h2>
            <p>Перейдите на главную страницу или воспользуйтесь поиском</p>

            <a href="/">На главную</a>
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
    setup(){
        useHead({
            title: '404',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/404.css'
            }],
        })
    },
}
</script>