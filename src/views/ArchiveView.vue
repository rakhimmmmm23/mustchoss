<template>
    <input type="hidden" class="vstk-flag-for-menu">
    <main>
        <div class="container">
            <!-- <div class="row">
                <breadcrumbs :current='title' />
            </div>
            <section class="archiveHeader">
                <h1>{{ title }}</h1>
                {{ title }}
            </section> -->

            <div style="width:100%" v-if="filtererArchive.length !== 0">
                <template v-for="(instit, indexType) in institutionType" :key="instit.slug">

                    <div class="section-vstk" v-if="indexType == 2 && promos.length > 0">
                        <div class="extb-vstk-item-head">
                            <h3 class="instit-name-vstk">Акции</h3>
                            <router-link :to="`/${this.$route.params.cat_city}/promos`">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.5 22.0457L17.5431 16.0026L11.5 9.94635L13.3604 8.08594L21.2771 16.0026L13.3604 23.9193L11.5 22.0457Z"
                                        fill="#242424" />
                                </svg>
                            </router-link>
                        </div>
                        <div class="establishments-vstk establishments-vstk-promos-archive">
                            <template v-for="promo in promos" :key="promo._id">
                                <a :href="`/${promo.estabInfo.slug}/promo/${promo._id}`" class="promos-card">
                                    <div class="promos-card-img-cont">
                                        <img v-if="promo.banner[0]?.path" :src="imgLinkHandler(promo)" alt="акция" />
                                    </div>
                                    <h4 v-if="this.$route.params.slug">{{ promo.title }}</h4>
                                    <h4 v-else>{{ promo.estabInfo.name }}</h4>
                                </a>
                            </template>
                        </div>
                    </div>
                    <div class="section-vstk section-vstk-archive-news" v-if="indexType == 4 && news.length > 0">
                        <div class="extb-vstk-item-head">
                            <h3 class="instit-name-vstk">Новости заведений</h3>
                            <router-link :to="`/${this.$route.params.cat_city}/news`">
                                Все новости
                            </router-link>
                        </div>
                        <div class="establishments-vstk establishments-vstk-promos-archive">
                            <template v-for="newsItem in news" :key="newsItem._id">
                                <a class="news-item" :href="`/${newsItem.estabInfo.slug}/news/${newsItem._id}`">
                                    <div class="news-item-img-cont">
                                        <img v-if="newsItem.banner[0]?.path" :src="imgLinkHandler(newsItem)"
                                            alt="Новость" />
                                    </div>
                                    <h4>{{ newsItem.title }}</h4>
                                    <span>{{ formattedDate(newsItem.date) }}</span>
                                    <p>Подробнее <svg class="vector" width="5" height="8" viewBox="0 0 5 8" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0.0107422 6.67167L2.68241 4L0.0107422 1.3225L0.833242 0.5L4.33324 4L0.833242 7.5L0.0107422 6.67167Z"
                                                fill="black" />
                                        </svg></p>
                                </a>
                            </template>
                        </div>
                    </div>

                    <div class="section-vstk" v-if="establishmentsFiltered(instit.slug).length > 0">
                        <div class="extb-vstk-item-head">
                            <h3 class="instit-name-vstk">{{ instit.name }}</h3>
                            <router-link :to="`/${this.$route.params.cat_city}/category/${instit.slug}`">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.5 22.0457L17.5431 16.0026L11.5 9.94635L13.3604 8.08594L21.2771 16.0026L13.3604 23.9193L11.5 22.0457Z"
                                        fill="#242424" />
                                </svg>
                            </router-link>
                        </div>
                        <div class="establishments-vstk">
                            <template v-for="(item, index) in establishmentsFiltered(instit.slug)" :key="item.slug">
                                <router-link v-if="index < 6" :to="'/' + item.type + '/' + item.slug"
                                    class="institution-vstk">
                                    <figure v-if="item.thumb === null || item.thumb === '' || typeof item.thumb.archive !== 'string' "></figure>
                                    <img v-else v-bind:src="item.thumb.archive" v-bind:alt="item.name">
                                    <h5 v-html="item.name"></h5>
                                </router-link>
                            </template>
                        </div>
                        <!-- <div class="archiveInstitution__tpl"></div>
                    <div class="archiveInstitution__tpl"></div> -->
                    </div>
                </template>
            </div>
            <div v-else>
                <svg role="img" width="260" height="320" aria-labelledby="loading-aria" viewBox="0 0 260 320"
                    preserveAspectRatio="none">
                    <title id="loading-aria">Loading...</title>
                    <rect x="0" y="0" width="100%" height="100%" clip-path="url(#clip-path)" style='fill: url("#fill")'>
                    </rect>
                    <defs>
                        <clipPath id="clip-path">
                            <rect x="0" y="0" rx="14" ry="14" width="260" height="260" />
                            <rect x="0" y="274" rx="0" ry="0" width="170" height="17" />
                            <rect x="0" y="305" rx="0" ry="0" width="220" height="15" />
                        </clipPath>
                        <linearGradient id="fill">
                            <stop offset="0.599964" stop-color="#f3f3f3" stop-opacity="1">
                                <animate attributeName="offset" values="-2; -2; 1" keyTimes="0; 0.25; 1" dur="2s"
                                    repeatCount="indefinite"></animate>
                            </stop>
                            <stop offset="1.59996" stop-color="#ecebeb" stop-opacity="1">
                                <animate attributeName="offset" values="-1; -1; 2" keyTimes="0; 0.25; 1" dur="2s"
                                    repeatCount="indefinite"></animate>
                            </stop>
                            <stop offset="2.59996" stop-color="#f3f3f3" stop-opacity="1">
                                <animate attributeName="offset" values="0; 0; 3" keyTimes="0; 0.25; 1" dur="2s"
                                    repeatCount="indefinite"></animate>
                            </stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <mobile />
        </div>
    </main>
