<template>
    <div class="contentHeader">
        <h2>Категории</h2>
    </div>
    <section v-for="(cat, index) in categories" :key="cat.id" class="menuCat menuRow">
        <div class="menuCat_header">
            <h3>{{ cat.name }}</h3>
            <div class="menuCat_header-support">
                <button type="button" class="menuCat_header-addDish_btn" :data-id="cat.id">Добавить блюдо</button>
                <div class=" edit-vstk-img-control-edit-menu " :class="{ 'mini-popup-control-menu-active': cat?.isOpen }">
                    <div class="edit-vstk-img-control-cont">
                        <button type="button" class='edit-vstk-menu-control-cont-btn-dots'
                            @click="controlPopupHandler(index)">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.99967 13.333C10.4417 13.333 10.8656 13.5086 11.1782 13.8212C11.4907 14.1337 11.6663 14.5576 11.6663 14.9997C11.6663 15.4417 11.4907 15.8656 11.1782 16.1782C10.8656 16.4907 10.4417 16.6663 9.99967 16.6663C9.55765 16.6663 9.13372 16.4907 8.82116 16.1782C8.5086 15.8656 8.33301 15.4417 8.33301 14.9997C8.33301 14.5576 8.5086 14.1337 8.82116 13.8212C9.13372 13.5086 9.55765 13.333 9.99967 13.333ZM9.99967 8.33301C10.4417 8.33301 10.8656 8.5086 11.1782 8.82116C11.4907 9.13372 11.6663 9.55765 11.6663 9.99967C11.6663 10.4417 11.4907 10.8656 11.1782 11.1782C10.8656 11.4907 10.4417 11.6663 9.99967 11.6663C9.55765 11.6663 9.13372 11.4907 8.82116 11.1782C8.5086 10.8656 8.33301 10.4417 8.33301 9.99967C8.33301 9.55765 8.5086 9.13372 8.82116 8.82116C9.13372 8.5086 9.55765 8.33301 9.99967 8.33301ZM9.99967 3.33301C10.4417 3.33301 10.8656 3.5086 11.1782 3.82116C11.4907 4.13372 11.6663 4.55765 11.6663 4.99967C11.6663 5.4417 11.4907 5.86563 11.1782 6.17819C10.8656 6.49075 10.4417 6.66634 9.99967 6.66634C9.55765 6.66634 9.13372 6.49075 8.82116 6.17819C8.5086 5.86563 8.33301 5.4417 8.33301 4.99967C8.33301 4.55765 8.5086 4.13372 8.82116 3.82116C9.13372 3.5086 9.55765 3.33301 9.99967 3.33301Z"
                                    fill="#242424" />
                            </svg>
                        </button>
                        <div class="mini-popup-control" :class="{ 'mini-popup-control-active': cat?.isOpen }">
                            <div class="mini-popup-control-cont">
                                <div class="mini-popup-control-figure"></div>
                                <div class="mini-popup-control-buttons">
                                    <button type="button" class="vstk-edit-cat" :data-id="cat.id">Редактировать</button>
                                    <button type="button" @click='deleteCat(cat)'
                                        class="mini-popup-control-danger">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="cat.dishes != null" class="menuDishes">
            <div v-for="(menu, menuIn) in cat.dishes" :key="menu.id" class="menuDish">
                <div v-if="menu.thumb === null || menu.thumb === ''" class="menuDish__thumb"></div>
                <div v-else class="menuDish__thumb" :style="{ backgroundImage: 'url(' + menu.thumb + ')' }"></div>
                <div class="menuDish__info">
                    <h5>{{ menu.name }}</h5>
                    <div v-if="menu.price != null" class="menuDish__info-price">{{ menu.price }} тг</div>
                    <div v-if="menu.ingredients != null" class="menuDish__info-ingredients">{{ menu.ingredients }}</div>
                </div>


                <div class=" edit-vstk-img-control-edit-dish " :class="{ 'mini-popup-control-menu-active': menu?.isOpen }">
                    <div class="edit-vstk-img-control-cont">
                        <button type="button"
                            class='edit-vstk-menu-control-cont-btn-dots edit-vstk-dish-control-cont-btn-dots'
                            @click="controlPopupDishesHandler(index, menuIn)">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.99967 13.333C10.4417 13.333 10.8656 13.5086 11.1782 13.8212C11.4907 14.1337 11.6663 14.5576 11.6663 14.9997C11.6663 15.4417 11.4907 15.8656 11.1782 16.1782C10.8656 16.4907 10.4417 16.6663 9.99967 16.6663C9.55765 16.6663 9.13372 16.4907 8.82116 16.1782C8.5086 15.8656 8.33301 15.4417 8.33301 14.9997C8.33301 14.5576 8.5086 14.1337 8.82116 13.8212C9.13372 13.5086 9.55765 13.333 9.99967 13.333ZM9.99967 8.33301C10.4417 8.33301 10.8656 8.5086 11.1782 8.82116C11.4907 9.13372 11.6663 9.55765 11.6663 9.99967C11.6663 10.4417 11.4907 10.8656 11.1782 11.1782C10.8656 11.4907 10.4417 11.6663 9.99967 11.6663C9.55765 11.6663 9.13372 11.4907 8.82116 11.1782C8.5086 10.8656 8.33301 10.4417 8.33301 9.99967C8.33301 9.55765 8.5086 9.13372 8.82116 8.82116C9.13372 8.5086 9.55765 8.33301 9.99967 8.33301ZM9.99967 3.33301C10.4417 3.33301 10.8656 3.5086 11.1782 3.82116C11.4907 4.13372 11.6663 4.55765 11.6663 4.99967C11.6663 5.4417 11.4907 5.86563 11.1782 6.17819C10.8656 6.49075 10.4417 6.66634 9.99967 6.66634C9.55765 6.66634 9.13372 6.49075 8.82116 6.17819C8.5086 5.86563 8.33301 5.4417 8.33301 4.99967C8.33301 4.55765 8.5086 4.13372 8.82116 3.82116C9.13372 3.5086 9.55765 3.33301 9.99967 3.33301Z"
                                    fill="#242424" />
                            </svg>
                        </button>
                        <div class="mini-popup-control" :class="{ 'mini-popup-control-active': menu?.isOpen }">
                            <div class="mini-popup-control-cont">
                                <div class="mini-popup-control-figure"></div>
                                <div class="mini-popup-control-buttons">
                                    <button type="button" class="menu_editDish_btn_vstk" @click='editDish(menu)'
                                        :data-id="menu.id">Редактировать</button>
                                    <button type="button" @click='deleteDish(menu)'
                                        class="mini-popup-control-danger">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <button type="button" class="menuAddCat menuRow">
        Добавить категорию
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.0939 22V16.8926H10V15.1074H15.0939V10H16.9061V15.1074H22V16.8926H16.9061V22H15.0939Z"
                fill="#242424" />
            <circle cx="16" cy="16" r="15.5" stroke="#242424" />
        </svg>
    </button>

    <popupMenu />
