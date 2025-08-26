<script setup>
import AddAdvertising from '@/components/Community/AddAdvertising.vue';
import DeleteAdvertising from '@/components/Community/DeleteAdvertising.vue';
import Discuss from '@/components/Community/Discuss.vue';
import { Icon } from '@iconify/vue';
import { onMounted, provide, ref, watchEffect } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const active = ref(false)
const update = ref(false)
const scrollDown = ref(false)
const look = ref({
    active: false,
    id: null,
    put: false
})
const searchFilter = ref('')
const deleteAdvertising = ref({
    active: false,
    id: null,
    check: false,
    checkTwo: false,
    checkLength: 0,
    delComp: false
})
const discuss = ref({
    active: false,
    id: null
})
provide('active', active)
provide('update', update)
provide('scrollDown', scrollDown)
provide('look', look)
provide('searchFilter', searchFilter)
provide('deleteAdvertising', deleteAdvertising)
provide('discuss', discuss)
const scroll = ref(null)
let intervalId = null
const communityMenu = [
    {to: '/myads', icon: 'mage:compass-fill', h2: 'Мои объявлении', h3: 'Посмотреть и управлять своими объявлениями'},
    {to: '/airplan', icon: 'fa6-solid:plane', h2: 'Крылья Вдохновения', h3: 'Обсуждения путешествий и авиабилетов'},
    {to: '/hotel', icon: 'fa6-solid:building', h2: 'Отельная Сфера', h3: 'информацию о скидках и акциях в отельной индустрии'},
    {to: '/train', icon: 'hugeicons:speed-train-02', h2: 'ЖД-клуб', h3: 'Поездки на поездах и продажа билетов'},
]
const maxScroll = () => {
    scroll.value.scrollTo({
        top: scroll.value.scrollHeight,
        behavior: 'smooth'
    })
}
const interval = () => {
    intervalId = setInterval(() => {
        deleteAdvertising.value.checkLength--
        if (deleteAdvertising.value.checkLength == 0) {
            deleteAdvertising.value.check = false
            clearInterval(intervalId)
        }
    }, 6000);
}
const close = () => {
    deleteAdvertising.value.check = false
}
watchEffect(() => {
    if (scrollDown.value === true) {
        setTimeout(() => {
            maxScroll()
        }, 100);
    }
})
watchEffect(() => {
    if (deleteAdvertising.value.checkLength > 0) {
        interval()
    }
})
onMounted(() => {
    setTimeout(() => {
        maxScroll()
    }, 300)
})
</script>
<template>
    <div class="community">
        <div class="community_container">
            <div class="left">
                <h2 class="title">Сообщество</h2>
                <menu>
                    <RouterLink v-for="(item, index) in communityMenu" :key="index" :to="item.to">
                        <Icon :icon="item.icon" width="20" height="20" style="color: #475569;"/>
                        <div class="text">
                            <h2>{{ item.h2 }}</h2>
                            <h3>{{ item.h3 }}</h3>
                        </div>
                    </RouterLink>
                </menu>
            </div>
            <div class="right">
                <Discuss v-if="discuss.active"/>
                <div class="head">
                    <div class="search">
                        <label for="search">
                            <Icon icon="iconoir:search" class="text-[#475569]" width="22" height="22"/>
                        </label>
                        <input type="text" id="search" placeholder="Поиск" v-model="searchFilter">
                    </div>
                    <button @click="active = true">
                        <Icon icon="proicons:add-square" width="24" height="24" />
                        <span>Cоздать объявления</span>
                    </button>
                </div>
                <div ref="scroll" class="content">
                    <RouterView />
                </div>
            </div>
        </div>
        <div class="check" :class="{'check-active': deleteAdvertising.check}">
            <div class="green-line"></div>
            <h2 class="text">Объявление успешно удалено!</h2>
            <button class="close" @click="close">
                <Icon icon="material-symbols:close-rounded" width="20" height="20" style="color: #44546F;"/>
            </button>
        </div>
        <AddAdvertising />
        <DeleteAdvertising v-model="deleteAdvertising"/>
    </div>
</template>
<style scoped>
.community {
    width: 100%;
    height: 100%;
    background-color: #F1F8FD;
    color: black;
    display: flex;
    justify-content: center;
    align-items: start;
    font-family: "Mulish", "Inter", serif;
    backdrop-filter: blur(30px);
    overflow: auto;
    padding: 20px 0 0 0;
}
.community_container {
    width: 1160px;
    max-height: 900px;
    background-color: #FFFFFF59;
    padding: 8px;
    display: flex;
    justify-content: start;
    gap: 16px;
    border-radius: 8px;
}
.community_container .left {
    width: 360px;
    padding: 16px;
    border-radius: 8px;
    background-color: #FFFFFFB2;
}
.community_container .left .title {
    font-family: Mulish;
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0%;
    color: #212121;
    margin-bottom: 24px;
}
.community_container .left menu {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.left menu a {
    display: flex;
    border-radius: 8px;
    padding: 12px;
    justify-content: start;
    gap: 12px;
}
.left menu a:hover {
    background-color: #0000;
    opacity: .8;
}
a.router-link-exact-active {
    background-color: #F5F7FA;
}
a.router-link-exact-active:hover {
    background-color: #F5F7FA !important;
    opacity: 1 !important;
}
menu a .text {
    width: 270px;
}
menu a .text h2 {
    font-family: Mulish;
    font-weight: 700;
    font-size: 16px;
    line-height: 17.52px;
    letter-spacing: 0%;
    color: #212121;
}
menu a .text h3 {
    font-family: Mulish;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0%;
    color: #475569;
}
.community_container .right {
    width: 769px;
    height: auto;
    background-color: #FFFFFFB2;
    border-radius: 8px;
    position: relative;
}
.community_container .right .head {
    width: 743px;
    padding: 12px 16px;
    border-bottom: 1px solid #EAECF0;
    display: flex;
    justify-content: space-between;
}
.right .head .search {
    width: 230px;
    height: 40px;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3px;
    padding: 0 16px 0 6px;
}
.head .search input {
    width: 182px;
    height: 100%;
    font-family: Mulish;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #475569;
    outline: none;
    border: none;
}
.head .search input::placeholder {
    font-size: 18px;
}
.right .head button {
    background-color: #E2F3FF;
    color: #00B5D7;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    border-radius: 100px;
    font-family: Mulish;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
    transition: .3s;
}
.right .head button:hover {
    opacity: .8;
}
.community_container .right .content {
    width: 100%;
    max-height: 820px;
    padding: 24px 20px;
    overflow: auto;
}
.right .content::-webkit-scrollbar {
    width: 5px;
}
.right .content::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 5px;
}
.community .check {
    width: 290px;
    position: absolute;
    top: 16px;
    right: 16px;
    border-radius: 8px;
    background-color: #FFFFFF;
    border: 1px solid #EAECF0;
    box-shadow: 0px 8px 10px 1px #00000008;
    backdrop-filter: blur(18px);
    padding: 8px;
    display: flex;
    align-items: center;
    transform: translateY(-150%);
    opacity: 0;
    z-index: 1;
    transition: .5s ease-in-out !important;
}
.community .check-active {
    transform: translateY(0);
    opacity: 1;
}
.community .check .green-line {
    width: 3px;
    height: 32px;
    background-color: #22A06B;
    box-shadow: 1px 1px 2px 0px #3DD5983D;
    border-radius: 10px;
}
.community .check .text {
    font-family: Mulish;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
    color: #212121;
    margin: 0 16px 0 13px;
}
.community .check .close {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: .3s;
}
.community .check .close:hover {
    background-color: whitesmoke;
}
</style>