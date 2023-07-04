<template>
    <div class="breadcrumbs" itemscope itemtype="http://schema.org/BreadcrumbList">
        <span v-for="(link, i) in way" :key="link.name" itemprop="itemListElement" itemscope
            itemtype="http://schema.org/ListItem">
            <span v-if="link.path === null || link.path === '' || (i === Object.keys(way).length - 1)"
                class="breadcrumbs__link" itemprop="item">
                <span itemprop="name">{{ link.name }}</span>
            </span>
            <router-link v-else class="breadcrumbs__link" :to="link.path" itemprop="item">
                <span itemprop="name">{{ link.name }}</span>
            </router-link>
            <meta itemprop="position" :content="i + 1">
        </span>
    </div>
</template>

<script>

export default {

    props: ['current', 'prev'],
    data() {
        return {
            way: []
        }
    },
    methods: {},
    watch: {
        'current': function (newValue) {
            this.way[2].name = newValue
        }
    },
    async mounted() {
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        await fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/breadcrumbs?way=' + this.$route.path + '&current=' + this.current + '&prev=' + this.prev, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.way = result
            })
    }
}
</script>