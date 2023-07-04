<template>
    <div class="kabinet__header">
        <form method="post" class="kabinet__header-info" enctype="multipart/form-data">
            <label v-if="currentUser.avatar === null || currentUser.avatar === ''" for="avatar"
                class="kabinet__avatar"></label>
            <label v-else for="avatar" class="kabinet__avatar set"
                v-bind:style="{ backgroundImage: 'url(' + avatarUserHandler() + ')' }"></label>

            <input accept="image/*" type="file" name="avatar" multiple="false" id="avatar" @change="changeFile" />
            <div class="kabinet__infoExtra">
                <h1>{{ currentUser.name_screen }}</h1>
                <label for="avatar" class="kabinet__avatarEdit">
                    Изменить фото
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.8067 4.69305C14.0667 4.43305 14.0667 3.99971 13.8067 3.75305L12.2467 2.19305C12 1.93305 11.5667 1.93305 11.3067 2.19305L10.08 3.41305L12.58 5.91305M2 11.4997V13.9997H4.5L11.8733 6.61971L9.37333 4.11971L2 11.4997Z"
                            fill="#BDBDBD" />
                    </svg>
                </label>
            </div>
        </form>

        <div class="kabinet__header-nav">
            <router-link to="/kabinet">Личные данные</router-link>
            <router-link to="/kabinet/bonusy">Бонусы</router-link>
            <router-link to="/kabinet/karty">Банковская карта</router-link>
            <router-link to="/kabinet/zakazy">Мои заказы</router-link>
            <router-link to="/kabinet/rezervy">Мои резервы</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {}
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/users/' + this.currentUser.id, requestOptions)
            .then(response => response.json())
            .then(result2 => {
                this.userInfo = result2
            })
    },
    methods: {
        avatarUserHandler(){
            return process.env.VUE_APP_COCKPIT_ENDPOINT + 'storage/uploads' + this.userInfo.avatar?.path
        },
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
                    console.log('upload', result)
                    // this.formData.thumbs = this.formData.thumbs.concat(result.assets)
                    let update = {
                        _id: this.currentUser.id,
                        avatar: result.assets[0]
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
                    fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/users', requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log('users', result)
                            // обновляю страницу
                            this.$router.go()
                        })
                        .catch(error => console.log('error', error))
                })
                .catch(error => console.log('error', error))
        }
    }
};
</script>