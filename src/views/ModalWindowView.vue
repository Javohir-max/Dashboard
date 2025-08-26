<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue';
import SignIn from '../components/ModalWindow/SignIn.vue';
import SignUp from '../components/ModalWindow/SignUp.vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
const router = useRouter()
const modalStyleStatus = ref(false)
const modalStyleFalse = ref({
    transform: 'translateY(0)',
    background: '#181818',
    transition: 'all 0.5s ease'
})
const modalStyleTrue = ref({
    transform: 'translateY(-100vh)',
    background: '#ffffff00',
    transition: 'all 0.5s ease'
})
if (!window.location.hash) {
  window.location.hash = '#/signin';
}
const rout = {
    '/signin': SignIn,
    '/signup': SignUp
}
const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
    return rout[currentPath.value.slice(1) || '/']
})
const actLink = [
    {href: '#/signin', content: 'Sign In'},
    {href: '#/signup', content: 'Sign Up'},
]
const contentText = ref(router.currentRoute.value.hash);
watchEffect(() => {
  contentText.value = router.currentRoute.value.hash;
});
let interval;
const checkLocalStorage = () => {
    const json = ref(JSON.parse(localStorage.getItem('WindowOpen')))
    if (json.value) {
        modalStyleStatus.value = true
        clearInterval(interval);
    }else {
        modalStyleStatus.value = false
    }
}
onMounted(() => {
    interval = setInterval(checkLocalStorage, 1000);
});
</script>
<template>
    <div class="container_modal">
        <h1>{{ t('project3.title') }}</h1>
        <div :style="modalStyleStatus ? modalStyleTrue : modalStyleFalse" class="modal_active">
            <div class="btns_container">
                <a 
                    v-for="item in actLink" 
                    :key="item.content" 
                    :href="item.href" 
                    class="link_default"
                    :class="{'link_active' : contentText === item.href}" 
                >
                    {{ item.content }}
                </a>
            </div>        
            <div style="display: flex;">
                <component :is="currentView" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.container_modal {
    width: 100%;
    height: 100vh;
    background-color: white;
    padding-top: 30px;
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('https://w.wallhaven.cc/full/9m/wallhaven-9m92rx.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.container_modal h1 {
    text-align: center;
    font-weight: 700;
    font-size: 30px;
    color: white;
}
.modal_active {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    transition: .5s;
}
.btns_container {
    display: flex;
    margin-top: 170px;
}
.link_default {
    color: #00bd7e !important;
    background-color: #202020;
    transition: .3s;
    border-radius: 10px 10px 0 0;
    font-weight: 600;
    padding: 8px 32px;
}
.link_active {
    color: #181818 !important;
    background-color: #00bd7e;
}
.link_active:hover {
    background-color: #222222;
}
</style>