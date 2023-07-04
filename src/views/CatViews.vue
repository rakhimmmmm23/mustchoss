<template>
    <main>
        <div class="container">
            <div class="custom-breadcrumbs">
                <a class="custom-breadcrumbs-item" href="/">Главная</a>|
                <p class="custom-breadcrumbs-item">{{ title }}</p>
            </div>
            <section class="archiveHeader catViews_header">
                <h1>{{ title }}</h1>
            </section>

            <div class="head-control-promos-main head-control-catViews-main">
                <button @click="openFilterTypes" class="filter-promos-btn">Расширенный поиск
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z"
                            fill="white" />
                    </svg>
                </button>
                <div class="sort-promos-popup">
                    <button @click="sortOpenHandler" class="sort-promos-btn">
                        <p v-if="selectedSort === 0">Все</p>
                        <p v-if="selectedSort === 1">По рейтингу</p>
                        <p v-if="selectedSort === 2">От А до Я</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.42 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.42 8.58984Z"
                                fill="black" />
                        </svg>
                    </button>
                    <div class="sort-promos-popup-hid">
                        <div @click="sortHandler(0)">Все</div>
                        <div @click="sortHandler(1)">По рейтингу</div>
                        <div @click="sortHandler(2)">От А до Я</div>
                    </div>
                </div>
            </div>
            <section class="archiveContent" v-if="is_data_fetched">
                <router-link v-for="item in estbFiltered" :key="item.slug" :to="'/' + item.type + '/' + item.slug"
                    class="archiveInstitution">
                    <figure v-if="item.thumb === null || item.thumb === ''"></figure>
                    <img v-else :src="item.thumb.archive" :alt="item.name">
                    <h5 v-html="item.name"></h5>
                    <p v-if="item.adress != null || item.adress != ''">{{ item.adress }}</p>
                </router-link>

                <div class="archiveInstitution__tpl"></div>
                <div class="archiveInstitution__tpl"></div>
            </section>

            <section class="archiveContent" v-else>
                <svg role="img" width="260" height="320" aria-labelledby="loading-aria" viewBox="0 0 260 320"
                    preserveAspectRatio="none">
                    <title id="loading-aria">Loading...</title>
                    <rect x="0" y="0" width="100%" height="100%" clip-path="url(#clip-path)" style='fill: url("#fill");'>
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
            </section>


            <div class="cat-filter-container">
                <div class="heads-filt-search">
                    <div class="heads-filt-search-main">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3ZM9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z"
                                fill="#BDBDBD" />
                        </svg>
                        <p>{{ filterList.join(", ") }}</p>

                    </div>
                    <button class="heads-filt-go-btn" @click="filterClickHandler" type="button">
                        Go
                    </button>
                </div>
                <div class="cont-sum-filte-head">
                    <div>
                        <h5 class="head-filter-title">Средний чек</h5>
                        <div class="cont-sum-filte-head-inputs">
                            <label class="form__input form__phone">
                                <input type="text" name="sum" :placeholder="'от ' + parseInt(checkValue[0])">
                            </label>
                            <label class="form__input form__phone">
                                <input type="text" name="sum" :placeholder="'до ' + parseInt(checkValue[1])">
                            </label>
                        </div>
                        <v-container fluid class="filter-slider-cont">
                            <v-range-slider :min="0" :max="100" v-model="checkValue"></v-range-slider>
                        </v-container>
                    </div>
                    <div>
                        <h5 class="head-filter-title">Стоимость бизнес ланча</h5>
                        <div class="cont-sum-filte-head-inputs">
                            <label class="form__input form__phone">
                                <input type="text" name="sum" :placeholder="'от ' + parseInt(costValue[0])">
                            </label>
                            <label class="form__input form__phone">
                                <input type="text" name="sum" :placeholder="'до ' + parseInt(costValue[1])">
                            </label>
                        </div>
                        <v-container fluid class="filter-slider-cont">
                            <v-range-slider :min="0" :max="100" v-model="costValue"></v-range-slider>
                        </v-container>
                    </div>
                </div>
                <div class="head-filter-type">
                    <h5 class="head-filter-title">Кухня</h5>
                    <div>
                        <template v-for=" kitType  in  kitchenType " :key="kitType.slug">
                            <button @click="filterTypeHandler($event, kitType)">{{
                                kitType.name
                            }}
                                <span><svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.85102 7.0013L11.0827 10.233V11.0846H10.231L6.99935 7.85297L3.76768 11.0846H2.91602V10.233L6.14768 7.0013L2.91602 3.76964V2.91797H3.76768L6.99935 6.14964L10.231 2.91797H11.0827V3.76964L7.85102 7.0013Z"
                                            fill="white" />
                                    </svg>
                                </span>
                            </button>
                        </template>
                    </div>
                </div>
            </div>

            <mobile />
        </div>
    </main>
