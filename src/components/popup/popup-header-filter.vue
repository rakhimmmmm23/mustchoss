<template>
    <div class="header-filter-container">
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
</template>

<script>
import { VRangeSlider } from 'vuetify/lib/components/VRangeSlider'
import { VContainer } from 'vuetify/lib/components/VGrid'

export default {
    components: {
        VRangeSlider,
        VContainer
    },
    data() {
        return {
            institutionType: [],
            kitchenType: [],
            filterList: [],
            checkValue: [0, 100],
            costValue: [0, 100],
            filterTypes: []
        }
    },
    beforeMount(){
        const newData=[];
        this.$store.dispatch('utils/setFilteredArchive', newData);
    },
    methods: {
        filterClickHandler() {
            const newData=[...this.filterTypes, { checkValue: this.checkValue, costValue: this.costValue }]
            this.$store.dispatch('utils/setFilteredArchive', newData);
            document.body.classList.remove('lock');
            document.querySelector('.active').classList.remove('active')
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
    },
    async mounted() {
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        await fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/institutionType', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.institutionType = result
            })
        await fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/kitchenType', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.kitchenType = result
            })
    }
}
</script>