<template>
    <div class="popup ani popupEdit popup__editEstab popup__editEstab-success">
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path
                    d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                    fill="#242424" />
            </svg>
        </button>
        <div class="popup-editEstb-cont">

        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="25" fill="#50DB97" />
            <path
                d="M62.6263 42.2086L45.1263 59.7086L37.1055 51.6878L39.1617 49.6315L45.1263 55.5815L60.5701 40.1523L62.6263 42.2086Z"
                fill="white" />
        </svg>
        <h5>Сохранено!</h5>
        <p>Все изменения были успешно
            сохранены</p>
        </div>
    </div>
    <div class="popup ani popupEdit popup__editEstab popup__editEstab-error">
        <button type="button" class="popup__close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ani">
                <path
                    d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                    fill="#242424" />
            </svg>
        </button>
        <div class="popup-editEstb-cont">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="25" fill="#FF3A44" />
            <path
                d="M52.1305 50.0003L60.2096 58.0795V60.2087H58.0805L50.0013 52.1295L41.9221 60.2087H39.793V58.0795L47.8721 50.0003L39.793 41.9212V39.792H41.9221L50.0013 47.8712L58.0805 39.792H60.2096V41.9212L52.1305 50.0003Z"
                fill="white" />
        </svg>

        <h5>Ошибка!</h5>
        <p>Произошла ошибка повторите
            попытку позже</p>
    </div>
</div>

</template>