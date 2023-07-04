<template>
    <div>
        <header>
            <div class="header">
                <router-link :to="selectedCity.path ? selectedCity.path : '/'" class="header__logo">
                    <svg width="142" height="38" viewBox="0 0 142 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M48 25.768V12.232H50.5734L54.7576 18.6326L58.9418 12.232H61.5151V25.768H59.0989V16.0608L54.7576 22.442H54.679L50.3769 16.0994V25.768H48Z"
                            fill="#242424" />
                        <path
                            d="M70.2993 25.9807C68.4789 25.9807 67.0449 25.4715 65.9972 24.453C64.9626 23.4346 64.4453 21.9586 64.4453 20.0249V12.232H66.8615V19.9282C66.8615 21.1657 67.1693 22.1197 67.7848 22.7901C68.4003 23.4604 69.2516 23.7956 70.3385 23.7956C71.4255 23.7956 72.2702 23.4733 72.8726 22.8287C73.4881 22.1842 73.7959 21.2495 73.7959 20.0249V12.232H76.2121V19.9088C76.2121 21.8812 75.6883 23.3895 74.6406 24.4337C73.5929 25.465 72.1458 25.9807 70.2993 25.9807Z"
                            fill="#242424" />
                        <path
                            d="M83.9487 25.9613C81.7616 25.9613 79.8496 25.2394 78.2126 23.7956L79.6663 22.0939C81.0413 23.267 82.4885 23.8536 84.0076 23.8536C84.7541 23.8536 85.3434 23.6989 85.7756 23.3895C86.2208 23.0672 86.4435 22.6418 86.4435 22.1133C86.4435 21.6105 86.2339 21.2109 85.8149 20.9144C85.3958 20.605 84.5707 20.3085 83.3397 20.0249C81.742 19.651 80.5764 19.1805 79.8431 18.6133C79.1228 18.0331 78.7626 17.1501 78.7626 15.9641C78.7626 14.8039 79.2013 13.8628 80.0788 13.1409C80.9562 12.4061 82.0825 12.0387 83.4576 12.0387C85.3434 12.0387 87.0066 12.6059 88.4472 13.7403L87.1507 15.5387C85.8803 14.6105 84.6362 14.1464 83.4183 14.1464C82.7242 14.1464 82.1742 14.3011 81.7682 14.6105C81.3753 14.9199 81.1789 15.3131 81.1789 15.7901C81.1789 16.3186 81.3949 16.7311 81.8271 17.0276C82.2724 17.3112 83.1433 17.6077 84.4398 17.9171C85.9589 18.2781 87.0721 18.7615 87.7793 19.3674C88.4995 19.9733 88.8597 20.8241 88.8597 21.9199C88.8597 23.1704 88.4079 24.1565 87.5042 24.8785C86.6006 25.6004 85.4154 25.9613 83.9487 25.9613Z"
                            fill="#242424" />
                        <path
                            d="M89.8419 25.768L95.8923 12.1354H98.1317L104.182 25.768H101.628L100.234 22.5H93.7314L92.317 25.768H89.8419ZM94.6154 20.3923H99.3496L96.9727 14.9779L94.6154 20.3923Z"
                            fill="#242424" />
                        <path d="M107.761 25.768V14.4365H103.4V12.232H114.558V14.4365H110.197V25.768H107.761Z"
                            fill="#242424" />
                        <path
                            d="M127.707 23.9503C126.345 25.3168 124.623 26 122.54 26C120.458 26 118.743 25.3232 117.394 23.9696C116.045 22.616 115.37 20.9595 115.37 19C115.37 17.0663 116.051 15.4162 117.413 14.0497C118.775 12.6832 120.497 12 122.58 12C124.662 12 126.378 12.6768 127.726 14.0304C129.075 15.384 129.75 17.0405 129.75 19C129.75 20.9337 129.069 22.5838 127.707 23.9503ZM119.221 22.4227C120.111 23.3508 121.231 23.8149 122.58 23.8149C123.929 23.8149 125.035 23.3508 125.9 22.4227C126.777 21.4945 127.216 20.3536 127.216 19C127.216 17.6593 126.77 16.5249 125.88 15.5967C125.002 14.6556 123.889 14.1851 122.54 14.1851C121.191 14.1851 120.078 14.6492 119.201 15.5773C118.337 16.5055 117.904 17.6464 117.904 19C117.904 20.3407 118.343 21.4816 119.221 22.4227Z"
                            fill="#242424" />
                        <path
                            d="M137.089 25.9613C134.902 25.9613 132.99 25.2394 131.353 23.7956L132.807 22.0939C134.182 23.267 135.629 23.8536 137.148 23.8536C137.894 23.8536 138.484 23.6989 138.916 23.3895C139.361 23.0672 139.584 22.6418 139.584 22.1133C139.584 21.6105 139.374 21.2109 138.955 20.9144C138.536 20.605 137.711 20.3085 136.48 20.0249C134.882 19.651 133.717 19.1805 132.983 18.6133C132.263 18.0331 131.903 17.1501 131.903 15.9641C131.903 14.8039 132.342 13.8628 133.219 13.1409C134.097 12.4061 135.223 12.0387 136.598 12.0387C138.484 12.0387 140.147 12.6059 141.587 13.7403L140.291 15.5387C139.021 14.6105 137.777 14.1464 136.559 14.1464C135.864 14.1464 135.314 14.3011 134.908 14.6105C134.516 14.9199 134.319 15.3131 134.319 15.7901C134.319 16.3186 134.535 16.7311 134.967 17.0276C135.413 17.3112 136.284 17.6077 137.58 17.9171C139.099 18.2781 140.212 18.7615 140.92 19.3674C141.64 19.9733 142 20.8241 142 21.9199C142 23.1704 141.548 24.1565 140.645 24.8785C139.741 25.6004 138.556 25.9613 137.089 25.9613Z"
                            fill="#242424" />
                        <path
                            d="M18.9808 2.71484C19.2524 2.71484 26.038 2.98627 28.2094 4.88627C30.3808 6.78627 30.3808 9.50056 30.3808 9.50056V16.5577C30.3808 16.7775 30.5143 17.0863 30.6732 17.376C31.8367 17.0462 32.9897 16.6663 34.1288 16.2362C34.9702 15.9185 35.9099 16.3431 36.2276 17.1846C36.5453 18.026 36.1207 18.9657 35.2793 19.2834C30.0287 21.2658 24.5054 22.2577 18.9808 22.2577C13.4563 22.2577 7.933 21.2658 2.68244 19.2834C1.84098 18.9657 1.41638 18.0261 1.73408 17.1846C2.05178 16.3431 2.99145 15.9186 3.83291 16.2362C4.97203 16.6663 6.12495 17.0462 7.28848 17.376C7.44736 17.0863 7.58084 16.7775 7.58084 16.5577V9.50058C7.58084 9.50058 7.58084 6.78629 9.75227 4.88629C11.9237 2.98629 18.7093 2.71484 18.9808 2.71484Z"
                            fill="#242424" />
                        <path
                            d="M18.8342 29.8577C21.277 27.4147 23.6168 27.8088 26.4342 29.8578C29.4199 32.0293 30.933 31.6098 31.5913 31.2148C32.9485 30.4006 32.1342 29.3148 30.777 29.8577C30.777 29.8577 29.9627 30.1291 29.9627 29.5862C29.9193 29.2217 32.4056 26.6006 34.3056 30.1291C34.8485 31.7577 33.4913 35.5577 25.6199 35.2863C22.3627 35.174 19.377 33.3865 18.8342 32.0293C18.2913 33.3865 15.3056 35.174 12.0485 35.2863C4.17702 35.5577 2.81988 31.7577 3.36274 30.1291C5.26274 26.6006 7.74908 29.2217 7.70559 29.5863C7.70559 30.1291 6.89131 29.8577 6.89131 29.8577C5.53417 29.3148 4.71988 30.4006 6.07702 31.2149C6.73533 31.6099 8.24845 32.0293 11.2342 29.8578C14.0515 27.8088 16.3913 27.4147 18.8342 29.8577Z"
                            fill="#242424" />
                    </svg>
                </router-link>
                <form method="post" class="header__city">
                    <div class="form__select">
                        <span class="label noselect ani" tabindex="1">
                            {{ selectedCity.name ? selectedCity.name : "Главная" }}
                        </span>
                        <div class="selectOptions ani">
                            <label class="selectOption" v-for="item in siteСity" :key="item.slug">
                                <input type="radio" name="siteСity" :value="item.slug">
                                <span class="ani" v-html="item.name"></span>
                            </label>
                        </div>
                    </div>
                </form>

                <div class="header__search">
                    <button @click="searchClickHandler($event)" type="submit">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3ZM9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z"
                                fill="#BDBDBD" />
                        </svg>
                    </button>
                    <input v-on:keydown.enter="searchClickHandler($event)" type="text" name="search" v-model="searchTerm" placeholder="Введите: Тип заведения, Вид кухни, Название блюда">
                    <button @click="filterHandlerActivated()" class="header-filter-btn" type="button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z"
                                fill="white" />
                        </svg>
                    </button>
                </div>

                <div class="header__contact-wrapp">
                    <ul class="header__contacts ani">
                        <li>Связаться с нами</li>
                        <li>
                            <a href="tel:+77474852145">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 11.625C14.1 11.625 13.125 11.475 12.3 11.175C12.225 11.175 12.15 11.175 12.075 11.175C11.85 11.175 11.7 11.25 11.55 11.4L9.9 13.05C7.8 11.925 6 10.2 4.95 8.1L6.6 6.45C6.825 6.225 6.9 5.925 6.75 5.7C6.525 4.875 6.375 3.9 6.375 3C6.375 2.625 6 2.25 5.625 2.25H3C2.625 2.25 2.25 2.625 2.25 3C2.25 10.05 7.95 15.75 15 15.75C15.375 15.75 15.75 15.375 15.75 15V12.375C15.75 12 15.375 11.625 15 11.625ZM3.75 3.75H4.875C4.95 4.425 5.1 5.1 5.25 5.7L4.35 6.6C4.05 5.7 3.825 4.725 3.75 3.75ZM14.25 14.25C13.275 14.175 12.3 13.95 11.4 13.65L12.3 12.75C12.9 12.9 13.575 13.05 14.25 13.05V14.25Z"
                                        fill="black" />
                                </svg>
                                +7 747 485 2145
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/77474852145" target="_blank">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.02667 1.33398C4.38667 1.33398 1.42 4.30065 1.42 7.94065C1.42 9.10732 1.72667 10.2407 2.3 11.2407L1.36667 14.6673L4.86667 13.7473C5.83333 14.274 6.92 14.554 8.02667 14.554C11.6667 14.554 14.6333 11.5873 14.6333 7.94732C14.6333 6.18065 13.9467 4.52065 12.7 3.27398C11.4533 2.02065 9.79333 1.33398 8.02667 1.33398ZM8.03333 2.44732C9.5 2.44732 10.8733 3.02065 11.9133 4.06065C12.9467 5.10065 13.52 6.48065 13.52 7.94732C13.52 10.974 11.0533 13.434 8.02667 13.434C7.04 13.434 6.07334 13.174 5.23334 12.6673L5.03334 12.554L2.95334 13.1006L3.50667 11.074L3.37334 10.8607C2.82667 10.0007 2.53334 8.98065 2.53334 7.94065C2.54 4.91398 5 2.44732 8.03333 2.44732ZM5.68667 4.88732C5.58 4.88732 5.4 4.92732 5.24667 5.09398C5.1 5.26065 4.66667 5.66732 4.66667 6.47398C4.66667 7.28732 5.26 8.06732 5.33333 8.18065C5.42667 8.29398 6.50667 9.96065 8.16667 10.6673C8.56 10.8473 8.86667 10.9473 9.10667 11.0207C9.5 11.1473 9.86 11.1273 10.1467 11.0873C10.4667 11.0407 11.12 10.6873 11.26 10.3007C11.4 9.91398 11.4 9.58732 11.36 9.51398C11.3133 9.44732 11.2067 9.40732 11.04 9.33398C10.8733 9.24065 10.06 8.84065 9.91333 8.78732C9.76 8.73398 9.66667 8.70732 9.54 8.86732C9.43334 9.03398 9.11333 9.40732 9.02 9.51398C8.92 9.62732 8.82667 9.64065 8.66667 9.56065C8.49333 9.47398 7.96 9.30065 7.33333 8.74065C6.84 8.30065 6.51333 7.76065 6.41333 7.59398C6.33333 7.43398 6.40667 7.33398 6.48667 7.26065C6.56 7.18732 6.66667 7.06732 6.73334 6.96732C6.82 6.87398 6.84667 6.80065 6.9 6.69398C6.95334 6.58065 6.92667 6.48732 6.88667 6.40732C6.84667 6.33398 6.51334 5.50732 6.37334 5.18065C6.24 4.86065 6.10667 4.90065 6 4.89398C5.90667 4.89398 5.8 4.88732 5.68667 4.88732Z"
                                        fill="black" />
                                </svg>
                                Whatsapp
                            </a>
                        </li>
                        <li @click="contactFormHandler()">
                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.6667 1.99935C13.6667 1.26602 13.0667 0.666016 12.3333 0.666016H1.66668C0.933343 0.666016 0.333344 1.26602 0.333344 1.99935V9.99935C0.333344 10.7327 0.933343 11.3327 1.66668 11.3327H12.3333C13.0667 11.3327 13.6667 10.7327 13.6667 9.99935V1.99935ZM12.3333 1.99935L7.00001 5.33268L1.66668 1.99935H12.3333ZM12.3333 9.99935H1.66668V3.33268L7.00001 6.66602L12.3333 3.33268V9.99935Z"
                                    fill="black" />
                            </svg>
                            Email
                        </li>
                    </ul>
                </div>

                <extraAuth v-if="loggedIn" />
                <extra v-else />

                <button type="button" class="header__menu js-nav">
                    <span></span>
                    <span></span>
                    <span class="ani"></span>
                </button>

            </div>
            <filterTypes v-if="flagFilterTypes" :types="types" />
        </header>

        <nav class="header__nav ani">
            <div class="header__navTop">
                <extraAuth v-if="loggedIn" />
                <extra v-else />

                <button type="button" class="header__menu js-nav">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.825 9L17.75 15.925V17.75H15.925L9 10.825L2.075 17.75H0.25V15.925L7.175 9L0.25 2.075V0.25H2.075L9 7.175L15.925 0.25H17.75V2.075L10.825 9Z"
                            fill="white" />
                    </svg>
                </button>
            </div>

            <navAuth v-if="loggedIn" />
            <headNav v-else />
        </nav>
    </div>
    <headerFilter />
    <formMail />
