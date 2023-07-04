<template>
    <transition appear>
        <main v-if="is_data_fetched">
            <div class="container">
                <div class="row">
                    <breadcrumbs current='null' />
                </div>

                <section class="thumbs" v-if="institution.thumbs != null">
                    <img v-for="(thumb, index) in institution.thumbs" :key="index" :src="thumb" alt="thumb">
                </section>

                <section class="single">
                    <div class="institutionInfo">
                        <div class="institutionSection">
                            <ul class="institutionRating" :data-rating="institution.rating">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            <h1>{{ seo.h1.length > 0 ? seo.h1 : institution.name }}</h1>

                            <div class="institutionSumm">
                                <div v-if="estabKitchenType.length > 0" class="kitchen_vstk">
                                    <span>Кухня</span>
                                    <p v-for="type in estabKitchenType" :key="type.slug">
                                        {{ type.name }}
                                    </p>
                                </div>

                                <div v-if="institution.depositAmount != null && institution.depositAmount.length > 0">
                                    <span>Сумма депозита</span>
                                    {{ butynum(institution.depositAmount) }} тг
                                </div>

                                <div v-if="institution.averageCheck != null && institution.averageCheck.length > 0">
                                    <span>Средний чек</span>
                                    {{ butynum(institution.averageCheck) }} тг
                                </div>
                            </div>

                            <div class="institutionExtra">
                                <button type="button" class="btn addFavorites" v-on:click="addFav()"
                                    v-if="loggedIn && currentUser.role === 'user'" title="Добавить в закладки">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17 3C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21L12 18L5 21V5C5 3.89 5.9 3 7 3H17ZM11 7V9H9V11H11V13H13V11H15V9H13V7H11Z"
                                            fill="#242424" />
                                    </svg>
                                </button>

                                <!-- <button type="button" class="btn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0004 21.35L10.5504 20.03C5.40037 15.36 2.00037 12.27 2.00037 8.5C2.00037 5.41 4.42037 3 7.50037 3C9.24037 3 10.9104 3.81 12.0004 5.08C13.0904 3.81 14.7604 3 16.5004 3C19.5804 3 22.0004 5.41 22.0004 8.5C22.0004 12.27 18.6004 15.36 13.4504 20.03L12.0004 21.35Z" fill="#242424"/>
                                </svg>
                            </button> -->

                                <button type="button" class="btn" v-on:click="showShare()">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C18.7956 8 19.5587 7.68393 20.1213 7.12132C20.6839 6.55871 21 5.79565 21 5C21 4.20435 20.6839 3.44129 20.1213 2.87868C19.5587 2.31607 18.7956 2 18 2C17.2044 2 16.4413 2.31607 15.8787 2.87868C15.3161 3.44129 15 4.20435 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C5.20435 9 4.44129 9.31607 3.87868 9.87868C3.31607 10.4413 3 11.2044 3 12C3 12.7956 3.31607 13.5587 3.87868 14.1213C4.44129 14.6839 5.20435 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91 18 21.91C19.61 21.91 20.92 20.61 20.92 19C20.92 18.2256 20.6124 17.4829 20.0648 16.9352C19.5171 16.3876 18.7744 16.08 18 16.08Z"
                                            fill="black" />
                                    </svg>
                                </button>

                                <a :href="'tel:' + formatTel(JSON.parse(institution.phone)[0])" class="btn phone"
                                    v-if="institution.phone != null">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.2652 15.5 20.5196 15.6054 20.7071 15.7929C20.8946 15.9804 21 16.2348 21 16.5V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21C15.4913 21 11.1673 19.2089 7.97918 16.0208C4.79107 12.8327 3 8.50868 3 4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H7.5C7.76522 3 8.01957 3.10536 8.20711 3.29289C8.39464 3.48043 8.5 3.73478 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
                                            fill="black" />
                                    </svg>
                                    {{ JSON.parse(institution.phone)[0] }}
                                </a>
                            </div>
                        </div>

                        <div class="institutionSection" v-if="institution.description != null">
                            <h3>Описание</h3>
                            <p class="institutionSection__description" v-html="institution.description"></p>
                        </div>

                        <a :href="'/' + this.$route.params.cat_city + '/' + institution.slug + '/otzyvy'"
                            class="institutionSection">
                            <h3>
                                Отзывы
                                <svg width="8" height="12" viewBox="0 0 8 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.580078 10.59L5.17008 6L0.580078 1.41L2.00008 -6.20702e-08L8.00008 6L2.00008 12L0.580078 10.59Z"
                                        fill="black" />
                                </svg>
                            </h3>

                            <div class="reviews">
                                <div class="review" v-for="review in institution.reviews" :key="review.id"
                                    :title="review.user.name">
                                    <span v-if="review.user.avatar === null || review.user.avatar === ''"></span>
                                    <img v-else v-bind:src="review.user.avatar" v-bind:alt="review.user.name">
                                </div>
                            </div>
                        </a>

                        <div class="institutionSection">
                            <h3>Детали</h3>

                            <div v-if="institution.longitude != null || institution.latitude != null" class="singleMap"
                                id="singleMap">
                                <YandexMap :settings="settings" :coordinates="[institution.longitude, institution.latitude]"
                                    :zoom="zoom" :controls="controls">
                                    <YandexMarker :coordinates="[institution.longitude, institution.latitude]"
                                        :marker-id="institution.id" :icon="markerIcon"></YandexMarker>
                                </YandexMap>
                            </div>

                            <div class="institutionSection__extra">
                                <div class="extra" v-if="institution.adress != null">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5ZM12 2C13.8565 2 15.637 2.7375 16.9497 4.05025C18.2625 5.36301 19 7.14348 19 9C19 14.25 12 22 12 22C12 22 5 14.25 5 9C5 7.14348 5.7375 5.36301 7.05025 4.05025C8.36301 2.7375 10.1435 2 12 2ZM12 4C10.6739 4 9.40215 4.52678 8.46447 5.46447C7.52678 6.40215 7 7.67392 7 9C7 10 7 12 12 18.71C17 12 17 10 17 9C17 7.67392 16.4732 6.40215 15.5355 5.46447C14.5979 4.52678 13.3261 4 12 4Z"
                                            fill="black" />
                                    </svg>
                                    <div class="extraData">
                                        <span class="extraTitle">Адрес заведения</span>
                                        <span class="extraVal">{{ institution.adress }}</span>
                                    </div>
                                </div>

                                <div class="extra" v-if="institution.payments !== null && institution.payments.length > 0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20 8H4V6H20M20 18H4V12H20M20 4H4C2.89 4 2 4.89 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V6C22 4.89 21.1 4 20 4Z"
                                            fill="black" />
                                    </svg>

                                    <div class="extraData">
                                        <span class="extraTitle">Способ оплаты</span>
                                        <span class="extraVal">
                                            <span v-for="pay in institution.payments" :key="pay.id">
                                                {{ pay.name }}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <div class="extra">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20ZM12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2ZM12.5 12.8L7.7 15.6L7 14.2L11 11.9V7H12.5V12.8Z"
                                            fill="black" />
                                    </svg>


                                    <div class="extraData" v-if="institution.workingHours">
                                        <span class="extraTitle">График работы</span>
                                        <span class="extraVal">
                                            <span>
                                                {{ formatWorkingHours(institution.workingHours) }}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <div class="extra" v-if="institution.phone != null">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9H16.1C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5ZM5 5H6.5C6.6 5.9 6.8 6.8 7 7.6L5.8 8.8C5.4 7.6 5.1 6.3 5 5ZM19 19C17.7 18.9 16.4 18.6 15.2 18.2L16.4 17C17.2 17.2 18.1 17.4 19 17.4V19ZM15 12H17C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7V9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12ZM19 12H21C21 7 16.97 3 12 3V5C15.86 5 19 8.13 19 12Z"
                                            fill="black" />
                                    </svg>

                                    <div class="extraData">
                                        <span class="extraTitle">Телефон</span>
                                        <span class="extraVal">
                                            <a v-for="phone in JSON.parse(institution.phone)" :key="phone"
                                                :href="'tel:' + formatTel(phone)" class="btn phone">
                                                {{ phone }}
                                            </a>
                                        </span>
                                    </div>
                                </div>

                                <div class="extra" v-for="extra in institution.details" :key="extra.id">
                                    <img :src="'/static/img/establishments/' + extra.img" :alt="extra.name">
                                    <div class="extraData">
                                        <span class="extraTitle">{{ extra.name }}</span>
                                        <span class="extraVal">{{ extra.exist }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="institutionSection">
                            <h2>Акции</h2>
                            <div class="promos-cont-single-estb">
                                <a :href="`/${institution.slug}/promo/${'slugpromo'}`" class="promos-card">
                                    <div class="promos-card-img-cont">
                                        <img src="https://w.forfun.com/fetch/62/62310cab177f6b0274ca309b77c800b5.jpeg"
                                            alt="акция" />
                                    </div>
                                    <h4 v-if="this.$route.params.slug">Название Акции</h4>
                                    <h4 v-else>Название Заведения</h4>
                                </a>
                                <a :href="`/${institution.slug}/promo/${'slugpromo'}`" class="promos-card">
                                    <div class="promos-card-img-cont">
                                        <img src="https://w.forfun.com/fetch/62/62310cab177f6b0274ca309b77c800b5.jpeg"
                                            alt="акция" />
                                    </div>
                                    <h4 v-if="this.$route.params.slug">Название Акции</h4>
                                    <h4 v-else>Название Заведения</h4>
                                </a>
                            </div>
                        </div>
                    </div>

                    <aside class="sidebar">
                        <button @click="bookingClickHandler" type="button" class="sidebarBtn">
                            Зарезервировать столик
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.8333 16.0846H12.5833V17.8346H10.8333V16.0846ZM12 6.16797C15.1208 6.2963 16.48 9.4463 14.625 11.8088C14.1408 12.3921 13.3592 12.7771 12.9742 13.2671C12.5833 13.7513 12.5833 14.3346 12.5833 14.918H10.8333C10.8333 13.9438 10.8333 13.1213 11.2242 12.538C11.6092 11.9546 12.3908 11.6105 12.875 11.2255C14.2867 9.9188 13.9367 8.06964 12 7.91797C11.5359 7.91797 11.0908 8.10234 10.7626 8.43053C10.4344 8.75872 10.25 9.20384 10.25 9.66797H8.5C8.5 8.73971 8.86875 7.84947 9.52513 7.19309C10.1815 6.53672 11.0717 6.16797 12 6.16797Z"
                                    fill="#242424" />
                                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#242424" />
                            </svg>
                        </button>

                        <a :href="'/' + this.$route.params.cat_city + '/' + institution.slug + '/menyu'"
                            v-if="institution.menu != null" class="sidebarBtn">
                            Меню / Доставка / Предзаказ
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.8333 16.0846H12.5833V17.8346H10.8333V16.0846ZM12 6.16797C15.1208 6.2963 16.48 9.4463 14.625 11.8088C14.1408 12.3921 13.3592 12.7771 12.9742 13.2671C12.5833 13.7513 12.5833 14.3346 12.5833 14.918H10.8333C10.8333 13.9438 10.8333 13.1213 11.2242 12.538C11.6092 11.9546 12.3908 11.6105 12.875 11.2255C14.2867 9.9188 13.9367 8.06964 12 7.91797C11.5359 7.91797 11.0908 8.10234 10.7626 8.43053C10.4344 8.75872 10.25 9.20384 10.25 9.66797H8.5C8.5 8.73971 8.86875 7.84947 9.52513 7.19309C10.1815 6.53672 11.0717 6.16797 12 6.16797Z"
                                    fill="#242424" />
                                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#242424" />
                            </svg>
                        </a>

                        <a :href="'/' + institution.city + '/promos/' + institution.slug" class="sidebarBtn">
                            Акции
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.8333 16.0846H12.5833V17.8346H10.8333V16.0846ZM12 6.16797C15.1208 6.2963 16.48 9.4463 14.625 11.8088C14.1408 12.3921 13.3592 12.7771 12.9742 13.2671C12.5833 13.7513 12.5833 14.3346 12.5833 14.918H10.8333C10.8333 13.9438 10.8333 13.1213 11.2242 12.538C11.6092 11.9546 12.3908 11.6105 12.875 11.2255C14.2867 9.9188 13.9367 8.06964 12 7.91797C11.5359 7.91797 11.0908 8.10234 10.7626 8.43053C10.4344 8.75872 10.25 9.20384 10.25 9.66797H8.5C8.5 8.73971 8.86875 7.84947 9.52513 7.19309C10.1815 6.53672 11.0717 6.16797 12 6.16797Z"
                                    fill="#242424" />
                                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#242424" />
                            </svg>
                        </a>

                        <div class="chain">
                            <h3>Из одной сети</h3>

                            <a href="#" class="chainItem">
                                <span class="chainItem__info">
                                    <h4>Название заведения</h4>
                                    <p>Название заведения</p>

                                    <span class="chainItem__rating">
                                        <span class="chainItem__ratingHead">
                                            <ul class="institutionRating" data-rating="3.5">
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                            3,5
                                        </span>

                                        <span class="chainItem__ratingFooter">
                                            <span>Сервис: 2</span>
                                            <span>Кухня: 4</span>
                                            <span>Интерьер: 4</span>
                                        </span>
                                    </span>
                                </span>

                                <figure></figure>
                            </a>

                            <a href="#" class="chainItem">
                                <span class="chainItem__info">
                                    <h4>Название заведения</h4>
                                    <p>Название заведения</p>

                                    <span class="chainItem__rating">
                                        <span class="chainItem__ratingHead">
                                            <ul class="institutionRating" data-rating="3.5">
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                            3,5
                                        </span>

                                        <span class="chainItem__ratingFooter">
                                            <span>Сервис: 2</span>
                                            <span>Кухня: 4</span>
                                            <span>Интерьер: 4</span>
                                        </span>
                                    </span>
                                </span>

                                <figure></figure>
                            </a>

                            <a href="#" class="chainItem">
                                <span class="chainItem__info">
                                    <h4>Название заведения</h4>
                                    <p>Название заведения</p>

                                    <span class="chainItem__rating">
                                        <span class="chainItem__ratingHead">
                                            <ul class="institutionRating" data-rating="3.5">
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                            3,5
                                        </span>

                                        <span class="chainItem__ratingFooter">
                                            <span>Сервис: 2</span>
                                            <span>Кухня: 4</span>
                                            <span>Интерьер: 4</span>
                                        </span>
                                    </span>
                                </span>

                                <figure></figure>
                            </a>
                        </div>
                    </aside>
                    <mobile />
                </section>
            </div>

            <!--share-->
            <div class="share">
                <button type="button" class="popup__close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="ani">
                        <path
                            d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                            fill="#242424" />
                    </svg>
                </button>
                <h4>Поделиться</h4>
                <ul class="share__list">
                    <li>
                        <a :href="'https://api.whatsapp.com/send?text=' + pageURL" data-action="share/whatsapp/share"
                            target="_blank">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263">
                                    </path>
                                </svg>
                            </span>
                            <h6>WhatsApp</h6>
                        </a>
                    </li>
                    <li>
                        <a :href="'https://telegram.me/share/url?url=' + pageURL + '&text=' + institution.name"
                            target="_blank">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z">
                                    </path>
                                </svg>
                            </span>
                            <h6>Telegram</h6>
                        </a>
                    </li>
                    <li>
                        <a :href="'http://vk.com/share.php?url=' + pageURL + '&title=' + institution.name" target="_blank">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.513-.743.675-1.021.675-.139 0-.341-.162-.341-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.258-.558.504 0 .528.79.65.871 2.138v3.228c0 .707-.127.836-.407.836-.743 0-2.551-2.729-3.624-5.853-.209-.607-.42-.852-.98-.852H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.853v-1.966c0-.626.133-.752.574-.752.324 0 .882.164 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.192c.626 0 .939-.313.759-.931-.197-.615-.907-1.51-1.849-2.569-.512-.604-1.277-1.254-1.51-1.579-.325-.419-.231-.604 0-.976.001.001 2.672-3.761 2.95-5.04z">
                                    </path>
                                </svg>
                            </span>
                            <h6>ВКонтакте</h6>
                        </a>
                    </li>
                    <li>
                        <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + pageURL" target="_blank">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z">
                                    </path>
                                </svg>
                            </span>
                            <h6>Facebook</h6>
                        </a>
                    </li>
                </ul>

                <div class="share__copy">
                    <input type="text" v-model="pageURL" disabled>
                    <button type="button" @click="copyUrl()">Копировать</button>
                </div>
            </div>
            <popupBookking :institution="institution" />
        </main>
    </transition>
</template>
  

<script>
import { useHead } from '@vueuse/head'
import { YandexMap, YandexMarker } from 'vue-yandex-maps'
import { formatTel, butynum, isEmpty } from '@/helpers/helper.js'
import JQuery from 'jquery'
import breadcrumbs from '@/components/app-breadcrumbs.vue'
import notify from '@/helpers/notify.js'
import moment from "moment"
import mobile from '@/components/app-mobile.vue'
import popupBookking from '@/components/popup/popup-booking.vue'

export default {
    components: {
        YandexMap,
        YandexMarker,
        breadcrumbs,
        mobile,
        popupBookking
    },
    data() {
        return {
            title: null,
            institution: null,
            settings: {
                apiKey: process.env.VUE_APP_YANDEX,
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1'
            },
            zoom: 15,
            controls: [],
            markerIcon: {
                layout: 'default#image',
                imageHref: '/static/img/maps/placemark.png',
                imageSize: [24, 34],
            },
            share: false,
            pageURL: null,
            is_data_fetched: false,
            favorites: [],
            estabKitchenType: [],
            seo: {
                h1: '',
                metaDescription: '',
                metaKeywords: '',
                metaTitle: ''
            },
            statistics: {
                establishmentID: '',
                date: '',
                visitors: 0,
                booking: 0,
                delivery: 0
            }
        }
    },
    head() {
        return {
            title: this.seo.metaTitle.length > 0 ? this.seo.metaTitle : this.title,
            meta: [
                { name: 'description', content: this.seo.metaDescription },
                { name: 'keywords', content: this.seo.metaKeywords },
                { property: 'og:title', content: this.seo.metaTitle },
                { property: 'og:description', content: this.seo.metaDescription },
                { property: 'og:type', content: 'website' },
                { name: 'twitter:title', content: this.seo.metaTitle },
                { name: 'twitter:description', content: this.seo.metaDescription },
                { name: 'twitter:card', content: 'summary_large_image' }
            ]
        }
    },
    setup() {
        useHead({
            // title: this.title,
            // title: () => this.title,
            // title: 'single',
            link: [{
                rel: 'stylesheet',
                href: '/static/css/single.css'
            },
            {
                rel: 'stylesheet',
                href: '/static/css/promo.css'
            }
            ],
            script: [
                {
                    src: '/static/js/single.js',
                    tagPosition: 'bodyClose',
                    async: true
                }
            ],
        })
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
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/single?filter={slug:"' + this.$route.params.slug + '"}', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.institution = result
                this.title = result.name
                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + `api/content/item/seo?filter={establishmentID:"${result.id}"}`, requestOptions)
                    .then(response => response.json())
                    .then(result2 => {
                        this.seo.h1 = result2.h1
                        this.seo.metaDescription = result2.metaDescription
                        this.seo.metaKeywords = result2.metaKeywords
                        this.seo.metaTitle = result2.metaTitle

                    })
                this.is_data_fetched = true

                this.pageURL = new URL(this.$route.href, window.location.origin).href
                if (this.$store?.state?.auth?.user?.id)
                    fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/users/' + this.$store.state.auth.user.id, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            if (!isEmpty(result.favorites)) {
                                this.favorites = JSON.parse(result.favorites)
                                const exist = result.favorites.includes(this.institution.id)
                                if (exist) {
                                    let $ = JQuery
                                    $('.addFavorites').addClass('active').attr('title', 'Убрать с закладок')
                                }
                            }
                        })


                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/statistics?filter={establishmentID:"' + this.institution.id + `",date:"${this.formattedDate()}"}`, requestOptions)
                    .then(response => response.json())
                    .then(result2 => {
                        this.statistics = result2
                        setTimeout(() => {
                            this.updateStatistics()
                        }, 3000);
                    })
                    .catch(() => {
                        this.statistics = {
                            establishmentID: this.institution.id,
                            date: this.formattedDate(),
                            visitors: 0,
                            booking: 0,
                            delivery: 0
                        }

                        let raw = JSON.stringify({
                            "data": this.statistics
                        })
                        let requestOptionsPost = {
                            method: 'POST',
                            headers: {
                                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                                'Content-Type': 'application/json'
                            },
                            body: raw,
                            redirect: 'follow'
                        }
                        setTimeout(() => {
                            this.updateStatistics()
                        }, 3000);
                        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/statistics', requestOptionsPost)
                    })

                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/kitchenType', requestOptions)
                    .then(response => response.json())
                    .then(resType => {
                        if (resType.length > 0 && result.kitchenType?.length > 1) {
                            this.estabKitchenType = resType.filter((item) => {
                                if (result.kitchenType.includes(item.slug))
                                    return item
                            });
                        }
                    })
            })
    },
    methods: {
        formattedDate() {
            return moment().format('YYYY-MM-DD');
        },
        updateStatistics() {
            const checkCache = localStorage.getItem(`${this.institution.id}-${this.formattedDate()}`)
            if (checkCache === null || this.hasPassedThreeHours(parseInt(checkCache))) {
                console.log('updateStat')
                this.statistics.visitors += 1
                let rawStat = JSON.stringify({
                    "data": this.statistics
                })
                let requestOptionsPost = {
                    method: 'POST',
                    headers: {
                        'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                        'Content-Type': 'application/json'
                    },
                    body: rawStat,
                    redirect: 'follow'
                }
                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/statistics', requestOptionsPost)
                localStorage.setItem(`${this.institution.id}-${this.formattedDate()}`, Date.now())
            }
        },
        hasPassedThreeHours(date) {
            const now = moment();
            const diff = moment(date).diff(now, 'hours');
            return diff <= -3;
        },
        bookingClickHandler() {
            const popup = document.querySelector(".popup-booking")
            if (popup) {
                popup.classList.add('active')
                document.body.classList.add("lock")
            }
        },
        formatWorkingHours(workingHours) {
            let workingDaysObj = {};

            for (let day in workingHours) {
                if (workingHours[day].type === "Рабочий день") {
                    let start = workingHours[day].start;
                    let end = workingHours[day].end;
                    let key = `${start}-${end}`;
                    if (!workingDaysObj[key]) {
                        workingDaysObj[key] = [];
                    }
                    workingDaysObj[key].push(day);
                }
            }

            let workingHoursStr = "";

            for (let key in workingDaysObj) {
                let days = workingDaysObj[key];
                let [start, end] = key.split("-");
                let startTime = moment(start, "HH:mm");
                let endTime = moment(end, "HH:mm");

                if (days.length === 1) {
                    workingHoursStr += this.formatWorkingDay(days[0], startTime, endTime) + ", ";
                } else {
                    let dayStr = days[0].slice(0, 2) + "-" + days[days.length - 1].slice(0, 2);
                    workingHoursStr += `${dayStr}, с ${startTime.format("HH:mm")} до ${endTime.format("HH:mm")}, `;
                }
            }

            if (workingHoursStr.length === 0) {
                return "Выходной";
            }
            workingHoursStr = workingHoursStr.slice(0, -2).replace("По", "Пн")
                .replace("Су", "Сб")
                .replace("Во", "Вс")
                .replace("Че", "Чт")
                .replace("Пя", "Пт");
            return workingHoursStr;
        },
        formatWorkingDay(day, start, end) {
            let dayStr = day.slice(0, 2);
            let startStr = start.format("HH:mm");
            let endStr = end.format("HH:mm");

            return `${dayStr}, с ${startStr} до ${endStr}`;
        },

        formatTel,
        butynum,
        isEmpty,
        showShare() {
            let $ = JQuery
            $('body').addClass('lock')
            $('.share').addClass('active')
        },
        copyUrl() {
            // let aux = document.createElement('input')
            // aux.setAttribute('value', this.pageURL)
            // document.body.appendChild(aux)
            // aux.select()
            // aux.setSelectionRange(0, 99999)
            // document.execCommand('copy')
            // document.body.removeChild(aux)

            navigator.clipboard.writeText(this.pageURL)
        },
        addFav() {
            let $ = JQuery,
                userID = this.currentUser.id,
                notifypDataText

            if ($('.addFavorites').hasClass("active")) {
                // убираем с закладок
                this.favorites = this.favorites.filter((el) => el !== this.institution.id)
                notifypDataText = 'Удалено с закладок'
                $('.addFavorites').removeClass('active').attr('title', 'Добавить в закладки')
            } else {
                // добавляем в закладки
                if (this.favorites != []) {
                    const fav = []
                    fav.push(this.institution.id)
                    this.favorites = this.favorites.concat(fav)
                } else {
                    const fav = []
                    fav.push(this.institution.id)
                    this.favorites = fav
                }
                notifypDataText = 'Добавлено в закладки'
                $('.addFavorites').addClass('active').attr('title', 'Убрать с закладок')
            }

            let update = {
                _id: userID,
            }
            update['favorites'] = JSON.stringify(this.favorites)

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
                    let notifypData = {}
                    if (!isEmpty(result._id)) {
                        notifypData = {
                            "status": "success",
                            "title": notifypDataText
                        }
                    } else {
                        notifypData = {
                            "status": "error",
                            "title": 'Ошибка!'
                        }
                    }
                    notify(notifypData)
                })
                .catch(error => console.log('error', error))
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        },
        currentUser() {
            return this.$store.state.auth.user;
        }
    }
}
</script>