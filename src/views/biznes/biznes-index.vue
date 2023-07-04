<template>
    <div class="row">
        <div class="listEstablishments">
            <article v-for="item in estab" :key="item._id">
                <div class="establishmentInfo">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.adress }}</p>

                    <div class="status">
                        Статус:
                        <span v-if="item._state === 0" class="inactive">
                                        На модерации
                        </span>
                        <span v-if="item._state === 1" class="active">
                            Активно
                        </span>
                        <span v-if="item._state === -1">
                            В архиве
                        </span>
                    </div>
                </div>

                <router-link :to="'/edit/'+item._id" class="establishmentEdit">
                    Редактировать
                </router-link>
            </article>

            <router-link to="/biznes/novoe" class="btnNewEstablishment">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.8781 27.1216V20.8435H12.5391V18.6492H18.8781V12.3711H21.1333V18.6492H27.4724V20.8435H21.1333V27.1216H18.8781Z" fill="#242424"/>
                    <circle cx="20" cy="20" r="19.5" stroke="#242424"/>
                </svg>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['estab'],
}
</script>