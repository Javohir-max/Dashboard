<script setup>
import Advertising from '@/components/Community/Advertising.vue';
import CreateAdvertisements from '@/components/Community/CreateAdvertisements.vue';
import axios from 'axios';
import { computed, inject, onMounted, ref, watchEffect } from 'vue';
const update = inject('update')
const scrollDown = inject('scrollDown')
const searchFilter = inject('searchFilter')
const deleteAdvertising = inject('deleteAdvertising')
const trainData = ref([])
const date = new Date()
const newDate = computed(() => {
    let day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()
    let month = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let year = date.getFullYear()
    return `${day}.${month}.${year}`
})
const groupedByDate = computed(() => {
    // Фильтруем данные
    const filteredData = trainData.value.filter(fl => 
        fl.description.toLowerCase().includes(searchFilter.value.toLowerCase())
    );

    // Группируем отфильтрованные данные по дате
    return filteredData.reduce((acc, item) => {
        if (!acc[item.day]) acc[item.day] = [];
        acc[item.day].push(item);
        return acc;
    }, {});
});
const getAdvertising = async () => {
    try {
        const response = await axios.get('http://localhost:3000/advertising?cotegory=train')
        if (response.status === 200) {
            trainData.value = response.data
            scrollDown.value = true
            setTimeout(() => {
                scrollDown.value = false
            }, 100)
        }
    } catch (error) {
        console.log(error);
    }
}
watchEffect(() => {
    if (update.value === true || deleteAdvertising.value.checkTwo) {
        getAdvertising()
    }
})
onMounted(() => {
    getAdvertising()
    scrollDown.value = true    
})
</script>
<template>
    <div class="train">
        <CreateAdvertisements v-if="trainData.length === 0" />   
        <div class="con-date" v-else v-for="(items, day) in groupedByDate" :key="day">
            <div class="dateTime">
                <hr>
                <h3>{{ day === newDate ? 'Сегодня': day }}</h3>
                <hr>
            </div>
            <Advertising v-for="(item, index) in items" :key="index" :options="item"/>
        </div>  
    </div>
</template>
<style scoped>
.train {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 21px;
    overflow: auto;
}
.train .con-date {
    display: flex;
    flex-direction: column;
    gap: 21px;
}
.train .dateTime {
    width: 100%;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
}
.train .dateTime h3 {
    font-family: Mulish;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
    text-align: center;
    color: #838C97;
}
.train .dateTime hr {
    width: 100%;
    background-color: #EAECF0;
}
</style>