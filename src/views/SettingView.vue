<template>
    <main class="p-3">
        <h1>{{ t('settings.title') }}</h1>
        <p>{{ t('settings.text') }}</p>
    </main>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>
<style scoped>
    
</style>