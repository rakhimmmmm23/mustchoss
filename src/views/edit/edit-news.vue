<template>
    <section class="edit-news">
        <h2>Новости</h2>
        <div class="edit-news-mini-sec">
            <h4>Не опубликовано</h4>
            <div class="edit-news-mini-sec-container">
                <div @click="openModal(false)" class="edit-news-mini-sec-add">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.8781 27.1235V20.8454H12.5391V18.6511H18.8781V12.373H21.1333V18.6511H27.4724V20.8454H21.1333V27.1235H18.8781Z"
                            fill="#242424" />
                        <circle cx="20" cy="20" r="19.5" stroke="#242424" />
                    </svg>
                    <span>Добавить новость</span>
                </div>
                <template v-for="newsItem in news" :key="newsItem._id">
                    <div v-if="newsItem.status === 'waiting' && newsItem" class="edit-news-unpublished-item">
                        <div class="edit-news-unpublished-item-img-cont">
                            <img v-if="newsItem.banner[0]?.path" :src="imgLinkHandler(newsItem)" alt="Новость" />
                        </div>
                        <div class="edit-news-unpublished-item-cont">
                            <div class="edit-news-unpublished-item-cont-title">
                                <span>{{ formattedDate(newsItem.date) }}</span>
                                <h6>{{ newsItem.title }}</h6>
                            </div>
                            <div class="edit-news-unpublished-item-cont-panel">
                                <a :href="`/${establishments.slug}/news/${newsItem._id}`">Подробнее
                                    <svg width="5" height="8" viewBox="0 0 5 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.0078125 6.67167L2.67948 4L0.0078125 1.3225L0.830312 0.5L4.33031 4L0.830312 7.5L0.0078125 6.67167Z"
                                            fill="black" />
                                    </svg>
                                </a>
                                <button @click="publicPutHandler(newsItem)">Опубликовать</button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="edit-news-line"></div>
        <div class="edit-news-mini-sec">
            <h4>Опубликовано</h4>
            <div class="edit-news-mini-sec-container">
                <template v-for="(newsItem, index) in news" :key="newsItem._id">
                    <div v-if="newsItem.status === 'active'" class="edit-news-published-item">
                        <div class="edit-news-published-item-img-cont">
                            <img v-if="newsItem.banner[0]?.path" :src="imgLinkHandler(newsItem)" alt="Новость" />
                        </div>
                        <div class="edit-news-published-item-cont">
                            <div class="edit-news-published-item-cont-title">
                                <span>{{ formattedDate(newsItem.date) }}</span>
                                <h6>{{ newsItem.title }}</h6>
                            </div>
                            <div class="edit-news-published-item-cont-panel">
                                <a :href="`/${establishments.slug}/news/${newsItem._id}`">Подробнее
                                    <svg width="5" height="8" viewBox="0 0 5 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.0078125 6.67167L2.67948 4L0.0078125 1.3225L0.830312 0.5L4.33031 4L0.830312 7.5L0.0078125 6.67167Z"
                                            fill="black" />
                                    </svg>
                                </a>
                                <div class="edit-vstk-img-control-edit-news"
                                    :class="{ 'mini-popup-control-contai-active': newsItem?.isOpen }">
                                    <div class="edit-vstk-img-control-cont">
                                        <button type="button" class='edit-vstk-img-control-cont-btn-dots'
                                            @click="controlPopupHandler(index)">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.00355 9.27326C7.30493 9.27326 7.59397 9.39298 7.80708 9.60609C8.02019 9.8192 8.13991 10.1082 8.13991 10.4096C8.13991 10.711 8.02019 11 7.80708 11.2132C7.59397 11.4263 7.30493 11.546 7.00355 11.546C6.70217 11.546 6.41313 11.4263 6.20002 11.2132C5.98691 11 5.86719 10.711 5.86719 10.4096C5.86719 10.1082 5.98691 9.8192 6.20002 9.60609C6.41313 9.39298 6.70217 9.27326 7.00355 9.27326ZM7.00355 5.86417C7.30493 5.86417 7.59397 5.98389 7.80708 6.197C8.02019 6.41011 8.13991 6.69915 8.13991 7.00053C8.13991 7.30192 8.02019 7.59095 7.80708 7.80406C7.59397 8.01717 7.30493 8.1369 7.00355 8.1369C6.70217 8.1369 6.41313 8.01717 6.20002 7.80406C5.98691 7.59095 5.86719 7.30192 5.86719 7.00053C5.86719 6.69915 5.98691 6.41011 6.20002 6.197C6.41313 5.98389 6.70217 5.86417 7.00355 5.86417ZM7.00355 2.45508C7.30493 2.45508 7.59397 2.5748 7.80708 2.78791C8.02019 3.00102 8.13991 3.29006 8.13991 3.59144C8.13991 3.89282 8.02019 4.18186 7.80708 4.39497C7.59397 4.60808 7.30493 4.72781 7.00355 4.72781C6.70217 4.72781 6.41313 4.60808 6.20002 4.39497C5.98691 4.18186 5.86719 3.89282 5.86719 3.59144C5.86719 3.29006 5.98691 3.00102 6.20002 2.78791C6.41313 2.5748 6.70217 2.45508 7.00355 2.45508Z"
                                                    fill="#242424" />
                                            </svg>
                                        </button>
                                        <div class="mini-popup-control"
                                            :class="{ 'mini-popup-control-active': newsItem?.isOpen }">
                                            <div class="mini-popup-control-cont">
                                                <div class="mini-popup-control-figure"></div>
                                                <div class="mini-popup-control-buttons">
                                                    <button type="button"
                                                        @click="openModal(newsItem)">Редактировать</button>
                                                    <button type="button" @click="deleteItem(newsItem)"
                                                        class="mini-popup-control-danger">Удалить</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
    <PopupAddNews :dataFlag="dataModal" :cityEstb="cityEstb" />
