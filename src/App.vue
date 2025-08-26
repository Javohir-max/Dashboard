<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { ref, watch, watchEffect } from 'vue';
import { Icon } from '@iconify/vue';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';
import SelectLang from './components/SelectLang.vue';

const { t, locale } = useI18n()
const lang = [
    {name: 'English', code: 'en', flag: 'circle-flags:lang-en'},
    {name: 'Русский', code: 'ru', flag: 'circle-flags:lang-ru'},
    {name: "O'zbek", code: 'uz', flag: 'circle-flags:lang-uz'},
]
const mainLink = [
    {to: '/', icon: 'bi bi-house-door', context: 'home.title'},
    {to: '/settings/', icon: 'bi bi-gear', context: 'settings.title'},
    {to: '/profile/', icon: 'bi bi-person', context: 'profile.title'}
]
const secondaryLink = [
    {to: '/passenger/', name: 'passenger', icon: 'prime:users', context: 'project1.title'},
    {to: '/market/', name: 'market', icon: 'iconoir:filter', context: 'project2.title'},
    {to: '/modalwindow/', name: 'modalwindow', icon: 'tabler:window-maximize', context: 'project3.title'},
    {to: '/countdown/', name: 'countdown', icon: 'ci:timer', context: 'project4.title'},
    {to: '/community', name: 'community', icon: 'majesticons:community-line', context: 'project5.title'},
    {to: '/cards', name: 'cards', icon: 'uil:create-dashboard', context: 'project6.title'},
    {to: '/tictac', name: 'tictac', icon: 'fluent:games-16-regular', context: 'project7.title'},
    {to: '/animation', name: 'animation', icon: 'mdi:animation-play', context: 'project8.title'},
    {to: '/uploadImg', name: 'uploadImg', icon: 'mage:image-upload', context: 'project9.title'},
    {to: '/videos', name: 'videoView', icon: 'tabler:api', context: 'project10.title'}
]
const communityActive = ref(false)
const mediaScren = ref(false)
const width = ref(window.outerWidth)
if (width.value <= 415) {
    mediaScren.value = true
}else {
    mediaScren.value = true
}
const route = useRoute()
const router = useRouter()
const btnStat = ref(false)
const openMenuTrue = ref({
    maxHeight: '0',
})
const openMenuFlase = ref({
    maxHeight: '450px',
})
const btnIcon = ref('bi-chevron-right')
const btnc = () => {
    btnStat.value = !btnStat.value
    if(btnStat.value) {
        btnIcon.value = 'bi-chevron-right'
    }else {
        btnIcon.value = 'bi-chevron-down'
    }
}
const langes = (e) => {
    locale.value = e.code
}
watch(() => router.currentRoute.value.name, (newRout, oldRout) => {
    communityActive.value = route.matched[0].path === '/community'
    let openLink = route.matched[0].redirect !== undefined
    let fl = secondaryLink.filter(fl => fl.name === newRout)
    if (fl.length > 0 || openLink) {
        btnStat.value = true
        btnc()
    }else {
        btnStat.value = false
        btnc()
    }
});
</script>

<template>
  <div style="display: flex;">
    <header 
        class="header_container" 
        :class="mediaScren ? 'widthSmal' : 'widthBig'"
    >
        <nav 
            class="nav_container" 
            :class="mediaScren ? 'p-2' : 'p-4'"
        >
            <Button 
                class="menu_btn" 
                rounded 
                text 
                @click="mediaScren = !mediaScren"
            >
                <Icon 
                    icon="uil:bars" 
                    width="24" 
                    height="24" 
                />
            </Button>
            <img 
                src="./assets/logo.svg" 
                alt="logo" 
                class="app_logo" 
                :class="mediaScren ? 'app_logo_big' : 'app_logo_smal'"
            >
            <SelectLang 
                @lang="langes" 
                :option="lang" 
                v-model="mediaScren"
            />
            <RouterLink 
                v-for="item in mainLink" 
                :key="item.length" 
                :to="item.to" 
                :class="{'router_media' : mediaScren}"
            >
                <i :class="item.icon"></i>
                {{ t(item.context) }}
            </RouterLink>
            <div 
                class="projects_btn" 
                :class="{ 'projects_btn-active' : !btnStat}" 
                @click="btnc"
            >
                <Button 
                    :label="mediaScren ? '' : t('projectxt')" 
                    icon="bi bi-briefcase" 
                    :class="mediaScren ? '!ps-[3px]' : '!p-0'" 
                    pt:label="!font-normal !ps-[2px]" 
                    text 
                    class="btn" 
                />
                <i class="bi green" :class="mediaScren ? '' : btnIcon"></i>
            </div>
            <div 
                :style="btnStat ? openMenuTrue : openMenuFlase" 
                class="container_projects" 
                :class="mediaScren ? 'ps-2' : 'ps-4'"
            >
                <RouterLink 
                    v-for="item in secondaryLink" 
                    :key="item.length" 
                    :to="item.to" 
                    :class="{
                        'active-link' : item.name === 'community' && communityActive,
                        'link-media' : mediaScren
                    }"
                >
                    <Icon 
                        :icon="item.icon" 
                        width="20" 
                        height="20" 
                    /> 
                    {{ !mediaScren ? t(item.context) : ''}}
                </RouterLink>
            </div>      
        </nav>
    </header>
    <main 
        id="main" 
        class="main-container"
    >
        <RouterView />
    </main>
  </div>
</template>

<style scoped>
.header_container {
    line-height: 1.5;
    height: 100vh;
    border-radius: 0 5px 5px 0;
    box-shadow: 2px 0 5px black;
    position: relative;
    z-index: 2;
    transition: .5s;
}
.widthBig {
    width: 300px;
}
.widthSmal {
    width: 60px;
}
.nav_container {
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.menu_btn {
    width: 40px;
    height: 40px;
    padding: 0;
}
.app_logo {
    transition: .5s;
}
.app_logo_big {
    width: 60%;
    margin-left: calc(50% - 13.20px);
    margin-top: 8px;
    margin-bottom: 8px;
}
.app_logo_smal {
    width: 30%;
    margin-left: calc(50% - 30px);
    margin-bottom: 16px;
}
.router_media {
    width: auto;
    overflow: hidden;
    padding: 8px 15px;
}
.projects_btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: .5s;
}
.projects_btn:hover {
    background-color: #00bd7e33;
}
.projects_btn-active {
    background-color: #00bd7e33;
}
.projects_btn .btn{
    border-radius: 6px;
    transition: .5s;
    color: #00bd7e;
    padding: 1px 0;
    background-color: #ffffff00 !important;
}
.container_projects {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;
    transition: .5s ease;
}
.container_projects .link-media {
    display: flex;
    justify-content: center;
    padding: 6px 0;
}
.main-container {
    width: 100%;
    max-height: 100vh;
    overflow: auto;
}
.active-link {
    color: white !important;
    background-color: #00bd7e;
}
.active-link:hover {
    background-color: transparent;
}
a.router-link-exact-active {
  color: white !important;
  background-color: #00bd7e;
  border-radius: 6px;
}
a.router-link-exact-active:hover {
  background-color: transparent;
}
a {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}
a:first-of-type {
  border: 0;
}

</style>
