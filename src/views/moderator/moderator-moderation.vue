<template>
    <main>
        <div class="container">
            <div class="row">
                <breadcrumbs current='Модерация' />
            </div>

            <div class="row">
                <moderatorHeader />
            </div>

            <div class="row">
                <div class="moderator__filter"></div>
            </div>

            <div class="row">
                <div class="moderationList">
                    <template v-for="item in moderation" :key="item.slug">
                    <div v-if="item.state === 0" class="moderationItem" :id="item.id">
                        <h3>{{ item.name }}</h3>
                        <div class="moderationItem-type">
                            Тип:
                            <span>{{ item.type.name }}</span>
                        </div>
                        <button class="moderationItem-more" @click="routerSingleMod(item.slug)">
                            Подробнее
                        </button>
                        <button type="button" class="moderationItem-btn js-moderationAccept" :data-id="item.id" @click='setEst(item.id)'>Одобрить</button>
                        <button type="button" class="moderationItem-btn js-moderationReject" :data-id="item.id" @click='delEst(item)'>Отклонить</button>
                    </div>
                    </template>
                </div>
            </div>
        </div>
    </main>

    <div class="popup ani popupNotifi popup__accept">
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z" fill="#242424"/>
            </svg>
        </button>

        <h4>Одобрить заявку</h4>
        <p>Вы действительно хотите одобрить заявку на публикацию на заведения</p>

        <div class="notifiBtn">
            <button type="button" class="js-establishmentAccept" @click='establishmentAccept()'>Да</button>
            <button type="button" class="js-popupClose">Нет</button>
        </div>
    </div>
</template>

<script>
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import moderatorHeader from '@/components/moderator/moderator-header.vue'
import popup from '@/helpers/popup.js'
import JQuery from 'jquery'
export default {
    components: {
        breadcrumbs,
        moderatorHeader
    },
    data() {
        return {
            moderation: [],
            estID: null
        }
    },
    setup(){
        useHead({
            title: 'Модерация',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/moderator.css'
            }],
            script: [
                {
                    src: '/static/js/moderator.js'
                }
            ],
        })
    },
    computed: {
        haveAccess() {
            let user = this.$store.state.auth.user
            if(user.role === 'admin'){
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/moderation', requestOptions)
        .then(response => response.json())
        .then(result => {
            this.moderation = result
        })
    },
    methods: {
        setEst(data) {
            this.estID = data
        },
        delEst(data) {
            let requestOptions = {
            method: 'DELETE',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/establishments/${data.id}`, requestOptions)
        .then(()=>this.$router.go())
        },
        routerSingleMod(slug) {
            let requestOptions = {
                method: 'GET',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/musatos/single?filter={slug:"${slug}"}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.$router.push(`/${result.city}/${slug}`);
                })
        },
        establishmentAccept() {
            // console.log(this.estID)

            let update = {
                _id: this.estID,
                _state: 1
            }
            let raw = JSON.stringify({
                "data": update
            })
            let requestOptions = {
                method: 'POST',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: raw,
                redirect: 'follow'
            }
            
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/establishments', requestOptions)
            .then(response => response.json())
            .then(result => {
                let $ = JQuery,
                    popupData

                $('body').removeClass('lock')
                $('.popup__accept').removeClass('active')
                if(result._state === 1){
                    // все ок
                    $('#' + this.estID).remove()
                    popupData = {
                        "status": "success",
                        "message": {
                            "title": 'Готово!',
                            "text": 'Заявка на публикацию одобрена',
                            "data": null
                        }
                    }
                }else{
                    // ошибка
                    popupData = {
                        "status": "error",
                        "message": {
                            "title": 'Ошибка',
                            "text": 'В данный момент невозможно совершить действие. Попробуйте позже.',
                            "data": null
                        }
                    }
                }
                popup(popupData)
            })
            .catch(error => console.log('error', error))
        }
    }
}
</script>