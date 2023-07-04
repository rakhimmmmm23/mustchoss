<template>
    <main>
        <div class="container">
            <div class="row">
                <breadcrumbs current='Банковская карта' />
            </div>

            <div class="row">
                <cabinetHeader />
            </div>

            <div class="row">Банковская карта</div>
        </div>
    </main>
</template>
  
<script>
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import cabinetHeader from '@/components/cabinet/cabinet-header.vue'
export default {
    components: {
        breadcrumbs,
        cabinetHeader
    },
    setup(){
        useHead({
            title: 'Банковская карта',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/kabinet.css'
            }],
        })
    },
    beforeMount () {
        // document.title = this.title
    }
}
</script>