</template>
  
<script>
import mobile from '@/components/app-mobile.vue'
import { useHead } from '@vueuse/head'
import moment from 'moment'
import { transliterate } from 'transliteration';
// import breadcrumbs from '@/components/app-breadcrumbs.vue    '

export default {
    components: {
        mobile,
        // breadcrumbs
    },
    data() {
        return {
            title: null,
            type: null,
            establishments: [],
            is_data_fetched: false,
            institutionType: {},
            step: 0,
            filtererArchive: [],
            promos: [],
            news: [],
            allInfoEstablishments: [],
            searchArr: [],
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    setup() {
        useHead({
            // title: this.title,
            // title: () => this.title,
            // title: 'Archive',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/archive.css'
            }, {
                rel: 'stylesheet',
                href: '/static/css/promo.css'
            }],
        })
    },
    computed: {
        filterData() {
            return this.$store.state.utils.filteredArchive;
        },
        searchTerm() {
            return this.$store.state.utils.searchTerm;
        },
        allEstablishmnets() {
            return this.$store.state.utils.allEstablishmnets;
        }
    },
    methods: {
        allInfoEstablishmentsHandler() {
            let requestOptions = {
                method: 'GET',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }

            this.establishments.forEach(item => {
                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/single?filter={slug:"' + item.slug + '"}', requestOptions)
                    .then(response => response.json())
                    .then(res => {
                        if (res.menu && Array.isArray(res.menu)) {
                            res.menu = res.menu
                                .filter(item => item.dishes && item.dishes.length > 0)
                                .map(item => item.dishes.map(dish => dish.name))
                                .flat()
                                .filter(name => name)
                        }
                        if (res.kitchenType !== null)
                            res.kitchenType = JSON.parse(res.kitchenType)

                        this.allInfoEstablishments = [...this.allInfoEstablishments, res]
                        if (this.allInfoEstablishments.length === this.establishments.length)
                            this.$store.dispatch('utils/setAllEstablishmnets', this.allInfoEstablishments);
                    })
            })

        },
        formattedDate(date) {
            return moment(date).format('DD.MM.YYYY');
        },
        imgLinkHandler(promo) {
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + promo?.banner[0]?.path
        },
        establishmentsFiltered(type) {
            let newArr = []
            if (this.filterData.length === 0 || (this.filterData.length === 1 && !Object.prototype.hasOwnProperty.call(this.filterData[0], 'slug')))
                newArr = this.establishments.filter(item => item.type === type)
            else {
                newArr = this.establishments.filter(item => {
                    let arrKtc = []
                    if (item.kitchenType !== null) {
                        arrKtc = JSON.parse(item.kitchenType)
                    }
                    let matchingItem = this.filterData.find(otherItem => (otherItem.slug && (otherItem.slug === item.type || arrKtc.includes(otherItem.slug))) && item.type === type);
                    return matchingItem
                });
            }

            if (this.allInfoEstablishments.length > 0 && this.searchTerm.length > 0) {
                let searchArr = this.searchTerm.split(/[\s,]+/);
                searchArr = searchArr.filter(item => item && item.trim().length >= 2);

                let searchTrsWords = searchArr.map(searchWord =>
                    transliterate(searchWord.toLowerCase())
                );

                let arrKitchen = this.allInfoEstablishments
                    .filter(item => {
                        if (item.kitchenType && Array.isArray(item.kitchenType)) {
                            return searchTrsWords.some(word =>
                                item.kitchenType.some(type => type.includes(word))
                            );
                        } else {
                            return false;
                        }
                    })
                    .map(item => item.id);

                let arrTypeEstb = this.allInfoEstablishments
                    .filter(item => {
                        return searchTrsWords.some(word => item.type.includes(word))
                    })
                    .map(item => item.id);

                let arrDishes = this.allInfoEstablishments
                    .filter(item => {
                        if (item.menu && Array.isArray(item.menu)) {
                            return searchArr.some(word =>
                                item.menu.some(dish => {
                                    return dish.toLowerCase().includes(word.toLowerCase())
                                })
                            );
                        } else {
                            return false;
                        }
                    })
                    .map(item => item.id);

                if (arrKitchen.length > 0)
                    newArr = newArr.filter(item => arrKitchen.includes(item.id))
                if (arrTypeEstb.length > 0)
                    newArr = newArr.filter(item => arrTypeEstb.includes(item.id))
                if (arrDishes.length > 0)
                    newArr = newArr.filter(item => arrDishes.includes(item.id))
                if ([...arrDishes, ...arrTypeEstb, ...arrKitchen].length < 1)
                    newArr = []
            }

            return newArr
        }
    },
    beforeMount() {
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
                this.institutionType = result
                result.forEach(item => {
                    if (item.slug === this.type) {
                        this.title = item.name
                    }
                })
            })
            .then(() => {
                const currentCity = this.$route.params.cat_city
                const params = `filter={${currentCity ? 'city:"' + currentCity + '"' : ''}}`;
                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/musatos/archive?${params}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        this.establishments = [...this.establishments, ...result]
                        if (result.length != 0) {
                            this.show = true
                            this.is_data_fetched = true
                        }
                        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/promo?filter={city:"${this.$route.params.cat_city}"}`, requestOptions)
                            .then(response => response.json())
                            .then(result2 => {
                                if (result2.length > 0) {
                                    result2 = result2.slice(0, 3)
                                    result2.forEach((obj1) => {
                                        const obj2 = result.find((obj) => obj.id === obj1.establishmentID);
                                        if (obj2) {
                                            obj1.estabInfo = obj2;
                                        }
                                    });
                                    this.promos = result2
                                }
                            })
                        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/news?filter={city:"${this.$route.params.cat_city}"}`, requestOptions)
                            .then(response => response.json())
                            .then(result2 => {
                                if (result2.length > 0) {
                                    result2 = result2.slice(0, 3)
                                    result2.forEach((obj1) => {
                                        const obj2 = result.find((obj) => obj.id === obj1.establishmentID);
                                        if (obj2) {
                                            obj1.estabInfo = obj2;
                                        }
                                    });
                                    this.news = result2
                                }
                            })
                    }).then(() => {
                        this.filtererArchive = this.establishments
                        const matchingData = this.institutionType.filter(inst => {
                            return this.establishments.some(est => inst.slug === est.type);
                        }).map(inst => inst);
                        this.$store.dispatch('utils/setFilteredTypes', matchingData);

                        if (this.allEstablishmnets.length < 1)
                            this.allInfoEstablishmentsHandler();
                    })
            })
    },
    async mounted() {
        // this.title = this.$context.title
        this.type = this.$route.params.cat_city
        // const { id } = this.$route.params
        // const response = await fetch(`https://api.example.com/user/${id}`)

        // this.user = await response.json()
    }
}
</script>