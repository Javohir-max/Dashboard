<template>
    <div>
        <h1 class="text-2xl">{{ t('profile.about.text1') }} <span class="green">Mustafoev Javohir</span>{{ t('profile.about.text2') }} <span class="green">{{ t('profile.about.job') }}</span> {{ t('profile.about.text3') }} <span class="green">{{ t('profile.about.hobby') }}</span>.</h1>
        <p>{{ t('profile.about.text') }}</p>
    </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const {t} = useI18n()
</script>
<style>
    
</style>