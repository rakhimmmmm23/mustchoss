<template>
    <div class="add-promo-popup">
        <h4>Новая акция</h4>
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path
                    d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                    fill="#242424" />
            </svg>
        </button>
        <form class="add-promo-popup-cont" @submit.prevent="submitForm" ref="myForm" action="/submit-form" method="POST">
            <div class="line-add-promo add-promo-popup-file">
                <img v-if="data?.src !== null && data?.src?.length > 0" :src="data.src" alt="" srcset="">
                <label v-else class="menuAddDishes-img">
                    <input accept="image/*" type="file" name="img" multiple="false" @change="changeFile">
                    <div class="ani imgArea popup-edit-vstk" :class="{ withIMG: hasImage }">
                        <svg class="popup-edit-banner-svg" width="44" height="44" viewBox="0 0 44 44" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect x="44" y="21" width="2" height="44" transform="rotate(90 44 21)" fill="#BDBDBD" />
                            <rect x="21" width="2" height="44" fill="#BDBDBD" />
                        </svg>
                        <p class="popup-edit-banner-text">Добавить баннер</p>
                    </div>
                    <div v-if="hasImage" class="edit-vstk-img-control">
                        <div class="edit-vstk-img-control-cont">
                            <button type="button" class='edit-vstk-img-control-cont-btn-dots' @click="controlPopupHandler">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.9987 13.333C10.4407 13.333 10.8646 13.5086 11.1772 13.8212C11.4898 14.1337 11.6654 14.5576 11.6654 14.9997C11.6654 15.4417 11.4898 15.8656 11.1772 16.1782C10.8646 16.4907 10.4407 16.6663 9.9987 16.6663C9.55667 16.6663 9.13275 16.4907 8.82019 16.1782C8.50763 15.8656 8.33203 15.4417 8.33203 14.9997C8.33203 14.5576 8.50763 14.1337 8.82019 13.8212C9.13275 13.5086 9.55667 13.333 9.9987 13.333ZM9.9987 8.33301C10.4407 8.33301 10.8646 8.5086 11.1772 8.82116C11.4898 9.13372 11.6654 9.55765 11.6654 9.99967C11.6654 10.4417 11.4898 10.8656 11.1772 11.1782C10.8646 11.4907 10.4407 11.6663 9.9987 11.6663C9.55667 11.6663 9.13275 11.4907 8.82019 11.1782C8.50763 10.8656 8.33203 10.4417 8.33203 9.99967C8.33203 9.55765 8.50763 9.13372 8.82019 8.82116C9.13275 8.5086 9.55667 8.33301 9.9987 8.33301ZM9.9987 3.33301C10.4407 3.33301 10.8646 3.5086 11.1772 3.82116C11.4898 4.13372 11.6654 4.55765 11.6654 4.99967C11.6654 5.4417 11.4898 5.86563 11.1772 6.17819C10.8646 6.49075 10.4407 6.66634 9.9987 6.66634C9.55667 6.66634 9.13275 6.49075 8.82019 6.17819C8.50763 5.86563 8.33203 5.4417 8.33203 4.99967C8.33203 4.55765 8.50763 4.13372 8.82019 3.82116C9.13275 3.5086 9.55667 3.33301 9.9987 3.33301Z"
                                        fill="white" />
                                </svg>
                            </button>
                            <div class="mini-popup-control">
                                <div class="mini-popup-control-cont">
                                    <div class="mini-popup-control-figure"></div>
                                    <div class="mini-popup-control-buttons">
                                        <button type="button" @click="deleteImgHandler"
                                            class="mini-popup-control-danger">Удалить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>
            </div>
            <input placeholder="Период с" type="text" name="startDate" :value="data?.startDate">
            <input placeholder="Период по" type="text" name="endDate" :value="data?.endDate">
            <input class="line-add-promo" required placeholder="Название акции" :value="data?.title" type="text"
                name="promoName">
            <textarea placeholder="Описание акции" :value="data?.description" name="promoDescription"></textarea>
            <button type="submit" class="save-popup-promo">Сохранить</button>
            <button @click.prevent="resetForm" class="new-popup-promo">Создать еще одну
                <div class="new-popup-promo-plus-cont">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.91081 14.24V10.944H6.58281V9.792H9.91081V6.496H11.0948V9.792H14.4228V10.944H11.0948V14.24H9.91081Z"
                            fill="#242424" />
                        <circle cx="10.5" cy="10.5" r="10" stroke="black" />
                    </svg>
                </div>
            </button>
        </form>
    </div>
