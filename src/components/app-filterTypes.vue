<template>
    <div class="header-filterTypes-vstk" v-if="types.length > 0">
        <div class="header-filterTypes-vstk-hidden">
            <router-link class="header-filterTypes-vstk-item" v-for="type in types" :key="type.slug"
                :to="`/${this.$route.params.cat_city}/category/${type.slug}`">{{ type.name }}</router-link>
        </div>
    </div>
</template>

 
<script>

export default {
    props: ['types'],
    data() {
        return {}
    },
    methods: {},
}
</script>