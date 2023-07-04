<template>

    <div class="moderator__header">
        <div class="moderator__headerTabs">
            <router-link to="/moderator">Заведения</router-link>
            <router-link to="/moderator/users">Посетитель</router-link>
            <router-link to="/moderator/moderation">Модерация</router-link>
            <router-link to="/moderator/without_owner">Без владельца</router-link>
        </div>

        <div class="moderator__headerBtn">
            <router-link to="/moderator/new">
                Добавить заведение
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.91081 14.24V10.944H6.58281V9.792H9.91081V6.496H11.0948V9.792H14.4228V10.944H11.0948V14.24H9.91081Z" fill="white"/>
                    <circle cx="10.5" cy="10.5" r="10" stroke="white"/>
                </svg>
            </router-link>
        </div>
    </div>
</template>