</template>

<script>
import headNav from '@/components/header/appNav.vue'
import navAuth from '@/components/header/navAuth.vue'
import extra from '@/components/header/appExtra.vue'
import extraAuth from '@/components/header/extraAuth.vue'
import filterTypes from "@/components/app-filterTypes.vue"
import headerFilter from "@/components/popup/popup-header-filter.vue"
import formMail from "@/components/popup/popup-form-mail.vue"

export default {
    components: {
        headNav,
        navAuth,
        extra,
        extraAuth,
        filterTypes,
        headerFilter,
        formMail
    },
    data() {
        return {
            flagFilterTypes: false,
            siteСity: [],
            mobHidden: true,
            selectedCity: {},
            searchTerm:''
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        },
        types() {
            return this.$store.state.utils.types;
        }
    },
    async mounted() {

        const observer = new MutationObserver(() => {
            const flagEl = document.querySelector('.vstk-flag-for-menu');
            if (flagEl !== null) {
                this.flagFilterTypes = true;
            } else {
                this.flagFilterTypes = false;
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        const city = localStorage.getItem("cityName")
        if (city) {
            this.selectedCity = {
                name: city,
                path: localStorage.getItem("cityPath")
            }
        }

        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }

        if (this.$route.path.length > 1) {
            await this.fetchSelectedCity(requestOptions)
        }
    },
    watch: {
        '$route': async function (newValue) {
            const city = localStorage.getItem("cityName")
            if (this.$route.path === "/" && this.$route.name === "home" && city)
                this.$router.replace(localStorage.getItem("cityPath"))
            if (newValue.path.length > 1) {
                let requestOptions = {
                    method: 'GET',
                    headers: {
                        'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow'
                }
                await this.fetchSelectedCity(requestOptions)
            }
        }
    },
    methods: {
        searchClickHandler(e){
            e.preventDefault()
            this.$store.dispatch('utils/setSearchTerm', this.searchTerm);
        },
        contactFormHandler() {
            document.body.classList.add("lock")
            const popup = document.querySelector(".popup-form-mail")
            if (popup)
                popup.classList.add("active")
        },
        filterHandlerActivated() {
            document.body.classList.add("lock")
            document.querySelector(".header-filter-container").classList.add("active")
        },
        async fetchSelectedCity(requestOptions) {
            await fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/breadcrumbs?way=' + this.$route.path, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.selectedCity = result[0]
                    if (result[0].name !== "Главная") {
                        localStorage.setItem("cityName", result[0].name)
                        localStorage.setItem("cityPath", result[0].path)
                    }
                    const city = localStorage.getItem("cityName")
                    if (result[0].name === "Главная" && city) {
                        if (city)
                            this.selectedCity = {
                                name: city,
                                path: localStorage.getItem("cityPath")
                            }
                    }
                })
        },
        checkSelectedCity() {
            if (this.selectedCity.name !== 'undefined') {
                this.selectedCity = { name: 'Алматы', path: '/almaty' };
                this.$router.replace('/almaty')
            }
        }
    },
    beforeMount() {
        const user = JSON.parse(localStorage.getItem("user"))
        let request = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        if (user) {
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/users/${user.id}`, request)
                .then(response => response.json())
        }
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/cities', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.siteСity = result
            })
    }
}
</script>
