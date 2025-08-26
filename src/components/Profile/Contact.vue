<template>
    <div class="flex justify-start gap-[300px] phone:flex-col phone:gap-[30px]">
        <div class="">
            <h1 class="font-semibold">{{ t('profile.contact.network') }}</h1>
            <a href="https://www.youtube.com/@pubgmobille5306" target="_blank" class="flex items-center gap-3 rounded-[5px] ps-2"><i class="bi bi-youtube"></i> <span>YouTube</span></a>
            <a href="#https://t.me/Jaga_007" target="_blank" class="flex items-center gap-3 rounded-[5px] ps-2"><i class="bi bi-telegram"></i> <span>Telegram</span></a>
            <a href="https://x.com/JAVOHIR__007" target="_blank" class="flex items-center gap-3 rounded-[5px] ps-2"><i class="bi bi-twitter-x"></i> <span>Twitter</span></a>
            <a href="https://www.instagram.com/javohir__7o7_" target="_blank" class="flex items-center gap-3 rounded-[5px] ps-2"><i class="bi bi-instagram"></i> <span>Instagram</span></a>
        </div>
        <div class="">
            <h1 class="font-semibold">{{ t('profile.contact.add.title') }}</h1>
            <h2>{{ t('profile.contact.add.email') }}: <span><a href="mailto:mobillepubg40@gmail.com">mobillepubg40@gmail.com</a></span></h2>
            <h2>{{ t('profile.contact.add.tell') }}: <span class="green">+998 (88) 289 95-99</span></h2>
        </div>
    </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const {t} = useI18n()
</script>
<style scoped>
    
</style>