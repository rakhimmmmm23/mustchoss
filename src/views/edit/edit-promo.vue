<template>
    <div class="promo_vstk-edit_cont">
        <h3>Акции</h3>
        <div class="summary_vstk promo_vstk-edit">
            <template v-for="promo in promos" :key="promo['_id']">
                <a v-if="promo.type=='promo'" :href="'/' + institution.slug + '/promo/' + promo['_id']" class="promo-itog-vstk">
                    <div class="promo-img-cont">
                        <img v-if="promo.banner[0]?.path" :src="imgLinkHandler(promo)" alt="акция" />
                    </div>
                    <h5>{{ promo.title }}</h5>
                </a>
            </template>
            <div @click="openModal('promo')" class="add_promo">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.8781 27.1235V20.8454H12.5391V18.6511H18.8781V12.373H21.1333V18.6511H27.4724V20.8454H21.1333V27.1235H18.8781Z"
                        fill="#242424" />
                    <circle cx="20" cy="20" r="19.5" stroke="#242424" />
                </svg>
                <p>Добавить акцию</p>
            </div>
        </div>
    </div>
    <div class="promo_vstk-edit_cont">
        <h3>Акции для именинников</h3>
        <div class="summary_vstk promo_vstk-edit">
            <template v-for="promo in promos" :key="promo['_id']">
                <a v-if="promo.type!=='promo'" :href="'/' + institution.slug + '/promo/' + promo['_id']" class="promo-itog-vstk">
                    <div class="promo-img-cont">
                        <img v-if="promo.banner[0]?.path" :src="imgLinkHandler(promo)" alt="акция" />
                    </div>
                    <h5>{{ promo.title }}</h5>
                </a>
            </template>
            <div @click="openModal('imeninnik')" class="add_promo">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.8781 27.1235V20.8454H12.5391V18.6511H18.8781V12.373H21.1333V18.6511H27.4724V20.8454H21.1333V27.1235H18.8781Z"
                        fill="#242424" />
                    <circle cx="20" cy="20" r="19.5" stroke="#242424" />
                </svg>
                <p>Добавить акцию</p>
            </div>
            <div class="add_promo-template"> </div>
        </div>
    </div>
    <PopupAddPromo :dataEdit="dataPromo" :selectedFilter="selectedFilter" :cityEstb="cityEstb"/>
</template>


<script>
import PopupAddPromo from "@/components/popup/popup-add-promo.vue"

export default {
    components: {
        PopupAddPromo
    },
    data() {
        return {
            selectedFilter: '',
            cityEstb:'',
            institution: [],
            dataPromo: {},
            promos: []
        }
    },
    created() {
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/establishments/' + this.$route.params.id, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.institution = result

                if (this.$store.state.auth.user.role === 'seller' && this.$store.state.auth.user.id != result.userID) {
                    this.$router.push('/404')
                }
            })
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/promo?filter={establishmentID:"${this.$route.params.id}"}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.promos = result
            })

    },
    methods: {
        openModal(filter) {
            this.selectedFilter = filter
            this.cityEstb=this.institution.city
            document.querySelector(".add-promo-popup").classList.add("active")
            document.body.classList.add("lock")
        },
        imgLinkHandler(promo) {
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + promo.banner[0]?.path
        },
    }

}

</script>