<template>
    <!-- Новая категория -->
    <div class="popup ani popupEdit popup__menuAddCat">
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path
                    d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                    fill="#242424" />
            </svg>
        </button>

        <h4>Новая категория</h4>
        <form method="post" class="js-menuAddCat" @submit.prevent="saveCategory">
            <div class="form__select form__row">
                <span class="label noselect ani" tabindex="1">Выбрать категорию</span>
                <div class="selectOptions ani">
                    <label v-for="cat in category" :key="cat._id" class="selectOption">
                        <input type="radio" name="type" v-model="estCat" :value="cat.name">
                        <span class="ani">{{ cat.name }}</span>
                    </label>
                </div>
            </div>
            <button type="submit" class="form__row">Сохранить</button>
        </form>
    </div>
    <!-- Редактирование категории -->
    <div class="popup ani popupEdit popup__menuEditCat">
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path
                    d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                    fill="#242424" />
            </svg>
        </button>

        <h4>Редактирование категории</h4>
        <form method="post" class="js-menuEditCat" @submit.prevent="updateCat">
            <input type="hidden" name="menuCatID">
            <input type="text" autocomplete="off" class="editCat_vst" placeholder="Название категории" name="name"
                v-model="editCat.name" required>

            <button type="submit" class="form__row">Сохранить</button>
        </form>
    </div>

    <!-- Новое блюдо -->
    <div class="popup ani popupEdit popup__menuAddDishes">
        <button type="button" class="popup__close" v-on:click="clearDish()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path
                    d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                    fill="#242424" />
            </svg>
        </button>

        <h4>Новое блюдо</h4>
        <form method="post" class="js-menuAddDishes" @submit.prevent="saveDish">
            <input type="hidden" name="menuCategoryID">
            <div class="form__menuAddDishes">
                <div class="form__menuAddDishes-left">
                    <label class="menuAddDishes-img">
                        <input accept="image/*" type="file" name="img" multiple="false" @change="changeFile">
                        <div class="imgArea ani"></div>
                        <span class="label">Добавить фото</span>
                    </label>
                </div>

                <div class="form__menuAddDishes-right">
                    <label class="form__input form__row" :class="{ filled: isFilled(newDish.name) }">
                        <input type="text" name="name" v-model="newDish.name" required>
                        <span class="label">Название блюда</span>
                    </label>

                    <label class="form__textarea form__row" :class="{ filled: isFilled(newDish.ingredients) }">
                        <textarea name="ingredients" v-model="newDish.ingredients"></textarea>
                        <span class="label">Ингредиенты блюда</span>
                    </label>

                    <label class="form__input form__row" :class="{ filled: isFilled(newDish.price) }">
                        <input type="text" name="price" v-model="newDish.price" v-maska
                            data-maska="########################" required>
                        <span class="label">Цена</span>
                    </label>

                    <button type="submit" class="form__row">Сохранить</button>
                </div>
            </div>
        </form>
    </div>

    <!-- Редактирование блюда -->
    <div class="popup ani popupEdit popup__menuEditDishes">
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path
                    d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                    fill="#242424" />
            </svg>
        </button>

        <h4>Редактирование блюда</h4>
        <form method="post" class="js-menuEditDishes" @submit.prevent="updateDish">
            <input type="hidden" name="menuCategoryID">
            <div class="form__menuAddDishes">
                <div class="form__menuAddDishes-left">
                    <label class="menuAddDishes-img">
                        <input accept="image/*" type="file" name="img" multiple="false" @change="updateFile">
                        <div v-if="!editDish?.thumb || editDish.thumb?.length < 1" class="imgArea ani"></div>
                        <div v-else class="imgArea ani withIMG" :style="{ backgroundImage: `url('${editDish?.thumb}')` }">
                        </div>
                        <!-- <div class="imgArea ani"></div> -->
                        <span class="label">Добавить фото</span>
                    </label>
                </div>

                <div class="form__menuAddDishes-right">
                    <label class="form__input form__row" :class="{ filled: isFilled(editDish.name) }">
                        <input type="text" name="name" v-model="editDish.name" required>
                        <span class="label">Название блюда</span>
                    </label>

                    <label class="form__textarea form__row" :class="{ filled: isFilled(editDish.ingredients) }">
                        <textarea name="ingredients" v-model="editDish.ingredients"></textarea>
                        <span class="label">Ингредиенты блюда</span>
                    </label>

                    <label class="form__input form__row" :class="{ filled: isFilled(editDish.price) }">
                        <input type="text" name="price" v-model="editDish.price" v-maska
                            data-maska="########################" required>
                        <span class="label">Цена</span>
                    </label>

                    <button type="submit" class="form__row">Сохранить</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { vMaska } from "maska"
