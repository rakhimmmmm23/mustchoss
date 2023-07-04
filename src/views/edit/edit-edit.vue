<template>
    <div class="contentHeader">
        <h2>Редактирование страницы</h2>
    </div>
    <!-- <div class="thumbs custom-thumbs-section" v-if="thumbs != null">
        <img v-for="thumb in thumbs" :key="thumb.id" :src="thumb?.slider" alt="thumb">
    </div> -->
    <form method="post" class="edit" id="edit" enctype="multipart/form-data" @submit.prevent="handleSave"
        v-if="is_data_fetched">
        <div class="form__row thumbs__row">
            <template v-for="img in thumbs" :key="img.id">
                <label class="form__img withIMG" :style="{ backgroundImage: 'url(' + img.mini + ')' }">
                    <input accept="image/*" type="file" name="thumbs" @change="changeFile" multiple="false" disabled>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.43906 14.0627V10.9237H6.26953V9.82655H9.43906V6.6875H10.5667V9.82655H13.7362V10.9237H10.5667V14.0627H9.43906Z"
                            fill="#242424" />
                        <circle cx="10" cy="10.5" r="9.5" stroke="#242424" />
                    </svg>
                    <span class="label">Добавить<br>фото</span>
                    <button type="button" class="js-deleteIMG" :data-img="img.id" v-on:click="deleteIMG(img.id)">
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.0348144 7.27568L2.99434 4.31616L0.00608075 1.3279L1.04048 0.293507L4.02873 3.28176L6.98826 0.32224L8.05139 1.38537L5.09186 4.34489L8.08012 7.33315L7.04572 8.36754L4.05747 5.37929L1.09794 8.33881L0.0348144 7.27568Z"
                                fill="white" />
                        </svg>
                    </button>
                </label>
            </template>

            <template v-for="index in emptyThumb()" :key="index">
                <label class="form__img">
                    <input accept="image/*" type="file" name="thumbs" @change="changeFile" multiple="false">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.43906 14.0627V10.9237H6.26953V9.82655H9.43906V6.6875H10.5667V9.82655H13.7362V10.9237H10.5667V14.0627H9.43906Z"
                            fill="#242424" />
                        <circle cx="10" cy="10.5" r="9.5" stroke="#242424" />
                    </svg>
                    <span class="label">Добавить<br>фото</span>
                    <button type="button" class="js-deleteIMG">
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.0348144 7.27568L2.99434 4.31616L0.00608075 1.3279L1.04048 0.293507L4.02873 3.28176L6.98826 0.32224L8.05139 1.38537L5.09186 4.34489L8.08012 7.33315L7.04572 8.36754L4.05747 5.37929L1.09794 8.33881L0.0348144 7.27568Z"
                                fill="white" />
                        </svg>
                    </button>
                </label>
            </template>
        </div>

        <h3 class="form__row">О заведении</h3>

        <div class="form__row form__row__2">
            <label class="form__input" :class="{ filled: isFilled(formData.name) }">
                <input type="text" name="name" v-model="formData.name" required>
                <span class="label">Название заведения</span>
            </label>

            <div class="form__select">
                <span v-if="type === null" class="label noselect ani" tabindex="1">Выбирете тип заведения</span>
                <span v-else class="label noselect ani" tabindex="1">{{ edit.type.name }}</span>
                <div class="selectOptions ani">
                    <label v-for="item in types" :key="item._id" class="selectOption">
                        <input type="radio" name="type" v-model="formData.type" :value="item.slug">
                        <span class="ani">{{ item.name }}</span>
                    </label>
                </div>
            </div>
        </div>

        <h3 class="form__row">Контакты</h3>

        <div class="form__row form__row__2 form__row__many">
            <label v-for="(tel, index) in formData.phone" :key="index" class="form__input form__phone"
                :class="{ filled: isFilled(tel.value) }">
                <input type="tel" name="phone" v-maska data-maska="+7 (###)-###-##-##" v-model="tel.value" placeholder="+7">
                <span class="label">Телефон</span>
            </label>

            <label class="form__input form__btn">
                <button type="button" class="novoe__addPhone" v-on:click="addPhone()">
                    Добавить Телефон
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.3269 16.2741V12.5073H7.52344V11.1907H11.3269V7.42383H12.68V11.1907H16.4834V12.5073H12.68V16.2741H11.3269Z"
                            fill="#BDBDBD" />
                        <circle cx="12" cy="12" r="11.5" stroke="#BDBDBD" />
                    </svg>
                </button>
            </label>
        </div>

        <label class="form__input form__row" :class="{ filled: isFilled(formData.email) }">
            <input type="email" name="email" v-model="formData.email">
            <span class="label">Электронная почта</span>
        </label>

        <h3 class="form__row">Адрес</h3>

        <div class="form__row form__row__2">
            <div class="form__select">
                <span v-if="formData.city === null" class="label noselect ani" tabindex="1">Алматы</span>
                <span v-else class="label noselect ani" tabindex="1">{{ edit.city.name }}</span>
                <div class="selectOptions ani">
                    <label v-for="city in cities" :key="city._id" class="selectOption"
                        v-on:click="selectedCity(city._id, city.name)">
                        <input type="radio" name="city" v-model="formData.city" :value="city.slug">
                        <span class="ani">{{ city.name }}</span>
                    </label>
                </div>
            </div>
        </div>

        <label class="form__input form__row" :class="{ filled: isFilled(formData.adress) }">
            <input type="text" name="adress" id="adressYM" v-model="formData.adress" @focus="getCityName">
            <span class="label">Адрес</span>
            <button type="button" class="adressAdd" v-on:click="geocode()"
                :disabled="formData.adress === null || formData.adress === ''">
                Поставить метку
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.9987 4.83398C8.44073 4.83398 8.86465 5.00958 9.17721 5.32214C9.48977 5.6347 9.66536 6.05862 9.66536 6.50065C9.66536 6.71952 9.62226 6.93625 9.5385 7.13846C9.45474 7.34067 9.33197 7.5244 9.17721 7.67916C9.02245 7.83393 8.83871 7.95669 8.6365 8.04045C8.43429 8.12421 8.21757 8.16732 7.9987 8.16732C7.55667 8.16732 7.13275 7.99172 6.82019 7.67916C6.50763 7.3666 6.33203 6.94268 6.33203 6.50065C6.33203 6.05862 6.50763 5.6347 6.82019 5.32214C7.13275 5.00958 7.55667 4.83398 7.9987 4.83398ZM7.9987 1.83398C9.23637 1.83398 10.4234 2.32565 11.2985 3.20082C12.1737 4.07599 12.6654 5.26297 12.6654 6.50065C12.6654 10.0007 7.9987 15.1673 7.9987 15.1673C7.9987 15.1673 3.33203 10.0007 3.33203 6.50065C3.33203 5.26297 3.8237 4.07599 4.69887 3.20082C5.57404 2.32565 6.76102 1.83398 7.9987 1.83398ZM7.9987 3.16732C7.11464 3.16732 6.2668 3.51851 5.64168 4.14363C5.01655 4.76875 4.66536 5.6166 4.66536 6.50065C4.66536 7.16732 4.66536 8.50065 7.9987 12.974C11.332 8.50065 11.332 7.16732 11.332 6.50065C11.332 5.6166 10.9808 4.76875 10.3557 4.14363C9.7306 3.51851 8.88275 3.16732 7.9987 3.16732Z"
                        fill="white" />
                </svg>
            </button>
        </label>

        <div class="formMap form__row" id="ymap">
            <YandexMap :settings="ymap.settings" :coordinates="ymap.center" @click="onMapClick" :zoom="ymap.zoom"
                :controls="ymap.controls">
                <YandexMarker :coordinates="ymap.coordinates" :marker-id="edit.id" :icon="ymap.markerIcon"></YandexMarker>
            </YandexMap>
        </div>

        <h3 class="form__row">График работы</h3>

        <div class="form__row form__row__vstk">
            <div v-for="key in Object.keys(daysOfWeek)" :key="key" class="daysOfWeek_vstk">
                <p>{{ key }}:</p>
                <div class="timesWorks_vstk_edit">
                    <div class="form__select">
                        <span class="label noselect ani" tabindex="1">
                            {{ daysOfWeek[key].type ? daysOfWeek[key].type : "Выберите день" }}</span>
                        <div class="selectOptions ani">
                            <label v-for="typeDay in dayTypes" :key="typeDay" class="selectOption">
                                <input type="radio" name="type" v-model="daysOfWeek[key].type" :value="typeDay">
                                <span class="ani">{{ typeDay }}</span>
                            </label>
                        </div>
                    </div>
                    <div v-if="daysOfWeek[key].type === 'Рабочий день'" class="inputs-timeWorks-vstk-edit">
                        <input type="text" autocomplete="no" name="type" v-model="daysOfWeek[key].start">:
                        <input type="text" autocomplete="no" name="type" v-model="daysOfWeek[key].end">
                    </div>
                </div>
            </div>
        </div>


        <h3 class="form__row">Способ оплаты</h3>

        <div class="form__row form__row__5">
            <label v-for="pay in payments" :key="pay._id" class="form__checkbox">
                <input type="checkbox" name="extra" v-model="formData.payments" :value="pay.slug">
                <span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.24994 11.9107L1.62744 8.2882L3.27827 6.63737L5.24994 8.61487L11.0133 2.8457L12.6641 4.49654L5.24994 11.9107Z"
                            fill="white"></path>
                    </svg>
                </span>
                {{ pay.name }}
            </label>
        </div>

        <h3 class="form__row">Вид кухни</h3>

        <div class="form__row form__row__5 form__row__many" v-if="kitchen != [] || kitchen != null">
            <label v-for="ktype in kitchen" :key="ktype._id" class="form__checkbox">
                <input type="checkbox" name="extra" v-model="formData.kitchen" :value="ktype.slug">
                <span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.24994 11.9107L1.62744 8.2882L3.27827 6.63737L5.24994 8.61487L11.0133 2.8457L12.6641 4.49654L5.24994 11.9107Z"
                            fill="white"></path>
                    </svg>
                </span>
                {{ ktype.name }}
            </label>
        </div>

        <h3 class="form__row">Детали</h3>

        <div class="form__row form__row__2">
            <label class="form__input" :class="{ filled: isFilled(formData.averageCheck) }">
                <input type="text" name="averageCheck" v-maska data-maska="999#" data-maska-tokens="9:[0-9]:repeated"
                    data-maska-reversed v-model="formData.averageCheck">
                <span class="label">Средний чек</span>
            </label>

            <label class="form__input" :class="{ filled: isFilled(formData.depositAmount) }">
                <input type="text" name="depositAmount" v-maska data-maska="999#" data-maska-tokens="9:[0-9]:repeated"
                    data-maska-reversed v-model="formData.depositAmount">
                <span class="label">Сумма депозита</span>
            </label>
        </div>

        <div class="form__row form__row__2 form__row__many">
            <label v-for="det in details" :key="det._id" class="form__checkbox">
                <input type="checkbox" name="extra" v-model="formData.details" :value="det.slug">
                <span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.24994 11.9107L1.62744 8.2882L3.27827 6.63737L5.24994 8.61487L11.0133 2.8457L12.6641 4.49654L5.24994 11.9107Z"
                            fill="white"></path>
                    </svg>
                </span>
                {{ det.name }}
            </label>
        </div>

        <h3 class="form__row">Описание</h3>

        <label class="form__textarea form__row" :class="{ filled: isFilled(formData.description) }">
            <textarea name="description" v-model="formData.description"></textarea>
            <span class="label">Краткий гайд по описанию</span>
        </label>
        <h3 class="form__row seo-new_title">SEO</h3>

        <div class="form__row form__row__2 form__row__many">
            <label class="form__input form__phone" :class="{ filled: isFilled(formData.estbSlug) }">
                <input type="text" name="estbSlug" v-model="estbSlug">
                <span class="label">URL</span>
            </label>
            <label class="form__input form__phone" :class="{ filled: isFilled(formData.metaTitle) }">
                <input type="text" name="metaTitle" v-model="formData.metaTitle">
                <span class="label">Title</span>
            </label>
            <label class="form__input form__phone" :class="{ filled: isFilled(formData.metaDescription) }">
                <input type="text" name="metaDescription" v-model="formData.metaDescription">
                <span class="label">Description</span>
            </label>
            <label class="form__input form__phone" :class="{ filled: isFilled(formData.metaKeywords) }">
                <input type="text" name="metaKeywords" v-model="formData.metaKeywords">
                <span class="label">Keywords</span>
            </label>
            <label class="form__input form__phone" :class="{ filled: isFilled(formData.h1) }">
                <input type="text" name="seo" v-model="formData.h1">
                <span class="label">H1</span>
            </label>

        </div>
        <button type="submit" class="novoeSubmit">Сохранить</button>
    </form>


    <popupSave />
