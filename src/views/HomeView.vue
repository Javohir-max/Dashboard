<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>

<template>
  <main class="p-3">
    <h1>{{ t('home.title') }}</h1>
    <p>{{ t('home.text') }}</p>
  </main>
</template>
<style scoped>
</style>
