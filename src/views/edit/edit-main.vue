<template>
    <div class="stata_btns_vstk-cont">
        <button @click="applyDelay('все', $event)" class="stata_btn_vstk stata_btn_vstk-active">За
            все время</button>
        <button @click="applyDelay('день', $event)" class="stata_btn_vstk ">День</button>
        <button @click="applyDelay('неделя', $event)" class="stata_btn_vstk ">Неделя</button>
        <button @click="applyDelay('месяц', $event)" class="stata_btn_vstk ">Месяц</button>
        <button @click="applyDelay('квартал', $event)" class="stata_btn_vstk ">Квартал</button>
        <button @click="applyDelay('год', $event)" class="stata_btn_vstk ">Год</button>
    </div>
    <div class="summary_vstk stata-summary_vstk">
        <div>
            Всего посещений:<span>{{ allVisitors }}</span>
        </div>
        <div>
            Всего броней:<span>{{ allBooking }}</span>
        </div>
        <div>
            Доставка:<span>{{ allDelivery }}</span>
        </div>
    </div>
    <div class="summary_vstk">
        <h3>Посещаемость</h3>
        <canvas ref="chart"></canvas>
    </div>
</template>

<style>
.summary_vstk canvas {
    width: 100%;
    height: 500px;
}
</style>

<script>
import Chart from 'chart.js/auto'
import moment from 'moment'