</template>

<script>
import { useHead } from '@vueuse/head'
import { YandexMap, YandexMarker, loadYmap } from 'vue-yandex-maps'
import { isEmpty, isFilled } from '@/helpers/helper.js'
import popup from '@/helpers/popup.js'
import { vMaska } from "maska"
import { constWorkingDate } from '@/utils/const'
import popupSave from "@/components/popup/popup-save-result.vue"

export default {
    directives: { maska: vMaska },
    components: {
        YandexMap,
        YandexMarker,
        popupSave
    },
    data() {
        return {
            edit: [],
            daysOfWeek: constWorkingDate,
            dayTypes: ['Рабочий день', 'Выходной'],
            type: [],
            cities: [],
            types: [],
            thumbs: [],
            details: [],
            payments: [],
            kitchen: [],
            phones: [],
            ymap: {
                settings: {
                    apiKey: process.env.VUE_APP_YANDEX,
                    lang: 'ru_RU',
                    coordorder: 'latlong',
                    version: '2.1'
                },
                zoom: 18,
                controls: [],
                markerIcon: {
                    layout: 'default#image',
                    imageHref: '/static/img/maps/placemark.png',
                    imageSize: [24, 34],
                },
                center: [],
                coordinates: [],
                adress: null,
                city: null
            },
            formData: {
                thumbs: [],
                name: null,
                type: null,
                phone: [],
                email: null,
                city: 'almaty',
                adress: null,
                longitude: null,
                latitude: null,
                averageCheck: null,
                depositAmount: null,
                details: [],
                description: null,
                payments: [],
                kitchen: [],
                h1:'',
                metaDescription:'',
                metaKeywords:'',
                metaTitle:''
            },
            is_data_fetched: false,
            estbSlug:'',
            seoID:''
        }
    },
    setup() {
        useHead({
            title: 'Редактирование страницы',
            script: [
                {
                    src: '/static/js/single.js',
                    tagPosition: 'bodyClose',
                    async: true
                },
            ],
        })
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/edit?filter={_id:"' + this.$route.params.id + '"}', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.edit = result
                this.thumbs = result.thumbs
                if (result.form__thumbs != null) {
                    this.formData.thumbs = result.form__thumbs
                }
                this.formData.name = result.name
                this.formData.type = result.type.slug
                if (result.workingHours)
                    this.daysOfWeek = result.workingHours
                if (!isEmpty(result.phone)) {
                    this.phones = JSON.parse(result.phone)
                    JSON.parse(result.phone).forEach(item => {
                        this.formData.phone.push({ value: item })
                    })
                } else {
                    this.formData.phone = [{ value: '' }]
                }

                this.formData.email = result.email
                this.formData.city = result.city.slug
                this.formData.adress = result.adress
                this.formData.longitude = result.longitude
                this.formData.latitude = result.latitude
                this.formData.averageCheck = result.averageCheck
                this.formData.depositAmount = result.depositAmount
                this.estbSlug=result.slug

                if (!isEmpty(result.payments)) {
                    result.payments.forEach(item => {
                        this.formData.payments.push(item.slug)
                    })
                }

                if (!isEmpty(result.kitchenType)) {
                    this.formData.kitchen = JSON.parse(result.kitchenType)
                    // result.kitchenType.forEach(item => {
                    //     this.formData.kitchen.push(item.slug)
                    // })
                }

                result.details.forEach(item => {
                    if (item.exist === 'Да') {
                        this.formData.details.push(item.slug)
                    }
                })
                if (!isEmpty(result.description)) {
                    this.formData.description = result.description.replace(/<br\s?\/?>/g, "\n")
                }

                if (result.longitude != null && result.latitude != null) {
                    this.ymap.center = [result.longitude, result.latitude]
                    this.ymap.coordinates = [result.longitude, result.latitude]
                } else {
                    this.ymap.center = [43.238293, 76.945465]
                    this.ymap.zoom = 12
                }

                if (result.city != null) {
                    this.ymap.city = result.city.name
                } else {
                    this.ymap.city = "Алматы"
                }
                this.is_data_fetched = true
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/seo?filter={establishmentID:"${this.$route.params.id}"}`, requestOptions)
            .then(response => response.json())
            .then(result2 => {
                this.formData.h1 = result2.h1
                this.formData.metaDescription = result2.metaDescription
                this.formData.metaKeywords = result2.metaKeywords
                this.formData.metaTitle = result2.metaTitle
                this.seoID=result2._id
            })
            })

        // this.phones.forEach(item => {
        //     this.formData.phone.push({ value: item })
        // })

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/cities', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.cities = result
            })

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/institutionType', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.types = result
            })

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/extra', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.details = result
            })

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/payment', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.payments = result
            })

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/kitchenType', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.kitchen = result
            })
    },
    methods: {
        async onMapClick(e) {
            const coordinates = e.get('coords');
            this.ymap.coordinates = coordinates;
            await this.reGeoCode()
        },
        async reGeoCode() {
            const coordinates = this.ymap.coordinates;
            const res = await loadYmap(this.ymap.settings)
                .then(() => {
                    const ymaps = window.ymaps;
                    const res = ymaps.geocode(coordinates).then(function (res) {
                        return res;
                    });
                    return res;
                });
            const obj = res.geoObjects.get(0);
            if (obj) {
                const address = obj.getAddressLine();
                this.formData.adress = address;
            }
        },
        emptyThumb() {
            let result
            if (this.thumbs != null) {
                result = this.thumbs.length
                result = 10 - result
            } else {
                result = 10
            }
            return result
        },
        handleSave() {
            let name = this.formData.name,
                type = this.formData.type,
                phone = this.formData.phone,
                email = this.formData.email,
                city = this.formData.city,
                adress = this.formData.adress,
                longitude = this.formData.longitude,
                latitude = this.formData.latitude,
                averageCheck = this.formData.averageCheck,
                depositAmount = this.formData.depositAmount,
                extra = this.formData.details,
                description = this.formData.description

            let h1 = this.formData.h1,
            metaDescription=this.formData.metaDescription,
            metaKeywords=this.formData.metaKeywords,
            metaTitle=this.formData.metaTitle

            let updateSEO = {
                establishmentID: this.$route.params.id,
            }
            updateSEO['h1']=h1
            updateSEO['metaDescription']=metaDescription
            updateSEO['metaKeywords']=metaKeywords
            updateSEO['metaTitle']=metaTitle


            let rawSEO = JSON.stringify({
                "data": updateSEO
            })
            let requestOptionsSEO = {
                method: 'POST',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: rawSEO,
                redirect: 'follow'
            }
            let requestOptionsSEOdel = {
                method: 'DELETE',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/seo/${this.seoID}`, requestOptionsSEOdel)
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/seo`, requestOptionsSEO)

            let slug=this.estbSlug
            slug=slug.replaceAll('/','');

            if(slug.length<1){
                slug=this.edit.slug
            }

            if (!isEmpty(description)) {
                description = description.replace(/\r?\n/g, '<br />')
            }

            let update = {
                _id: this.$route.params.id,
                slug: slug,
            }

            update['name'] = name
            update['type'] = type

            if (!isEmpty(phone)) {
                let telArray = []
                phone.forEach(item => {
                    if (!isEmpty(item.value)) {
                        telArray.push(item.value)
                    }
                })
                if (telArray.length != 0) {
                    update['phone'] = JSON.stringify(telArray)
                }
            }
            update['email'] = email
            if (!isEmpty(city)) {
                update['city'] = city
            }
            update['adress'] = adress
            update['longitude'] = longitude
            update['latitude'] = latitude
            update['averageCheck'] = averageCheck
            update['depositAmount'] = depositAmount
            update['details'] = JSON.stringify(extra)
            update['description'] = description
            update['thumbs'] = this.formData.thumbs
            update['payment'] = JSON.stringify(this.formData.payments)
            update['kitchenType'] = JSON.stringify(this.formData.kitchen)
            update['workingHours'] = this.daysOfWeek
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
                    document.body.classList.add("lock")
                    if (!isEmpty(result._id)) {
                        const popupSave = document.querySelector(".popup__editEstab-success ")
                        if (popupSave) popupSave.classList.add("active")
                    } else {
                        const popupSave = document.querySelector(".popup__editEstab-error ")
                        if (popupSave) popupSave.classList.add("active")
                    }
                })
                .catch(error => console.log('error', error))
        },
        isEmpty,
        isFilled,
        changeFile(e) {
            let formdata = new FormData(),
                file = e.target.files[0]
            formdata.append('files[]', file)

            // отправка файла
            let requestOptions = {
                method: 'POST',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN
                },
                body: formdata,
                redirect: 'follow'
            }

            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/assets/upload', requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log('result', result)
                    this.formData.thumbs = this.formData.thumbs.concat(result.assets)

                    let update = {
                        _id: this.$route.params.id,
                        slug: this.edit.slug,
                        thumbs: this.formData.thumbs
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
                        .then(
                            // обновляю страницу
                            this.$router.go()
                        )
                        .catch(error => console.log('error', error))
                })
                .catch(error => console.log('error', error))
        },
        deleteIMG(id) {
            let raw = JSON.stringify({
                "assets": [id]
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/assets/remove', requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.formData.thumbs = this.formData.thumbs.filter(function (elem) {
                        return elem._id !== result[0]._id;
                    })

                    let update = {
                        _id: this.$route.params.id,
                        slug: this.edit.slug,
                        thumbs: this.formData.thumbs,
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
                        .then()
                        // .then(result => {
                        //     console.log('result', result)
                        // })
                        .catch(error => console.log('error', error))
                })
                .catch(error => console.log('error', error))
        },
        async geocode() {
            let request = this.formData.adress
            let res = await loadYmap(this.ymap.settings)
                .then(() => {
                    let ymaps = window.ymaps
                    let res = ymaps.geocode(request).then(function (res) {
                        // console.log('geocode:', res)
                        return res
                    })
                    return res
                })
            let obj = res.geoObjects.get(0),
                error,
                hint
            if (obj) {
                switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
                    case 'exact':
                        break;
                    case 'number':
                    case 'near':
                    case 'range':
                        error = 'Неточный адрес, требуется уточнение';
                        hint = 'Уточните номер дома';
                        break;
                    case 'street':
                        error = 'Неполный адрес, требуется уточнение';
                        hint = 'Уточните номер дома';
                        break;
                    case 'other':
                    default:
                        error = 'Неточный адрес, требуется уточнение';
                        hint = 'Уточните адрес';
                }
            } else {
                error = 'Адрес не найден'
                hint = 'Уточните адрес'
            }

            if (error) {
                let result = {
                    "status": "error",
                    "message": {
                        "title": hint,
                        "text": error,
                        "data": null
                    }
                }
                popup(result)
            } else {
                let coordinates = res.geoObjects.get(0).geometry.getCoordinates()
                this.ymap.coordinates = coordinates
                this.ymap.center = coordinates
                this.ymap.zoom = 18
                this.formData.longitude = coordinates[0]
                this.formData.latitude = coordinates[1]
            }
        },
        addPhone() {
            this.formData.phone.push({ value: '' })
        },
        selectedCity(id, name) {
            this.formData.adress = name + ', '
            this.cities.forEach(item => {
                if (item._id === id) {
                    let lon = Number(item.longitude),
                        lat = Number(item.latitude)
                    this.ymap.center = [lon, lat]
                    this.ymap.city = item.name
                }
            })
        },
        getCityName() {
            if (this.formData.adress === '' || this.formData.adress === null) {
                // $('#adressYM').val(this.ymap.city + ', ').change()
                this.formData.adress = this.ymap.city + ', '
            }
        }
    }
}
</script>