</template>


<script>
import PopupAddNews from "@/components/popup/popup-add-news.vue"
import moment from 'moment';

export default {
    components: {
        PopupAddNews
    },
    data() {
        return {
            establishments: [],
            dataPromo: {},
            cityEstb: '',
            backActiveIndex: null,
            timeoutCount: null,
            dataModal: false,
            news: []
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
                this.establishments = result

                if (this.$store.state.auth.user.role === 'seller' && this.$store.state.auth.user.id != result.userID) {
                    this.$router.push('/404')
                }
            })
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/news?filter={establishmentID:"${this.$route.params.id}"}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.news = result
                this.news.forEach(item => {
                    item.isOpen = false
                })
            })
    },
    methods: {
        controlPopupHandler(index) {
            clearTimeout(this.timeoutCount)
            if (this.backActiveIndex !== null && this.backActiveIndex !== index)
                this.news[this.backActiveIndex].isOpen = false
            this.news[index].isOpen = !this.news[index].isOpen
            this.backActiveIndex = index
            this.timeoutCount = setTimeout((index) => {
                this.news[index].isOpen = false
            }, 3000, index);
        },
        openModal(item) {
            this.cityEstb = this.establishments.city
            if (item) {
                this.dataModal = true
                const newItem = Object.assign({}, item);

                this.$store.dispatch('utils/setEditDish', newItem)
            }
            else
                this.dataModal = false
            document.querySelector(".add-news-popup").classList.add("active")
            document.body.classList.add("lock")
        },
        imgLinkHandler(news) {
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + news.banner[0]?.path
        },
        formattedDate(date) {
            return moment(date).format('DD.MM.YYYY');
        },
        publicPutHandler(newsItem) {
            newsItem.status = 'active'
            let raw = JSON.stringify({
                "data": newsItem
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/news?_id=' + newsItem._id, requestOptions)
                .catch(error => console.log('error', error))
        },
        deleteItem(newsItem) {
            let requestOptions = {
                method: 'DELETE',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/news/' + newsItem._id, requestOptions)
                .then(response => response.json())
                .then(() => {
                    this.$router.go()
                })
        }
    }
}
</script>