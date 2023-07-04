<template>
    <h2 class="edit_letter-title">Рассылка</h2>
    <div class="new_letter div-content-vstk">
        <p>Уведомления с поздравлениями и предложением о скидке</p>
        <form class="new_letter_form" @submit.prevent="postLetterHandler">
            <div class="select-type-letter">
                <div class="input_container-new_letter text-form_new-form">
                    <div>
                        <input v-model="formData.type" value="all" id="new-letter_radio1" name="all" type="radio" checked>
                        <label for="new-letter_radio1" class="label-input_new-letter">Всем посетителям </label>
                    </div>
                    <div>
                        <input v-model="formData.type" value="imeninniki" id="new-letter_radio2" name="imeninniki"
                            type="radio">
                        <label for="new-letter_radio2" class="label-input_new-letter">Именинники </label>
                    </div>
                </div>
                <div class="new-letter_current-date">
                    Дата публикации: <span>{{ returnCurrentDate() }}</span>
                </div>
            </div>
            <textarea v-model="formData.message" name="message" required placeholder="Описание уведомления"></textarea>
            <button type="submit">Опубликовать</button>
        </form>
    </div>
    <section class="was-letter-section">
        <h2 class="edit_letter-title tmp-edit_letter-title">Опубликовано</h2>
        <template v-for="letter in letters" :key="letter._id">
            <div class="was_letter div-content-vstk" @click="wasLetterClickHandler($event)">
                <span class="was-letter-date">{{formattedLetterDate(letter.date)}}</span>
                <p>{{letter.message}}</p>
            </div>
        </template>
    </section>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            formData: {
                message: '',
                type: 'all',
            },
            letters: []
        }
    },
    created() {
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
        }
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/notifications?filter={establishmentID:"${this.$route.params.id}"}`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                this.letters = result
            })
            .catch(error => console.log('error', error))
    },
    methods: {
        postLetterHandler(e) {
            e.preventDefault();
            const update = {
                establishmentID: this.$route.params.id,
                message: this.formData.message,
                date: Date.now(),
                type: this.formData.type
            };

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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/notifications', requestOptions)
                .then(response => response.json())
                .then(() => {
                    this.$router.go()
                })
                .catch(error => console.log('error', error))
        },
        wasLetterClickHandler(e) {
            e.currentTarget.classList.toggle("was-letter-toggle");
        },
        formattedLetterDate(date) {
            return moment(date).format('DD MM YYYY г.');
        },
        returnCurrentDate() {
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
            return formattedDate
        }
    }
}
</script>