<template>
    <div class="popup-map-item-cont-top">
        <div class="popup-map-item-cont">
            <div class="popup-map-item-img-cont">
                <img v-if="data?.thumbs !== null && data?.thumbs?.length > 0" :src="data.thumbs[0]" alt="photo" />
            </div>
            <h4>{{ data.name }}</h4>
            <div class="nearby-star-cont-items">
                <ul class="institutionRating" :data-rating="data.rating">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <p>{{ data.adress }}</p>
            <a :href="`/${data.city}/${data.slug}`" class="popup-map-item-btn">Перейти</a>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        data: Object
    },
    data() {
        return {
        }
    }

}
</script>