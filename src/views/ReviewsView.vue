<template>
    <div>
        <div class="reviews__header">
            <div class="container">
                <div class="row">
                    <breadcrumbs current="Отзывы" />
                </div>

                <div class="row">
                    <h1 class="reviews__title">{{ institution && institution.name ? institution.name : 'Название заведения'
                    }}</h1>
                </div>
                <div class="row" v-if="loggedIn && currentUser.role === 'user'">
                    <form @submit.prevent="sendReview" class="reviews__form">
                        <div class="reviews__form-rating">
                            <h3>Оцените заведение</h3>

                            <div class="form__rating">
                                <span class="label">Сервис:</span>
                                <div class="starRrating">
                                    <input id="service5" name="service" type="radio" value="5" v-model="review.service" />
                                    <label for="service5"></label>
                                    <input id="service4" name="service" type="radio" value="4" v-model="review.service" />
                                    <label for="service4"></label>
                                    <input id="service3" name="service" type="radio" value="3" v-model="review.service" />
                                    <label for="service3"></label>
                                    <input id="service2" name="service" type="radio" value="2" v-model="review.service" />
                                    <label for="service2"></label>
                                    <input id="service1" name="service" type="radio" value="1" v-model="review.service" />
                                    <label for="service1"></label>
                                </div>
                            </div>

                            <div class="form__rating">
                                <span class="label">Кухня:</span>
                                <div class="starRrating">
                                    <input id="kitchen5" name="kitchen" type="radio" value="5" v-model="review.kitchen" />
                                    <label for="kitchen5"></label>
                                    <input id="kitchen4" name="kitchen" type="radio" value="4" v-model="review.kitchen" />
                                    <label for="kitchen4"></label>
                                    <input id="kitchen3" name="kitchen" type="radio" value="3" v-model="review.kitchen" />
                                    <label for="kitchen3"></label>
                                    <input id="kitchen2" name="kitchen" type="radio" value="2" v-model="review.kitchen" />
                                    <label for="kitchen2"></label>
                                    <input id="kitchen1" name="kitchen" type="radio" value="1" v-model="review.kitchen" />
                                    <label for="kitchen1"></label>
                                </div>
                            </div>

                            <div class="form__rating">
                                <span class="label">Интерер:</span>
                                <div class="starRrating">
                                    <input id="interior5" name="interior" type="radio" value="5"
                                        v-model="review.interior" />
                                    <label for="interior5"></label>
                                    <input id="interior4" name="interior" type="radio" value="4"
                                        v-model="review.interior" />
                                    <label for="interior4"></label>
                                    <input id="interior3" name="interior" type="radio" value="3"
                                        v-model="review.interior" />
                                    <label for="interior3"></label>
                                    <input id="interior2" name="interior" type="radio" value="2"
                                        v-model="review.interior" />
                                    <label for="interior2"></label>
                                    <input id="interior1" name="interior" type="radio" value="1"
                                        v-model="review.interior" />
                                    <label for="interior1"></label>
                                </div>
                            </div>
                        </div>

                        <div class="reviews__form-text">
                            <h3>Оставьте ваш отзыв</h3>

                            <label class="form__textarea" :class="{ filled: isFilled(review.description) }">
                                <textarea name="description" class="ani" v-model="review.description"></textarea>
                                <span class="label">Краткий гайд по описанию</span>
                            </label>

                            <button type="submit"
                                :disabled="isDisabled([review.service, review.kitchen, review.interior, review.description])">Отправить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <main>
            <div class="container reviews__main">
                <h6>Отзывы</h6>

                <section class="review__section" v-for="review in institution.reviews" :key="review.id">
                    <figure class="review__thumb" v-if="review.user.avatar === null || review.user.avatar === ''"></figure>
                    <figure class="review__thumb" v-else :title="review.user.name"
                        :style="'background-image: url(' + review.user.avatar + ');'"></figure>

                    <div class="review__data">
                        <div class="review__data-header">
                            <h4>{{ review.user.name }}</h4>
                            <time :datetime="review.time.datetime">{{ formattedDate(review.time.date) }}</time>
                            <!-- <?php if($establishment['_state'] === 0){ ?> -->
                            <span class="status">В обработке</span>
                            <!-- <?php } ?>
                            <?php if($establishment['_state'] === 1){ ?>
                            <span class="status">Опубликовано</span>
                            <?php } ?> -->
                        </div>
                        <div class="review__data-extra">
                            <h6>{{ institution.name }}</h6>
                            <ul class="review__data-rating">
                                <li>Оценка:</li>
                                <li>Сервис-{{ review.service }}</li>
                                <li>Кухня-{{ review.kitchen }}</li>
                                <li>Интерер-{{ review.interior }}</li>
                                <li>
                                    <ul class="institutionRating" :data-rating="review.rating.star">
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                </li>
                                <li>
                                    <h6>{{ review.rating.display }}</h6>
                                </li>
                            </ul>
                        </div>

                        <p>{{ review.description }}</p>
                    </div>
                </section>
            </div>
        </main>

    </div>
</template>
  
<script>
import { useHead } from '@vueuse/head'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import { isEmpty, isFilled, isDisabled } from '@/helpers/helper.js'
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default {
    components: {
        breadcrumbs
    },
    data() {
        return {
            title: null,
            institution: null,
            review: {
                service: null,
                kitchen: null,
                interior: null,
                description: null,
                establishmentID: null
            }
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        },
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    setup() {
        useHead({
            // title: this.title,
            // title: () => this.title,
            title: 'Отзывы',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/reviews.css'
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/single?filter={slug:"' + this.$route.params.slug + '"}', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.institution = result
                this.title = this.institution.name
                this.review.establishmentID = result.id
            })
    },
    methods: {
        isFilled,
        isDisabled,
        isEmpty,
        formattedDate(date) {
            return moment(date, 'MM.DD.YYYY').format('DD MMMM YYYY [года]')
        },
        sendReview() {
            let service = this.review.service,
                kitchen = this.review.kitchen,
                interior = this.review.interior,
                description = this.review.description,
                establishmentID = this.review.establishmentID

            let update = {
                userID: this.currentUser.id,
                establishmentID: establishmentID,
                _state: 1,
                service: service,
                kitchen: kitchen,
                interior: interior,
                description: description
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/reviews', requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (!isEmpty(result)) {
                        window.location.reload()
                    }
                })
                .catch(error => console.log('error', error))
        }
    }
}
</script>