<template>
    <main>
        <div class="container">
            <div class="row">
                <breadcrumbs :current='title' />
            </div>

            <div class="row">
                <div class="notice__header">
                    <h1>{{ title }}</h1>

                    <button type="button" @click="deleteAllNot" class="notice__clearAll">Очистить</button>
                </div>
            </div>

            <div class="row">
                <div class="notice__content">
                    <template v-for="letter in filteredLetters()" :key="letter._id">
                        <div class="noticeSection">
                            <div class="noticeSection__head">
                                <div class="noticeSection__head-icon"></div>
                                <h6>Рассылка</h6>
                                <time>{{ formattedDate(letter.date) }} <span>{{ formattedTime(letter.date) }}</span></time>
                                <button @click="deleteSingleNot(letter)" type="button">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.0013 2V2.66667H2.66797V4H3.33464V12.6667C3.33464 13.0203 3.47511 13.3594 3.72516 13.6095C3.97521 13.8595 4.31435 14 4.66797 14H11.3346C11.6883 14 12.0274 13.8595 12.2774 13.6095C12.5275 13.3594 12.668 13.0203 12.668 12.6667V4H13.3346V2.66667H10.0013V2H6.0013ZM4.66797 4H11.3346V12.6667H4.66797V4ZM6.0013 5.33333V11.3333H7.33464V5.33333H6.0013ZM8.66797 5.33333V11.3333H10.0013V5.33333H8.66797Z"
                                            fill="black" />
                                    </svg>
                                </button>
                            </div>
                            <p>{{ letter.message }}</p>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import moment from 'moment'
export default {
    components: {
        breadcrumbs
    },
    data() {
        return {
            title: 'Уведомления',
            userInfo: {},
            allLetters: [],
            deletedNotifications: {
                userID: '',
                notificationsDeleted: '',
            }
        }
    },

    setup() {
        useHead({
            title: 'Уведомления',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/notice.css'
            }],
        })
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/users/' + this.$store.state.auth.user.id, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.userInfo = result
                const favEstb = JSON.parse(result.favorites)
                if (result.role == 'user')
                    fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/usernotifications?filter={userID:"${this.$store.state.auth.user.id}"}`, requestOptions)
                        .then(response => response.json())
                        .then(result2 => {
                            this.deletedNotifications = result2;
                            favEstb.forEach(fav => {
                                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/notifications?filter={establishmentID:"${fav}"}`, requestOptions)
                                    .then(response => response.json())
                                    .then((result3) => {
                                        let res2 = ''
                                        try {
                                            res2 = JSON.parse(result2.notificationsDeleted)
                                        } catch (error) {
                                            this.allLetters = [...this.allLetters, ...result3]
                                        }

                                        if (res2 && Array.isArray(res2)) {
                                            const tmpLetter = result3.filter(obj => !res2.includes(obj._id));
                                            this.allLetters = [...this.allLetters, ...tmpLetter]
                                        }


                                    })
                            })

                        }).catch(() => {
                            let favEstb = ''
                            try {
                                favEstb = JSON.parse(this.userInfo.favorites)
                            } catch (error) {
                                favEstb = ''
                            }
                            if (favEstb !== null && favEstb !== '' && Array.isArray(favEstb))
                                favEstb.forEach(fav => {
                                    fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/notifications?filter={establishmentID:"${fav}"}`, requestOptions)
                                        .then(response => response.json())
                                        .then((result3) => {
                                            this.allLetters = [...this.allLetters, ...result3]
                                        })
                                })
                        })
            })

    },
    methods: {
        filteredLetters() {
            return this.allLetters.filter(letter => {
                return (this.userInfo.birthday && this.formattedDate(letter.date) === this.formattedDate(this.userInfo.birthday)) || letter.type === 'all'
            })
        },
        deleteAllNot() {
            let filteredLetters = this.filteredLetters()
            if (filteredLetters.length < 1)
                return
            let tmpLetter = []
            if (this.deletedNotifications.notificationsDeleted !== null && this.deletedNotifications.notificationsDeleted.length > 2) {
                let arr = JSON.parse(this.deletedNotifications.notificationsDeleted);
                tmpLetter = Array.isArray(arr) ? arr : []
            }
            filteredLetters.forEach(filterLet => {
                tmpLetter.push(filterLet._id)
            })
            this.deletedNotifications.notificationsDeleted = JSON.stringify(tmpLetter)
            this.deletedNotifications.userID = this.$store.state.auth.user.id

            let raw = JSON.stringify({
                "data": this.deletedNotifications
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/usernotifications`, requestOptions)
                .then(response => response.json())
                .then(() => {
                    this.$router.go()
                })
        },
        deleteSingleNot(delLetter) {
            let newLetters = []
            if (this.deletedNotifications.notificationsDeleted !== null && this.deletedNotifications.notificationsDeleted.length > 2) {
                let arr = JSON.parse(this.deletedNotifications.notificationsDeleted);
                newLetters = Array.isArray(arr) ? arr : []
            }
            if (Array.isArray(newLetters))
                newLetters.push(delLetter._id)
            else newLetters = [delLetter._id]

            this.deletedNotifications.notificationsDeleted = JSON.stringify(newLetters)
            this.deletedNotifications.userID = this.$store.state.auth.user.id

            let raw = JSON.stringify({
                "data": this.deletedNotifications
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/usernotifications`, requestOptions)
                .then(response => response.json())
                .then(() => {
                    this.$router.go()
                })

        },
        formattedDate(date) {
            return moment(date).format('DD.MM.YY');
        },
        formattedTime(date) {
            return moment(date).format('HH:mm');
        },
    }
}
</script>