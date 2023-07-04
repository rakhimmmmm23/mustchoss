<template>
    <transition appear>
        <div class="nearbyMap-cont">
            <div class="nearby_panel">
                <div class="nearby_panel-head">
                    <breadcrumbs current='Карта' />
                    <h5 class="nearby-title-main">Карта</h5>
                    <div class="header__search">
                        <button @click="searchHandler($event)" type="submit">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3ZM9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z"
                                    fill="#BDBDBD" />
                            </svg>
                        </button>
                        <input v-model="searchTerm" type="text" name="search" placeholder="Вбейте: Улицу, Район">
                    </div>
                    <div class="filter-nearby-popup">
                        <div class="filter-nearby-popup-head" @click="popupHandlerNearby()">
                            {{ filterTerm.length > 0 ? filterTerm : 'Тип заведения' }}
                            <svg class="chevron-right" width="28" height="24" viewBox="0 0 28 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.12402 8.58997L14.3382 13.17L19.5637 8.58997L21.1689 9.99997L14.3382 16L7.50741 9.99997L9.12402 8.58997Z"
                                    fill="black" />
                            </svg>
                        </div>
                        <div v-if="filterInstType.length > 0" @click="selectedType($event)"
                            class="filter-nearby-hidden-iten">
                            Все
                        </div>
                        <template v-for="inst in filterInstType" :key="inst.slug">
                            <div @click="selectedType($event, inst.slug)" class="filter-nearby-hidden-iten">
                                {{ inst.name }}
                            </div>
                        </template>
                    </div>
                </div>
                <div class="nearby-cont-panel-main">
                    <div class="est-cont-nearby-cont">
                        <h5 v-if="cityNone" class="nearby-title-main nearby-title-main-error">Ошибка, заведения не найдены
                        </h5>
                        <template v-if="!cityNone">
                            <div v-for="est in filteredNearb" :key="est.id" @click="cardClick(est)"
                                class="est-cont-nearby-cont-item">
                                <div class="item-nearby-img-contain">
                                    <img v-if="est.thumbs && est.thumbs !== null && est.thumbs.length > 0"
                                        :src="est.thumbs[0]" alt="est" />
                                </div>
                                <div class="card-nearby-text">
                                    <h6>{{ est.name }}</h6>
                                    <div class="nearby-star-cont-items">
                                        <ul class="institutionRating" :data-rating="est.rating">
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                        </ul>
                                    </div>
                                    <p>{{ est.adress }}</p>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

            </div>
            <div class="singleMap nearbyMap">
                <YandexMap :coordinates="mapCenter" :zoom="mapZoom" :settings="settings" :controls="controls">
                    <template v-if="cityNearb.length > 0">
                        <template v-for="institution in filteredNearb " :key="institution.id">
                            <YandexCollection :options="markerIcon">
                                <YandexMarker ref="markers"
                                    v-if="institution.longitude !== null && institution.latitude !== null"
                                    :coordinates="[institution.longitude, institution.latitude]"
                                    :marker-id="institution.id">
                                    <template #component>
                                        <CardMap :data="institution" />
                                    </template>
                                </YandexMarker>
                            </YandexCollection>
                        </template>
                    </template>
                </YandexMap>
            </div>
        </div>
    </transition>
</template>
<style>
.yandex-balloon {
    height: 290px;
    width: 276px;
}
</style>

<script>
import { YandexMap, YandexMarker, loadYmap, YandexCollection } from 'vue-yandex-maps';
import { useHead } from '@vueuse/head'
import { transliterate } from 'transliteration';
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import CardMap from '@/components/card-est-map.vue'