export default {
    data() {
        return {
            statistics: [],
            myChart: { ctx: null },
            timeout: null,
            allVisitors: 0,
            allBooking: 0,
            allDelivery: 0
        }
    },
    mounted() {
        let requestOptions = {
            method: 'GET',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }
        fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/content/items/statistics?filter={establishmentID:"' + this.$route.params.id + `"}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.length < 1)
                    this.statistics = [{
                        date: moment().subtract(1, 'weeks').format('YYYY-MM-DD'),
                        visitors: 0,
                        booking: 0,
                        delivery: 0
                    },
                    {
                        date: moment().format('YYYY-MM-DD'),
                        visitors: 0,
                        booking: 0,
                        delivery: 0
                    }]
                else if (result.length < 2)
                    this.statistics = [
                        {
                            date: moment().subtract(3, 'weeks').format('YYYY-MM-DD'),
                            visitors: 0,
                            booking: 0,
                            delivery: 0
                        },
                        ...result
                    ]
                else
                    this.statistics = result
                this.filterStatHandler('все')

            })

    },
    methods: {
        updateData(data) {
            this.allVisitors =0
                this.allBooking =0
                this.allDelivery=0
            data.forEach((item) => {
                this.allVisitors += parseInt(item.visitors);
                this.allBooking += parseInt(item.booking);
                this.allDelivery += parseInt(item.delivery);
            });
        },
        applyDelay(period, e) {
            if (this.statistics.length < 2)
                return
            if (e) {
                document.querySelector('.stata_btn_vstk-active').classList.remove('stata_btn_vstk-active')
                if (e.target.classList.contains('stata_btn_vstk'))
                    e.target.classList.add('stata_btn_vstk-active')
            }
            if (this.timeout)
                clearTimeout(this.timeout)

            this.timeout = setTimeout(() => {
                if (this.myChart.ctx) {
                    this.myChart.destroy()
                }
                if (!this.myChart.ctx && this.$refs.chart && this.$refs.chart.getContext('2d')) {
                    this.filterStatHandler(period);
                } else
                    this.applyDelay(period, e);
            }, 1000);

        },
        filterStatHandler(period) {
            let data = this.getData();
            let startDate;
            let newArr = [];
            let endDate = moment().format('YYYY-MM-DD');

            switch (period) {
                case 'день':
                    startDate = moment(endDate).subtract(1, 'day').format('YYYY-MM-DD');
                    break;
                case 'неделя':
                    startDate = moment(endDate).subtract(1, 'week').format('YYYY-MM-DD');
                    break;
                case 'месяц':
                    startDate = moment(endDate).subtract(1, 'month').format('YYYY-MM-DD');
                    break;
                case 'квартал':
                    startDate = moment(endDate).subtract(3, 'months').format('YYYY-MM-DD');
                    break;
                case 'год':
                    startDate = moment(endDate).subtract(1, 'year').format('YYYY-MM-DD');
                    break;
                case 'все':
                    newArr = this.addMissingDates(data)
                    this.updateData(newArr)
                    this.setGraph(newArr)
                    break;
                default:
                    startDate = null;
                    break;
            }

            if (startDate) {
                const dateArray = [];
                let currentDate = moment(startDate);

                while (currentDate <= moment(endDate)) {
                    dateArray.push(currentDate.format('YYYY-MM-DD'));
                    currentDate = moment(currentDate).add(1, 'day');
                }

                const newData = dateArray.map(date => {
                    const existingData = data.find(d => d.date === date);

                    if (existingData) {
                        return existingData;
                    } else {
                        return {
                            date: date,
                            visitors: 0,
                            booking: 0,
                            delivery: 0
                        };
                    }
                });
                this.updateData(newData)
                this.setGraph(newData);
            }
        },

        getData() {
            return this.statistics
        },

        addMissingDates(data) {
            let firstDate = moment(data[0].date, 'YYYY-MM-DD');
            let lastDate = moment(data[data.length - 1].date, 'YYYY-MM-DD');

            const dateArray = [];
            let currentDate = moment(firstDate);

            while (currentDate <= lastDate) {
                dateArray.push(currentDate.format('YYYY-MM-DD'));
                currentDate = moment(currentDate).add(1, 'day');
            }

            const newData = dateArray.map(date => {
                const existingData = data.find(d => d.date === date);

                if (existingData) {
                    return existingData;
                } else {
                    return {
                        date: date,
                        visitors: 0,
                        booking: 0,
                        delivery: 0
                    };
                }
            });

            return newData;
        },
        setGraph(result) {
            if (this.$refs.chart && this.$refs.chart.getContext('2d')) {

                let ctx = this.$refs.chart.getContext('2d')

                if (ctx) {
                    const firstDate = result[0].date;
                    const lastDate = result[result.length - 1].date;

                    const labels = result.map(d => new Date(d.date).toLocaleDateString());

                    labels[0] = new Date(firstDate).toLocaleDateString();
                    labels[labels.length - 1] = new Date(lastDate).toLocaleDateString();
                    labels.fill('', 1, labels.length - 1);
                    this.myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    backgroundColor: 'rgba(250,250,250,0.5)',
                                    fill: true,
                                    fillOpacity: 0.1,
                                    data: result.map(d => d.visitors),
                                    borderColor: '#000000;',
                                    borderWidth: 1,
                                    pointStyle: (context) => {
                                        const index = context.dataIndex;
                                        if (index === 0 || index === context.dataset.data.length - 1) {
                                            return 'circle';
                                        } else {
                                            return 'none';
                                        }
                                    },
                                    pointBackgroundColor: (context) => {
                                        const index = context.dataIndex;
                                        if (index === 0 || index === context.dataset.data.length - 1) {
                                            return '#242424';
                                        } else {
                                            return 'rgba(255, 99, 132, 0)';
                                        }
                                    },
                                    pointBorderWidth: (context) => {
                                        const index = context.dataIndex;

                                        if (index !== 0 || index !== context.dataset.data.length - 1) {
                                            return 0;
                                        }
                                    }
                                }
                            ]
                        },
                        options: {
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            scales: {
                                y: {
                                    ticks: {
                                        stepSize: 1,
                                        min: 0,
                                        beginAtZero: true,
                                    }
                                },
                                x: {
                                    grid: {
                                        drawOnChartArea: false,
                                        min: 0,
                                        beginAtZero: true,
                                    }
                                },
                            }
                        }
                    })
                }



            }

        }
    }
}
</script>