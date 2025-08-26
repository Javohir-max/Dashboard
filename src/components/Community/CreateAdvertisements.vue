<script setup>
import { Icon } from '@iconify/vue';
import { inject } from 'vue';
const active = inject('active')

</script>
<template>
    <div class="CreateAdvertisements">
        <div class="text_container">
            <h2>В настоящее время нет рекламного материала</h2>
            <p>Создайте рекламу для привлечения больше клиентов для вашего контенте.</p>
        </div>
        <button @click="active = true">
            <Icon icon="proicons:add-square" width="24" height="24" />
            <span>Cоздать объявления</span>
        </button>
    </div>
</template>
<style scoped>
.CreateAdvertisements {
    width: 100%;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
}
.CreateAdvertisements .text_container {
    width: 511px;
}
.CreateAdvertisements .text_container h2 {
    font-family: Mulish;
    font-weight: 700;
    font-size: 22px;
    line-height: 24px;
    letter-spacing: 0%;
    text-align: center;
    color: #212121;
    margin: 0 0 12px 0;
}
.CreateAdvertisements .text_container p {
    font-family: Mulish;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0%;
    text-align: center;
    color: #475569;
}
.CreateAdvertisements button {
    display: flex;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 40px;
    background-color: #E2F3FF;
    color: #00B5D7;
}
.CreateAdvertisements button span {
    font-family: Mulish;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
}

</style>