</template>

<script>
import { VRangeSlider } from 'vuetify/lib/components/VRangeSlider'
import { VContainer } from 'vuetify/lib/components/VGrid'
import { useHead } from '@vueuse/head'
import mobile from '@/components/app-mobile.vue'

export default {
    components: {
        VRangeSlider,
        VContainer,
        mobile
    },
    data() {
        return {
            establishments: [],
            title: '',
            is_data_fetched: false,
            kitchenType: [],
            filterList: [],
            checkValue: [0, 100],
            costValue: [0, 100],
            filterTypes: [],
            estbFiltered: [],
            allInfoEstablishments: [],
            selectedSort: 0,
            tmpFilteredPromos: []
        }
    },
    setup() {
        useHead({
            link: [{
                rel: 'stylesheet',
                href: '/static/css/archive.css'
            }],
        })
    },
    head() {
        return {
            title: this.title
        }
    },
    computed: {
        allEstablishmnets() {
            return this.$store.state.utils.allEstablishmnets;
        }
    },
    mounted() {
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/institutionType`, requestOptions)
            .then(response => response.json())
            .then(result => {
                result.forEach(item => {
                    if (item.slug === this.$route.params.cat)
                        this.title = item.name
                })
            }
            )
        const params = `filter={type:"${this.$route.params.cat}"${',city:"' + this.$route.params.cat_city + '"'}}`;
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/musatos/archive?${params}`, requestOptions)
            .then(response => response.json())
            .then(result2 => {
                if (result2.length > 0) {
                    this.establishments = result2
                    this.is_data_fetched = true
                    this.estbFiltered = result2
                    if (this.allEstablishmnets.length > 1) {
                        this.allInfoEstablishments = this.allEstablishmnets
                    } else
                        result2.forEach(item => {
                            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/musatos/single?filter={_id:"${item.id}"}`, requestOptions)
                                .then(response => response.json())
                                .then(result => {
                                    this.allInfoEstablishments = [...this.allInfoEstablishments, result]
                                })
                        })
                }
            })
            .catch(error => console.log('error', error))

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/kitchenType', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.kitchenType = result
            })
    },
    methods: {
        sortOpenHandler() {
            document.querySelector('.sort-promos-popup-hid').classList.toggle('sort-promos-popup-hid-active')
        },
        sortHandler(sort) {
            this.selectedSort = sort
            document.querySelector('.sort-promos-popup-hid').classList.remove('sort-promos-popup-hid-active')

            if (this.selectedSort === 1)
                this.estbFiltered = this.sortByRatingDescending(this.estbFiltered)
            if (this.selectedSort === 2)
                this.estbFiltered = this.sortByNameAscending(this.estbFiltered)
        },
        sortByNameAscending(objects) {
            objects.sort((a, b) => {
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            return objects;
        },
        sortByRatingDescending(firstArray) {
            let secondArray=this.allInfoEstablishments
            let ratingById = {};
            for (let obj of secondArray) {
                ratingById[obj.id] = obj.rating !== null ? obj.rating : -Infinity;
            }

            firstArray.sort(function (a, b) {
                let ratingA = ratingById[a.id];
                let ratingB = ratingById[b.id];
                return ratingB - ratingA;
            });

            let filteredArray = firstArray.filter(function (obj) {
                return ratingById[obj.id] !== undefined;
            });

            return filteredArray;
        },
        openFilterTypes() {
            document.querySelector('.cat-filter-container').classList.add('active')
            document.body.classList.add('lock')
        },
        filterClickHandler() {
            document.body.classList.remove('lock');
            document.querySelector('.active').classList.remove('active')

            if (this.filterTypes.length === 0 || (this.filterTypes.length === 1 && !Object.prototype.hasOwnProperty.call(this.filterTypes[0], 'slug')))
                this.estbFiltered = this.establishments
            else {
                this.estbFiltered = this.establishments.filter(item => {
                    if (item.kitchenType !== null) {
                        let arrKtc = []
                        arrKtc = JSON.parse(item.kitchenType)
                        let matchingItem = this.filterTypes.find(otherItem => otherItem.slug && (arrKtc.includes(otherItem.slug)));
                        return matchingItem
                    }
                });
            }

        },
        filterTypeHandler(e, type) {
            const currentBtn = e.currentTarget;
            if (currentBtn.classList.contains("head-filter-type-btn-active")) {
                const index = this.filterTypes.indexOf(type);
                if (index !== -1) {
                    this.filterTypes.splice(index, 1);
                }
                currentBtn.classList.remove("head-filter-type-btn-active");
                this.filterList = this.filterList.filter(el => el !== currentBtn.textContent)
            } else {
                this.filterTypes = [...this.filterTypes, type]
                this.filterList.push(currentBtn.textContent)
                currentBtn.classList.add("head-filter-type-btn-active");
            }
        }
    }
}
</script>