</template>

<script>
import { useHead } from '@vueuse/head'
import popupMenu from '@/components/popup/popup-menu.vue'

export default {
    components: {
        popupMenu,
    },
    data() {
        return {
            categories: [],
            openeDishID: null,
            backActiveIndex: null,
            timeoutCount: null,
            menuCat: null,
            backActiveIndexDish: null,
            timeoutCountDish: null,
        }
    },
    setup() {
        useHead({
            title: 'Меню',
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/establishments/' + this.$route.params.id, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.menuCat = result.menucat;
            })
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/menu?filter={_id:"' + this.$route.params.id + '"}', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.categories = result
                this.categories.forEach(item => {
                    item.isOpen = false
                })
            })
    },
    methods: {
        deleteDish(menu) {
            let requestOptionsDel = {
                method: "DELETE",
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/menudishes/${menu.id}`, requestOptionsDel)
                .then(response => response.json())
                .then(result => {
                    if (result) {
                        this.$router.go()
                    }
                })
        },
        controlPopupDishesHandler(catInd, index) {
            if (!this.categories[catInd].dishes[index].isOpen)
                this.categories[catInd].dishes[index].isOpen = false
            clearTimeout(this.timeoutCountDish)
            if (this.backActiveIndexDish !== null && this.backActiveIndexDish !== index)
                this.categories[catInd].dishes[this.backActiveIndexDish].isOpen = false
            this.categories[catInd].dishes[index].isOpen = !this.categories[catInd].dishes[index].isOpen
            this.backActiveIndexDish = index
            this.timeoutCountDish = setTimeout((index) => {
                this.categories[catInd].dishes[index].isOpen = false
            }, 3000, index);
        },
        controlPopupHandler(index) {
            clearTimeout(this.timeoutCount)
            if (this.backActiveIndex !== null && this.backActiveIndex !== index)
                this.categories[this.backActiveIndex].isOpen = false
            this.categories[index].isOpen = !this.categories[index].isOpen
            this.backActiveIndex = index
            this.timeoutCount = setTimeout((index) => {
                this.categories[index].isOpen = false
            }, 3000, index);
        },
        editDish(data) {
            this.$store.dispatch('utils/setEditDish', data)
        },
        deleteCat(cat) {
            let menucat = JSON.parse(this.menuCat)
            menucat = menucat.filter(item => item !== cat.id)

            let update = {
                _id: this.$route.params.id,
                menucat: JSON.stringify(menucat)
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
            let requestOptionsDel = {
                method: "DELETE",
                headers: {
                    'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/menucategories/${cat.id}`, requestOptionsDel)
                .then(response => response.json())
                .then(() => {
                    fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/establishments', requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            if (result) {
                                this.$router.go()
                            }
                        })
                        .catch(e => console.error(e))
                })

        },
    }
}
</script>