<template>
    <main>
        <div class="container">
            <div class="custom-breadcrumbs">
                <a class="custom-breadcrumbs-item" href="/">Главная</a>|
                <a class="custom-breadcrumbs-item" :href="`/${institution?.city}/promos/${institution?.slug}`">Акции</a>|
                <p class="custom-breadcrumbs-item">{{ promoInfo?.title ? promoInfo.title : 'Название акции' }}</p>
            </div>
            <section class="single promo-page-single">
                <div class="institutionInfo">
                    <div>
                        <div class="promo-page-img-cont">
                            <img v-if="Array.isArray(promoInfo.banner) && promoInfo.banner?.length > 0 && promoInfo?.banner[0]?.path"
                                :src="imgLinkHandler(promoInfo)" alt="акция" />
                        </div>
                        <div class="promo-page-head">
                            <h2>{{ promoInfo.title }}</h2>
                            <div class="institutionExtra">
                                <button type="button" class="btn" v-on:click="showShare()">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C18.7956 8 19.5587 7.68393 20.1213 7.12132C20.6839 6.55871 21 5.79565 21 5C21 4.20435 20.6839 3.44129 20.1213 2.87868C19.5587 2.31607 18.7956 2 18 2C17.2044 2 16.4413 2.31607 15.8787 2.87868C15.3161 3.44129 15 4.20435 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C5.20435 9 4.44129 9.31607 3.87868 9.87868C3.31607 10.4413 3 11.2044 3 12C3 12.7956 3.31607 13.5587 3.87868 14.1213C4.44129 14.6839 5.20435 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91 18 21.91C19.61 21.91 20.92 20.61 20.92 19C20.92 18.2256 20.6124 17.4829 20.0648 16.9352C19.5171 16.3876 18.7744 16.08 18 16.08Z"
                                            fill="black" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="institutionSection">
                        <h3>Описание акции</h3>
                        <p class="institutionSection__description">
                            {{ promoInfo.text }}</p>
                    </div>
                </div>

                <aside class="sidebar promo-panel-page">
                    <h1>{{ institution.name }}</h1>
                    <h3>{{ estbType }}</h3>
                    <div class="promo-panel-rating">
                        <ul class="institutionRating" :data-rating="institution.rating">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <span>{{ institution.rating }}</span>
                    </div>
                    <div v-if="hasRatings" class="promo-panel-rating-text">
                        <p v-for="(value, key) in ratingSub" :key="key">
                            {{ key }}: {{ value }}
                        </p>
                    </div>
                    <a :href="'/' + institution.type + '/' + institution.slug" class="sidebarBtn promo-link-main">
                        Подробнее
                    </a>
                    <button v-if="institution.menu != null" @click="bookingClickHandler" class="sidebarBtn promo-reserve">
                        Зарезервировать столик
                    </button>
                    <a :href="'/' + institution.type + '/' + institution.slug + '/menyu'" v-if="institution.menu != null"
                        class="sidebarBtn">
                        Меню / Доставка
                    </a>
                </aside>
            </section>
            <mobile />
        </div>
        <div class="share">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h4>Поделиться</h4>
            <ul class="share__list">
                <li>
                    <a :href="'https://api.whatsapp.com/send?text=' + pageURL" data-action="share/whatsapp/share"
                        target="_blank">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263">
                                </path>
                            </svg>
                        </span>
                        <h6>WhatsApp</h6>
                    </a>
                </li>
                <li>
                    <a :href="'https://telegram.me/share/url?url=' + pageURL + '&text=' + institution.name" target="_blank">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z">
                                </path>
                            </svg>
                        </span>
                        <h6>Telegram</h6>
                    </a>
                </li>
                <li>
                    <a :href="'http://vk.com/share.php?url=' + pageURL + '&title=' + institution.name" target="_blank">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.513-.743.675-1.021.675-.139 0-.341-.162-.341-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.258-.558.504 0 .528.79.65.871 2.138v3.228c0 .707-.127.836-.407.836-.743 0-2.551-2.729-3.624-5.853-.209-.607-.42-.852-.98-.852H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.853v-1.966c0-.626.133-.752.574-.752.324 0 .882.164 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.192c.626 0 .939-.313.759-.931-.197-.615-.907-1.51-1.849-2.569-.512-.604-1.277-1.254-1.51-1.579-.325-.419-.231-.604 0-.976.001.001 2.672-3.761 2.95-5.04z">
                                </path>
                            </svg>
                        </span>
                        <h6>ВКонтакте</h6>
                    </a>
                </li>
                <li>
                    <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + pageURL" target="_blank">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z">
                                </path>
                            </svg>
                        </span>
                        <h6>Facebook</h6>
                    </a>
                </li>
            </ul>

            <div class="share__copy">
                <input type="text" v-model="pageURL" disabled>
                <button type="button" @click="copyUrl()">Копировать</button>
            </div>
        </div>
            <popupBookking v-if="institution" :institution="institution" />
    </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import mobile from '@/components/app-mobile.vue'
import popupBookking from '@/components/popup/popup-booking.vue'

export default {
    components: {
        mobile,
        popupBookking
    },
    data() {
        return {
            share: false,
            institution: [],
            pageURL: null,
            ratingSub: {
                "Сервис": null,
                "Кухня": null,
                "Интерьер": null
            },
            institTypes: [],
            estbType: "",
            promoInfo: []
        }
    },
    computed: {
        hasRatings() {
            return Object.values(this.ratingSub).some(val => val !== null);
        },
    },
    beforeCreate() {
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/institutionType', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.institTypes = result
            })
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/promo/${this.$route.params.type}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.promoInfo = result
            }).catch(() => this.$router.push('/404'))

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/single?filter={slug:"' + this.$route.params.slug + '"}', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.institution = result
                this.pageURL = new URL(this.$route.href, window.location.origin).href
                this.institTypes.forEach((item) => {
                    if (item.slug === result.type)
                        this.estbType = item.name

                })
                if (Array.isArray(result.reviews) && result.reviews.length > 0)
                    result.reviews.forEach(review => {
                        this.ratingSub["Интерьер"] = this.getAverage([review.interior]);
                        this.ratingSub["Кухня"] = this.getAverage([review.kitchen]);
                        this.ratingSub["Сервис"] = this.getAverage([review.service]);
                    });
            })
    },
    setup() {
        useHead({
            link: [{
                rel: 'stylesheet',
                href: '/static/css/promo.css'
            },
            {
                rel: 'stylesheet',
                href: '/static/css/single.css'
            }
            ],
        })
    },
    methods: {
        bookingClickHandler() {
            const popup = document.querySelector(".popup-booking")
            if (popup) {
                popup.classList.add('active')
                document.body.classList.add("lock")
            }
        },
        getAverage(arr) {
            const filtered = arr.filter(x => x !== null);
            const sum = filtered.reduce((acc, curr) => acc + parseInt(curr), 0);
            const avg = sum / filtered.length;
            return Math.round(avg * 2) / 2;
        }
        ,
        showShare() {
            document.body.classList.add('lock')
            document.querySelector('.share').classList.add('active')
        },
        copyUrl() {
            navigator.clipboard.writeText(this.pageURL)
        },
        imgLinkHandler(promo) {
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + promo.banner[0]?.path
        },
    }
}
</script>