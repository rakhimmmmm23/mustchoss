<template>
    <main>
        <div class="container">
            <div class="custom-breadcrumbs">
                <a class="custom-breadcrumbs-item" href="/">Главная</a>|
                <a class="custom-breadcrumbs-item" :href="'/edit/' + this.$route.params.est_id">Бизнес</a>|
                <p class="custom-breadcrumbs-item">Тарифы</p>
            </div>
            <section class="rates-section">
                <div class="rates-section-head">
                    <a :href="'/edit/' + this.$route.params.est_id">
                        <svg class="chevron-left" width="32" height="32" viewBox="0 0 32 32" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.548 22.1067L14.4413 16L20.548 9.88L18.668 8L10.668 16L18.668 24L20.548 22.1067Z"
                                fill="black" />
                        </svg>
                    </a>
                    <!-- Тут проверка есть ли свои тарифы -->
                    <h2 v-if="myRates">Мои тарифы</h2>
                    <h2 v-else>Тарифы</h2>
                </div>
                <div v-if="myRates" class="rate-card-cont-sec my-rates-sec">
                    <div class="rate-card-cont">
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4>Акции</h4>
                                <p>10 000 тг</p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnRemoveHandler">Отписаться</button>
                            </div>
                        </div>
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4 class="rate-ob-a">Объявление - Класс А</h4>
                                <p>30 000 тг</p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnRemoveHandler">Отписаться</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rate-card-cont-sec">
                    <!-- Тут проверка есть ли свои тарифы -->
                    <div v-if="myRates" class="rates-section-head">
                        <h2>Тарифы</h2>
                    </div>
                    <div class="rate-card-cont">
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4>Контент менеджер</h4>
                                <p>10 000 тг</p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnPaymentHandler">Оплатить</button>
                            </div>
                        </div>
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4>Акции</h4>
                                <p>10 000 тг</p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnPaymentHandler">Оплатить</button>
                            </div>
                        </div>
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4>Размещение в TOP</h4>
                                <p></p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnPaymentHandler">Подать заявку</button>
                            </div>
                        </div>
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4>Cистема предзаказа еды</h4>
                                <p>5 % от стоимости заказа</p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnPaymentHandler">Подключить</button>
                            </div>
                        </div>
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4>Система резерва</h4>
                                <p>5 % от стоимости предоплаты</p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnPaymentHandler">Подключить</button>
                            </div>
                        </div>
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4>Система доставки</h4>
                                <p>5 % от стоимости заказа</p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnPaymentHandler">Подключить</button>
                            </div>
                        </div>
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4>Система уведомлений</h4>
                                <p></p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnPaymentHandler">Подать заявку</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rate-card-cont-sec">
                    <div class="rates-section-head">
                        <h2>Объявления</h2>
                    </div>
                    <div class="rate-card-cont">
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4 class="rate-ob-a">Объявление - Класс А</h4>
                                <p>30 000 тг</p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnPaymentHandler">Оплатить</button>
                            </div>
                        </div>
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4 class="rate-ob-b">Объявление - Класс B</h4>
                                <p>20 000 тг</p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnPaymentHandler">Оплатить</button>
                            </div>
                        </div>
                        <div class="rate-card">
                            <div class="rate-card-head">
                                <h4 class="rate-ob-c">Объявление - Класс C</h4>
                                <p>10 000 тг</p>
                            </div>
                            <div class="rate-card-content">
                                <p>
                                    Но действия представителей оппозиции и по сей день остаются уделом либералов,
                                    которые жаждут быть разоблачены. Разнообразный и богатый опыт говорит нам, что
                                    сплочённость команды профессионалов способствует подготовке и реализации
                                    инновационных методов управления процессами.
                                </p>
                                <button @click="btnPaymentHandler">Оплатить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="popup-payment-rates-1">
                <div class="popup-payment-rates-1-cont">
                    <button type="button" class="popup__close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="ani">
                            <path
                                d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                                fill="#242424" />
                        </svg>
                    </button>
                    <h3 class="popup-payment-title">Cистема уведомлений</h3>
                    <p class="popup-payment-subText">Выберите способ оплаты. Услуга подключается автоматически</p>
                    <div class="btn-group-popup-payment">
                        <button class="btn-group-popup-payment-item" @click="popup1PaymentBankCartHandler">
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4H20C20.5304 4 21.0391 4.21071 21.4142 4.58579C21.7893 4.96086 22 5.46957 22 6V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20ZM5 13V15H16V13H5ZM5 9V11H19V9H5Z"
                                        fill="#242424" />
                                </svg>
                                <span>Оплата картой</span>

                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.57812 16.59L13.1681 12L8.57812 7.41L9.99812 6L15.9981 12L9.99813 18L8.57812 16.59Z"
                                    fill="black" />
                            </svg>
                        </button>
                        <button class="btn-group-popup-payment-item" @click="popup1PaymentSchetHandler">
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16 0H8C6.9 0 6 0.9 6 2V18C6 19.1 6.9 20 8 20H20C21.1 20 22 19.1 22 18V6L16 0ZM20 18H8V2H15V7H20V18ZM4 4V22H20V24H4C2.9 24 2 23.1 2 22V4H4ZM10 10V12H18V10H10ZM10 14V16H15V14H10Z"
                                        fill="#242424" />
                                </svg>
                                <span>По счету</span>

                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.57812 16.59L13.1681 12L8.57812 7.41L9.99812 6L15.9981 12L9.99813 18L8.57812 16.59Z"
                                    fill="black" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="popup-payment-rates-2">
                <div class="popup-payment-rates-2-cont">
                    <button type="button" class="popup__close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="ani">
                            <path
                                d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                                fill="#242424" />
                        </svg>
                    </button>
                    <button @click="popupBackPaymentHandler" class="popup-payment-back">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.4219 7.41L10.8319 12L15.4219 16.59L14.0019 18L8.00187 12L14.0019 6L15.4219 7.41Z"
                                fill="black" />
                        </svg>
                        <span>Назад</span>
                    </button>
                    <h3 class="popup-payment-title">Выставлен счет</h3>
                    <h3 class="popup-payment-title">№ Z-4524700033-1</h3>
                    <p class="popup-payment-subText">Плательщик: ТОО ”V-time Object Office”<br />Почта: <span
                            class="popup-payment-subText-mail">mali@mail.kz</span></p>
                    <div class="btn-group-popup-payment">
                        <a class="btn-group-popup-payment-item" :href="cheque.link" @click="popup2PaymentPrintHandler"
                            target="_blank">
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 3H6V7H18M19 12C18.7348 12 18.4804 11.8946 18.2929 11.7071C18.1054 11.5196 18 11.2652 18 11C18 10.7348 18.1054 10.4804 18.2929 10.2929C18.4804 10.1054 18.7348 10 19 10C19.2652 10 19.5196 10.1054 19.7071 10.2929C19.8946 10.4804 20 10.7348 20 11C20 11.2652 19.8946 11.5196 19.7071 11.7071C19.5196 11.8946 19.2652 12 19 12ZM16 19H8V14H16M19 8H5C4.20435 8 3.44129 8.31607 2.87868 8.87868C2.31607 9.44129 2 10.2044 2 11V17H6V21H18V17H22V11C22 10.2044 21.6839 9.44129 21.1213 8.87868C20.5587 8.31607 19.7956 8 19 8Z"
                                        fill="black" />
                                </svg>

                                <span>Распечатать</span>

                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.57812 16.59L13.1681 12L8.57812 7.41L9.99812 6L15.9981 12L9.99813 18L8.57812 16.59Z"
                                    fill="black" />
                            </svg>
                        </a>
                        <a class="btn-group-popup-payment-item" target="_blank" download :href="cheque.link">
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 5V11H14.17L12 13.17L9.83 11H11V5H13ZM15 3H9V9H5L12 16L19 9H15V3ZM19 18H5V20H19V18Z"
                                        fill="black" />
                                </svg>
                                <span>Скачать</span>

                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.57812 16.59L13.1681 12L8.57812 7.41L9.99812 6L15.9981 12L9.99813 18L8.57812 16.59Z"
                                    fill="black" />
                            </svg>
                        </a>
                        <button class="btn-group-popup-payment-item" @click="popup2PaymentMailHandler">
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                                        fill="#242424" />
                                </svg>
                                <span>Переслать</span>

                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.57812 16.59L13.1681 12L8.57812 7.41L9.99812 6L15.9981 12L9.99813 18L8.57812 16.59Z"
                                    fill="black" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="popup-payment-rates-3">
                <div class="popup-payment-rates-3-cont">
                    <button type="button" class="popup__close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="ani">
                            <path
                                d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                                fill="#242424" />
                        </svg>
                    </button>
                    <button @click="popupBackPaymentHandler" class="popup-payment-back">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.4219 7.41L10.8319 12L15.4219 16.59L14.0019 18L8.00187 12L14.0019 6L15.4219 7.41Z"
                                fill="black" />
                        </svg>
                        <span>Назад</span>
                    </button>
                    <h3 class="popup-payment-title">Контент менеджер</h3>
                    <p class="popup-payment-subText">Услуга подключается автоматически после оплаты</p>
                    <form @submit.prevent="paymentCardHandler" class="popup-payment3-inputs">

                        <label class="form__input popup-payment3-inputs-card-input" :class="{ filled: paymentData.card }">
                            <input type="text" required name="depositAmount" v-maska data-maska="####-####-####-####"
                                data-maska-tokens="9:[0-9]:repeated" data-maska-reversed v-model="paymentData.card">
                            <span class="label">Номер карты</span>
                        </label>
                        <label class="form__input" :class="{ filled: paymentData.data }">
                            <input type="text" required name="depositAmount" v-maska data-maska="##|##"
                                data-maska-tokens="9:[0-9]:repeated" data-maska-reversed v-model="paymentData.data">
                            <span class="label">ММ | ГГ</span>
                        </label>
                        <label class="form__input" :class="{ filled: paymentData.cvv }">
                            <input type="text" required name="depositAmount" v-maska data-maska="###"
                                data-maska-tokens="9:[0-9]:repeated" data-maska-reversed v-model="paymentData.cvv">
                            <span class="label">CVV</span>
                        </label>
                        <button class="paymentCardHandler-popup3">Оплатить</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import { vMaska } from "maska"

