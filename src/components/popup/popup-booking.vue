<template>
    <div class="popup-booking">
        <div class="popup-booking-container">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h4>
                Зарезервировать столик
            </h4>
            <p>Выберите удобную для Вас дату.</p>
            <div class="calendar-container-vstk">
                <VueDatePicker :disabled-week-days="disabledDates" :day-class="getDayClass" locale="ru"
                    :minDate="new Date()" :enable-time-picker="false" inline auto-apply v-model="date"></VueDatePicker>
            </div>

            <button @click="dateHandler" class="booking-popup-btn"><span>Выбрать дату:</span> <span>{{ formattedDate
            }}</span></button>
        </div>
    </div>
    <div class="popup-booking-time">
        <div class="popup-booking-container">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h4>
                Зарезервировать столик
            </h4>
            <p>Выберите время</p>
            <div class="bookint-time-cont">
                <div v-for="(time, index) in bookingTimeArr" :key="index" class="bookint-time-item">
                    <input :id="'a' + time" type="radio" name="time" v-model="selectedTime" :value="time">
                    <label :for="'a' + time">{{ time }}</label>
                </div>
            </div>
            <div class="bookint-person-cont">
                <p>Количество персон</p>
                <div class="bookint-person-cont-count">
                    <button @click="decrementPerson"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.8418 5.79557L9.02513 10.1407L12.8418 14.4953L11.6668 15.833L6.6668 10.1407L11.6668 4.44839L12.8418 5.79557Z"
                                fill="black" />
                        </svg></button><span>{{ countPerson }}</span>
                    <button @click="incrementPerson">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.1582 14.2044L10.9749 9.8593L7.1582 5.50468L8.3332 4.16699L13.3332 9.8593L8.3332 15.5516L7.1582 14.2044Z"
                                fill="black" />
                        </svg>
                    </button>
                </div>
            </div>
            <button @click="timeHandler" class="booking-popup-btn">Зарезервировать столик</button>
        </div>
    </div>
    <div class="popup-booking-success">
        <div class="popup-booking-success-cont">
            <button type="button" class="popup__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                    <path
                        d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                        fill="#242424" />
                </svg>
            </button>
            <h5>Готово!</h5>
            <p>Столик зарегистрирован</p>
            <button class="booking-success-btn" @click="successHandler">Хорошо</button>
        </div>
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment';

export default {
    components: { VueDatePicker },
    props: { institution: Object },
    data() {
        return {
            date: null,
            countPerson: 0,
            currentDayOfWeek: '',
            bookingTimeArr: [],
            selectedTime: "",
            statistics: {
                establishmentID: '',
                date: '',
                visitors: 0,
                booking: 0,
                delivery: 0
            }
        }
    },
    watch: {
        date(newValue) {
            const dayOfWeek = new Date(newValue).getDay();
            const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            this.currentDayOfWeek = this.institution?.workingHours[daysOfWeek[dayOfWeek]]
        },
    },
    computed: {
        disabledDates() {
            let disDays = []
            const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            const workingHours = this.institution?.workingHours;
            if (workingHours !== undefined && workingHours !== null)
                disDays = Object.keys(workingHours)
                    .filter(day => workingHours[day].type === 'Выходной')
                    .map(day => daysOfWeek.indexOf(day));
            return disDays
        },
        formattedDate() {
            if (!this.date) return '';
            const year = this.date.getFullYear();
            const month = String(this.date.getMonth() + 1).padStart(2, '0');
            const day = String(this.date.getDate()).padStart(2, '0');
            return `${day}.${month}.${year}`;
        }
    },
    methods: {
        loadStatics(){
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }

        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/statistics?filter={establishmentID:"' + this.institution.id + `",date:"${this.formattedDateStat()}"}`, requestOptions)
            .then(response => response.json())
            .then(result2 => {
                this.statistics = result2
            })
            .catch(() => {
                this.statistics = {
                    establishmentID: this.institution.id,
                    date: this.formattedDateStat(),
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
                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/statistics', requestOptionsPost)
            })
    },
        formattedDateStat() {
            return moment().format('YYYY-MM-DD');
        },
        successHandler() {
            document.querySelector('.popup-booking-success').classList.remove('active')
            document.body.classList.remove('lock')
        },
        timeHandler() {
            if (this.countPerson !== 0 && this.selectedTime.length > 0) {
                const update = {
                    establishmentID: this.institution["id"],
                    userID: this.$store.state.auth.user["id"],
                    date: this.date,
                    time: this.selectedTime,
                    status: "active",
                    persons: this.countPerson
                };

                this.statistics.booking += 1
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
                fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/item/booking', requestOptions)
                    .then(response => response.json())
                    .then(() => {
                        this.selectedTime = ""
                        this.bookingTimeArr = [];
                        document.querySelector('.popup-booking-time').classList.remove('active')
                        document.querySelector('.popup-booking-success').classList.add('active')
                    })
                    .catch(error => console.log('error', error))
            }
        },
        dateHandler() {
            if (this.date !== null) {
                let currentTime = moment(this.currentDayOfWeek?.start, 'HH:mm');
                const endTime = moment(this.currentDayOfWeek?.end, 'HH:mm');
                while (currentTime.isBefore(endTime)) {
                    this.bookingTimeArr.push(currentTime.format('HH:mm'));
                    currentTime = currentTime.add(90, 'minutes');
                }

                document.querySelector('.popup-booking').classList.remove('active')
                document.querySelector('.popup-booking-time').classList.add('active')
                this.loadStatics();
            }
        },
        decrementPerson() {
            if (this.countPerson !== 0)
                this.countPerson -= 1
        },
        incrementPerson() {
            this.countPerson += 1
        },
        getDayClass(date) {
            if (date.getDay() === 6 || date.getDay() === 0) {
                return 'calendar-red-text';
            }
            return '';
        },
    }
}
</script>