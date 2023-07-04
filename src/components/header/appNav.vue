<template>
    <div class="header__navLinks">
        <a href="/">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M17 10.19L12 5.69L7 10.19V18H9H11V20H5V12H2L12 3L22 12H19V20H13V18H15H17V10.19Z" fill="black" />
                <path d="M11 18V20H13V18H11Z" fill="black" />
            </svg>
            Главная
        </a>

        <a href="/establishmentsNearby">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M16.9497 4.05025C15.637 2.7375 13.8565 2 12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025ZM8.46447 5.46447C9.40215 4.52678 10.6739 4 12 4C13.3261 4 14.5979 4.52678 15.5355 5.46447C16.4732 6.40215 17 7.67392 17 9C17 10 17 12 12 18.71C7 12 7 10 7 9C7 7.67392 7.52678 6.40215 8.46447 5.46447Z"
                    fill="black" />
            </svg>
            Заведения поблизости
        </a>

        <a :href="promoLink() + '/news'">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M20 19V5H4V19H20ZM4 3H20C21.11 3 22 3.89 22 5V19C22 20.11 21.11 21 20 21H4C2.89 21 2 20.11 2 19V5C2 3.89 2.89 3 4 3ZM6 7H10V13H6V7Z"
                    fill="black" />
            </svg>

            Новости заведений
        </a>
    </div>
</template>

<script>
export default {
    methods: {
        promoLink() {
            const city = localStorage.getItem('cityPath')
            return city
        },
    }
}
</script>