import { isEmpty, isFilled } from '@/helpers/helper.js'
export default {
    directives: { maska: vMaska },
    data() {
        return {
            category: [],
            estCat: null,
            estCats: [],
            newDish: {
                name: null,
                ingredients: null,
                price: null,
                img: [],
                establishmentID: null
            },
            editDish: {},
            editCat: {}
        }
    },
    watch: {
        '$store.state.utils.editDishAdmin'(newValue) {
            this.editDish = newValue;
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/items/menucategories?filter={establishmentID:"main"}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.category = result
            })

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/establishments/' + this.$route.params.id, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.estCats = JSON.parse(result.menucat)
            })

        this.newDish.establishmentID = this.$route.params.id
    },
    methods: {
        saveCategory() {
            let update = {
                _id: this.$route.params.id,
            }
            if (!isEmpty(this.estCat)) {
                let updateMenu = {
                    establishmentID: this.$route.params.id,
                    name: this.estCat,
                }
                let raw = JSON.stringify({
                    "data": updateMenu
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
                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/menucategories`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (this.estCats) {
                            this.estCats.push(result._id);
                        } else {
                            this.estCats = [result._id];
                        }
                        update['menucat'] = JSON.stringify(this.estCats)

                        raw = JSON.stringify({
                            "data": update
                        })
                        requestOptions = {
                            method: 'POST',
                            headers: {
                                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                                'Content-Type': 'application/json'
                            },
                            body: raw,
                            redirect: 'follow'
                        }
                        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/establishments`, requestOptions)
                            .then(response => response.json())
                            .then(result => {
                                if (!isEmpty(result._id)) {
                                    this.$router.go()
                                }
                            })
                    })
                    .catch(error => console.log('error', error))
            }
        },
        isEmpty,
        isFilled,
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
                    this.newDish.img = result.assets[0]
                })
                .catch(error => console.log('error', error))
        },
        saveDish(e) {
            let name = this.newDish.name,
                ingredients = this.newDish.ingredients,
                price = this.newDish.price,
                img = this.newDish.img,
                establishmentID = this.newDish.establishmentID,
                menuCategoryID = e.target.elements.menuCategoryID.value

            let update = {
                establishmentID: establishmentID,
                menuCategoryID: menuCategoryID
            }
            if (!isEmpty(name)) {
                update['name'] = name
            }
            if (!isEmpty(ingredients)) {
                update['ingredients'] = ingredients
            }
            if (!isEmpty(price)) {
                update['price'] = price
            }
            if (!isEmpty(img)) {
                update['img'] = img
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

            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/menudishes', requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (!isEmpty(result._id)) {
                        this.$router.go()
                    }
                })
                .catch(error => console.log('error', error))
        },
        clearDish() {
            let imgID = this.newDish.img._id
            this.newDish.name = null
            this.newDish.ingredients = null
            this.newDish.price = null
            this.newDish.img = []

            if (!isEmpty(imgID)) {
                this.deleteIMG(imgID)
            }
        },
        deleteIMG(id) {
            let raw = JSON.stringify({
                "assets": [id]
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
            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/assets/remove', requestOptions)
                .then(response => response.json())
                .then()
                .catch(error => console.log('error', error))
        },
        updateCat() {
            let id = document.querySelector('.js-menuEditCat input[name="menuCatID"]').value,
                name = this.editCat.name
            let update = {
                _id: id,
                name: name
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

            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/menucategories', requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (!isEmpty(result._id)) {
                        this.$router.go()
                    }
                })
                .catch(error => console.log('error', error))
        },
        updateDish() {
            let name = this.editDish.name,
                ingredients = this.editDish.ingredients,
                price = this.editDish.price,
                // thumb = this.editDish.thumb,
                id = this.editDish.id

            let update = {
                _id: id,
                name: name
            }
            if (!isEmpty(ingredients)) {
                update['ingredients'] = ingredients
            }
            if (!isEmpty(price)) {
                update['price'] = price
            }
            // if(!isEmpty(thumb)){
            //     update['img'] = thumb
            // }
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

            fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/menudishes', requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (!isEmpty(result._id)) {
                        this.$router.go()
                    }
                })
                .catch(error => console.log('error', error))
        },
        updateFile(e) {
            if (!isEmpty(this.editDish.thumb)) {
                this.deleteIMG(this.editDish.thumb._id)
            }
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
                    this.editDish.thumb = result.assets[0]

                    let update = {
                        _id: this.editDish.id,
                        img: result.assets[0]
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

                    fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/menudishes', requestOptions)
                        .then(response => response.json())
                        .then(
                        // обновляю страницу
                        // this.$router.go()
                    )
                        .catch(error => console.log('error', error))
                })
                .catch(error => console.log('error', error))
        },
    },
    beforeUpdate() {
        if (!isEmpty(this.$parent.editDishData)) {
            this.editDish = this.$parent.editDishData
        }
    }
}
</script>