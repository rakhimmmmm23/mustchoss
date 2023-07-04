<template>
    <div class="loginData">
        <button type="button" class="header__notify">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 21H14C14 22.1 13.1 23 12 23C10.9 23 10 22.1 10 21ZM21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2C13.1 2 14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19ZM17 11C17 8.2 14.8 6 12 6C9.2 6 7 8.2 7 11V18H17V11Z"
                    fill="black" />
            </svg>
        </button>
        <div class="notify">
            <h5>Уведомления <span>{{ filteredLetters().length }}</span></h5>
            <div class="headerNotices">

                <template v-for="letter in filteredLetters()" :key="letter._id">
                    <div class="headerNotice">
                        <div class="headerNotice__head">
                            <div class="headerNotice__head-icon"></div>
                            <h6>Рассылка</h6>
                            <time>{{ formattedDate(letter.date) }} <span>{{ formattedTime(letter.date) }}</span></time>
                            <button @click="deleteSingleNot(letter)" type="button">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.5 1.5V2H2V3H2.5V9.5C2.5 9.76522 2.60536 10.0196 2.79289 10.2071C2.98043 10.3946 3.23478 10.5 3.5 10.5H8.5C8.76522 10.5 9.01957 10.3946 9.20711 10.2071C9.39464 10.0196 9.5 9.76522 9.5 9.5V3H10V2H7.5V1.5H4.5ZM3.5 3H8.5V9.5H3.5V3ZM4.5 4V8.5H5.5V4H4.5ZM6.5 4V8.5H7.5V4H6.5Z"
                                        fill="#737372" />
                                </svg>
                            </button>
                        </div>
                        <p>{{ letter.message.slice(0, 30) }}...</p>
                    </div>
                </template>
            </div>
            <a href="/notice" class="notifyMore">Все уведомления</a>
        </div>

        <a href="/kabinet" class="header__cabinet">
            <span v-if="currentUser.avatar === null || currentUser.avatar === ''"></span>
            <span v-else v-bind:style="{ backgroundImage: 'url(' + avatarUserHandler() + ')' }"></span>
        </a>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            userInfo: {},
            allLetters: [],
            deletedNotifications: {
                userID: '',
                notificationsDeleted: '',
            }
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
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
        avatarUserHandler() {
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + this.userInfo.avatar?.path
        },

    }
};
</script>