export default {
    components: {
        YandexMap,
        YandexMarker,
        breadcrumbs,
        YandexCollection,
        CardMap,
    },
    data() {
        return {
            filterTerm: "",
            filteredNearb: [],
            searchTerm: "",
            cardProps: {},
            controls: [],
            markerIcon: {
                iconLayout: 'default#image',
                iconImageHref: 'https://cdn.discordapp.com/attachments/1082336765232296030/1121919194129252473/map-marker.png',
                iconImageSize: [50, 50],
            },
            settings: {
                apiKey: process.env.VUE_APP_YANDEX,
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1'
            },
            mapCenter: [43.25654, 76.92848],
            mapZoom: 11,
            userLocation: [43.25654, 76.92848],
            userCity: 'None',
            cityNearb: [],
            cityNone: false,
            institutionType: [],
            filterInstType: []
        }
    },
    setup() {
        useHead({
            link: [{
                rel: 'stylesheet',
                href: '/static/css/single.css'
            }],

        })
    },
    mounted() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.userLocation = [position.coords.latitude, position.coords.longitude];
                this.mapCenter = [position.coords.latitude, position.coords.longitude];
                this.checkCity(this.userLocation);
            },
            error => {
                console.error(error);
            }
        );
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
            })
    },
    watch: {
        searchTerm(newSearchTerm) {
            this.filterTerm = ""
            if (this.cityNearb?.length < 1)
                return
            if (newSearchTerm.length > 0) {
                this.filteredNearb = this.cityNearb.filter(item => {
                    const address = item.adress.toLowerCase();
                    const searchTerm = newSearchTerm.toLowerCase();
                    return address.includes(searchTerm);
                });
            } else {
                this.filteredNearb = this.cityNearb
            }
        }
    },
    methods: {
        selectedType(e, slug = "Все") {
            this.filterTerm = e.target.textContent;
            if (e.target.textContent.trim() === "Все") {
                this.filteredNearb = this.cityNearb
            } else {
                this.searchTerm = ""
                this.filteredNearb = []
                this.cityNearb.forEach(item => {
                    if (item.type === slug)
                        this.filteredNearb.push(item)
                })
            }
            const popup = document.querySelector(".filter-nearby-popup")
            popup.classList.remove("filter-nearby-popup-active")
        },
        popupHandlerNearby() {
            this.filterInstType = []
            this.filteredNearb.forEach(inst => {
                this.institutionType.forEach(type => {
                    if (type.slug === inst.type && !this.filterInstType.includes(type))
                        this.filterInstType.push(type)
                })
            })
            const popup = document.querySelector(".filter-nearby-popup");
            popup.classList.toggle("filter-nearby-popup-active")
        },
        searchHandler(e) {
            e.preventDefault();
        },
        cardClick(data) {
            const markerId = data.id
            const markers = this.$refs.markers;
            const marker = markers.find((m) => m.properties.get('markerId') === markerId);
            if (marker) {
                marker.balloon.open();
            }
        },
        async checkCity(coordinates) {
            let requestOptions = {
                method: 'GET',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }
            const city = await this.reGeoCode(coordinates)
            if (city.length > 0) {
                const params = `filter={${'city:"' + transliterate(city.toLowerCase()) + '"'}}`;
                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/musatos/archive?${params}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result && result.length > 0) {
                            this.cityNone = false
                            result.forEach(item => {
                                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/musatos/single?filter={slug:"${item.slug}"}`, requestOptions)
                                    .then(response => response.json())
                                    .then(result => {
                                        if (result.longitude !== null && result.latitude !== null) {
                                            this.cityNearb.push(result)
                                            this.filteredNearb.push(result)
                                        }
                                    })
                            })
                        }
                        else {
                            this.cityNone = true
                        }
                    })
            } else {
                this.cityNone = true
            }
        },
        async reGeoCode(coordinates) {
            const res = await loadYmap(this.settings).then(() => {
                const ymaps = window.ymaps;
                const res = ymaps.geocode(coordinates).then(function (res) {
                    return res;
                });
                return res;
            });
            const obj = res.geoObjects.get(0);
            let userCity = "";
            if (obj) {
                const city = obj.getLocalities()[0];
                this.userCity = city;
                userCity = city
            }
            return userCity
        }
    }
}

</script>