<template>
    <siteHeader />
    <router-view/>
    <siteFooter />
    <!-- popup -->
    <popup />
</template>

<script>
import siteHeader from '@/components/site-header.vue'
import siteFooter from '@/components/site-footer.vue'
import popup from '@/components/popup/popup-general.vue'

export default {
    components: {
        siteHeader,
        siteFooter,
        popup
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    }
}
</script>