</template>

<!-- popup -->
<!-- <div class="mini-popup-control">
    <div class="mini-popup-control-cont">
        <div class="mini-popup-control-figure"></div>
        <div class="mini-popup-control-buttons">
            <button>Редактировать</button>
            <button class="mini-popup-control-danger">Удалить</button>
        </div>
    </div>
</div> -->

<script>
export default {
    props: {
        selectedFilter: String,
        dataEdit: Object,
        cityEstb:String
    },
    data() {
        return {
            data: {},
            hasImage: false
        }
    },
    computed: {
        hasImageClass() {
            const popupImgLabel = document.querySelector(".popup-edit-vstk");
            if (popupImgLabel)
                return popupImgLabel.classList.contains("withIMG")
            else return false
        }
    },
    watch: {
        dataEdit() {
            this.data = this.dataEdit
        }
    },
    mounted() {
        const popupImgLabel = document.querySelector(".popup-edit-vstk");
        const observer = new MutationObserver(() => {
            this.hasImage = this.hasImageClass
        })
        observer.observe(popupImgLabel, { attributes: true, attributeFilter: ['class'] })
    },
    methods: {
        changeFile(e) {
            let formdata = new FormData(),
                file = e.target.files[0]
            formdata.append('files[]', file)
        },
        controlPopupHandler() {
            document.querySelector(".mini-popup-control").classList.toggle("mini-popup-control-active")
        },
        deleteImgHandler() {
            const contolPopup = document.querySelector(".mini-popup-control");
            if (contolPopup.classList.contains('mini-popup-control-active'))
                contolPopup.classList.remove('mini-popup-control-active')
            const popupBack = document.querySelector('.popup-edit-vstk')
            if (popupBack.classList.contains("withIMG"))
                popupBack.classList.remove("withIMG")
            document.querySelector('.popup-edit-vstk').style.backgroundImage = 'none'
        },
        submitForm(e, type = "submit") {
            if (e)
                e.preventDefault();
            const formData = new FormData();
            let requestOptionsPost = {
                method: 'POST',
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: null,
                redirect: 'follow'
            }
            let update = {
                establishmentID: this.$route.params.id,
                text: this.$refs.myForm.promoDescription.value,
                title: this.$refs.myForm.promoName.value,
                period: [this.$refs.myForm.startDate.value, this.$refs.myForm.endDate.value],
                type: this.selectedFilter,
                banner: {},
                city: this.cityEstb
            }
            if (this.$refs.myForm?.img?.files[0]) {
                formData.append('files[]', this.$refs.myForm.img.files[0]);
                let requestOptions = {
                    method: 'POST',
                    headers: {
                        'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN
                    },
                    body: formData,
                    redirect: 'follow'
                }
                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/assets/upload', requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        update.banner = result.assets
                        let raw = JSON.stringify({
                            "data": update
                        })
                        requestOptionsPost.body = raw
                        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/promo', requestOptionsPost)
                            .then(response => response.json())
                            .then(() => {
                                if (type === "submit")
                                    this.$router.go()
                            }
                            )
                            .catch(error => console.log('error', error))
                    })
            }
            else {
                let raw = JSON.stringify({
                    "data": update
                })
                requestOptionsPost.body = raw
                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/promo', requestOptionsPost)
                    .then(response => response.json())
                    .then(() => {
                        if (type === "submit")
                            this.$router.go()
                    }
                    )
                    .catch(error => console.log('error', error))

            }
        },
        resetForm() {
            this.submitForm(false, "reset")
            this.$refs.myForm.reset();
            this.deleteImgHandler();
            this.data = {}
        },
    }
}

</script>