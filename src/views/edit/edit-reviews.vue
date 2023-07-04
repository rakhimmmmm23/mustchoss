<template>
    <div class="contentHeader">
        <h2>Отзывы</h2>
    </div>

    <div class="reviews">
        <section class="review" v-for="review in reviews" :key="review.id">
            <figure class="review__thumb" v-if="review.user.avatar === null || review.user.avatar === ''"></figure>
            <figure class="review__thumb" v-else :title="review.user.name" :style="'background-image: url('+review.user.avatar+');'"></figure>
            <div class="review__data">
                <div class="review__data-header">
                    <h4>{{ review.user.name }}</h4>
                    <time :datetime="review.time.datetime">{{ review.time.display }}</time>
                </div>
                <div class="review__data-extra">
                    <ul class="review__data-rating">
                        <li>
                            <ul class="institutionRating" :data-rating="review.rating.star">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </li>
                        <li><h6>{{ review.rating.display }}</h6></li>
                        <li></li>
                        <li>Оценка:</li>
                        <li>Сервис-{{ review.service }}</li>
                        <li>Кухня-{{ review.kitchen }}</li>
                        <li>Интерер-{{ review.interior }}</li>
                    </ul>
                </div>
                <p>{{ review.description }}</p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reviews: []
        }
    },
    beforeMount () {
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
            this.reviews = result.reviews
            console.log(result.reviews)
        })
    },
    methods: {
    }
}
</script>