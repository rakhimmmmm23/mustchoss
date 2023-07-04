<template>
    <main>
        <div class="container">
            <ArciveView/>
        </div>
    </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import ArciveView from '@/views/ArchiveView.vue'

export default {
    components: {
        ArciveView,
    },
    setup() {
        useHead({
            title: 'Musatos',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/main.css'
            }],
        })
    },
}
</script>