export default {
    directives: { maska: vMaska },
    data() {
        return {
            myRates: true,
            paymentData: {
                card: '',
                data: '',
                cvv: null,
            },
            cheque: {
                id: '',
                link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            }
        }
    },
    setup() {
        useHead({
            link: [{
                rel: 'stylesheet',
                href: '/static/css/vstk.css'
            }],

        })
    },
    methods: {
        btnPaymentHandler() {
            document.body.classList.add("lock")
            document.querySelector(".popup-payment-rates-1").classList.add("active")
        },
        btnRemoveHandler() {
            console.log(123)
        },
        popup1PaymentBankCartHandler() {
            document.querySelector(".active").classList.remove("active")
            document.querySelector(".popup-payment-rates-3").classList.add("active")
        },
        popup1PaymentSchetHandler() {
            document.querySelector(".active").classList.remove("active")
            document.querySelector(".popup-payment-rates-2").classList.add("active")
        },
        popup2PaymentPrintHandler() {
            window.print();
            return false;
        },
        popup2PaymentMailHandler() {
            console.log(123)
        },
        popupBackPaymentHandler() {
            document.querySelector(".active").classList.remove("active")
            document.querySelector(".popup-payment-rates-1").classList.add("active")
        },
        paymentCardHandler(e) {
            e.preventDefault();
            document.querySelector(".active").classList.remove("active")
            document.body.classList.remove("lock")
        }
    }
}

</script>