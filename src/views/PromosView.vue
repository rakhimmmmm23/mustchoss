<template>
    <main>
        <div class="container">
            <breadcrumbs current="Акции" />
            <section class="promos-main-section">
                <h2>Акции</h2>
                <div class="head-control-promos-main">
                    <button @click="openFilterTypes" class="filter-promos-btn">Расширенный поиск
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z"
                                fill="white" />
                        </svg>
                    </button>
                    <div class="sort-promos">
                        <p>Сортировка:</p>

                        <div class="sort-promos-popup">
                            <button @click="sortOpenHandler" class="sort-promos-btn">
                                <p v-if="selectedSort === 0">Все</p>
                                <p v-if="selectedSort === 1">По рейтингу</p>
                                <p v-if="selectedSort === 2">От А до Я</p>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.42 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.42 8.58984Z"
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
                </div>
                <div class="promos-card-cont">
                    <template v-for="promo in filteredPromos" :key="promo._id">
                        <a :href="`/${this.$route.params.slug ? this.$route.params.slug : promo.estabInfo.slug}/promo/${promo._id}`"
                            class="promos-card">
                            <div class="promos-card-img-cont">
                                <img v-if="promo.banner[0]?.path" :src="imgLinkHandler(promo)" alt="акция" />
                            </div>
                            <h4>{{ promo.title }}</h4>
                            <!-- <h4 v-if="!this.$route.params.slug">{{ promo.estabInfo.name }}</h4> -->
                        </a>
                    </template>
                </div>
            </section>
        </div>
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
            <div class="head-filter-type">
                <h5 class="head-filter-title">Тип заведения</h5>
                <div>
                    <template v-for=" instType  in  institutionType " :key="instType.slug">
                        <button @click="filterTypeHandler($event, instType)">{{
                            instType.name }}
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
    </main>
</template>


<script>
import { VRangeSlider } from 'vuetify/lib/components/VRangeSlider'
import { VContainer } from 'vuetify/lib/components/VGrid'
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'

export default {
    components: {
        VRangeSlider,
        VContainer,
        breadcrumbs,
    },
    data() {
        return {
            establishments: [],
            promos: [],
            kitchenType: [],
            institutionType: [],
            filterList: [],
            checkValue: [0, 100],
            costValue: [0, 100],
            filterTypes: [],
            filteredPromos: [],
            allInfoEstablishments: [],
            selectedSort: 0,
            tmpFilteredPromos: []
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
        const cache = {};
        if (!this.$route.params.slug) {
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/promo?filter={city:"${this.$route.params.city}"}`, requestOptions)
                .then(response => response.json())
                .then(result2 => {
                    if (result2.length > 0) {
                        const processCustomPromos = async () => {
                            for (let i = 0; i < result2.length; i++) {
                                const itemPromo = result2[i];
                                if (cache[itemPromo.establishmentID]) {
                                    itemPromo.estabInfo = cache[itemPromo.establishmentID]
                                    this.promos = [...this.promos, itemPromo]
                                } else {
                                    const response = await fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/musatos/single?filter={_id:"${itemPromo.establishmentID}"}`, requestOptions)
                                    const result = await response.json()
                                    this.establishments = [...this.establishments, result]
                                    itemPromo.estabInfo = result
                                    cache[itemPromo.establishmentID] = result
                                    this.promos = [...this.promos, itemPromo]
                                }
                                this.filteredPromos = this.promos
                                this.tmpFilteredPromos = this.promos
                            }
                        };
                        processCustomPromos();
                    }
                }).catch((er) => console.error(er))
        } else {
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/musatos/single?filter={slug:"${this.$route.params.slug}"}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.establishments = result
                    fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/promo?filter={establishmentID:"${result.id}"}`, requestOptions)
                        .then(response => response.json())
                        .then(result2 => {
                            if (result2.length > 0) {
                                result2.forEach(itemPromo => itemPromo.estabInfo = result)
                                this.promos = [...this.promos, ...result2]
                                this.filteredPromos = this.promos
                                this.tmpFilteredPromos = this.promos
                            }
                        })
                }).catch((er) => console.error(er))
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

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/kitchenType', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.kitchenType = result
            })
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/institutionType`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.institutionType = result
            }
            )
    },
    setup() {
        useHead({
            link: [{
                rel: 'stylesheet',
                href: '/static/css/promo.css'
            }],
        })
    },
    methods: {
        sortOpenHandler() {
            document.querySelector('.sort-promos-popup-hid').classList.toggle('sort-promos-popup-hid-active')
        },
        sortHandler(sort) {
            this.selectedSort = sort
            document.querySelector('.sort-promos-popup-hid').classList.remove('sort-promos-popup-hid-active')
            if (this.selectedSort === 0)
                this.filteredPromos = this.tmpFilteredPromos
            if (this.selectedSort === 1)
                this.filteredPromos = this.sortByRatingDescending(this.tmpFilteredPromos)
            if (this.selectedSort === 2)
                this.filteredPromos = this.sortByNameAscending(this.tmpFilteredPromos)
        },
        sortByNameAscending(objects) {
            objects.sort((a, b) => {
                let nameA = a.title.toUpperCase();
                let nameB = b.title.toUpperCase();
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
        sortByRatingDescending(objects) {
            objects.sort((a, b) => {
                let ratingA = a.estabInfo.rating !== null ? a.estabInfo.rating : -Infinity;
                let ratingB = b.estabInfo.rating !== null ? b.estabInfo.rating : -Infinity;
                return ratingB - ratingA;
            });

            return objects;
        },
        imgLinkHandler(promo) {
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + promo?.banner[0]?.path
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
        },
        filterClickHandler() {
            document.body.classList.remove('lock');
            document.querySelector('.active').classList.remove('active')

            if (this.filterTypes.length === 0 || (this.filterTypes.length === 1 && !Object.prototype.hasOwnProperty.call(this.filterTypes[0], 'slug'))) {
                this.filteredPromos = this.promos
                this.tmpFilteredPromos = this.promos
            }
            else {
                this.filteredPromos = this.promos.filter(item => {
                    if (item.estabInfo.kitchenType !== null) {
                        let arrKtc = []
                        arrKtc = JSON.parse(item.estabInfo.kitchenType)
                        let matchingItem = this.filterTypes.find(otherItem => otherItem.slug && (arrKtc.includes(otherItem.slug) || otherItem.slug === item.estabInfo.type));
                        return matchingItem
                    }
                });
                this.tmpFilteredPromos = this.filteredPromos
            }

        },
        openFilterTypes() {
            document.querySelector('.cat-filter-container').classList.add('active')
            document.body.classList.add('lock')
        },
    }
}
</script>