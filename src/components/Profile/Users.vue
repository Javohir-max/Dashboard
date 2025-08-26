<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>
<template>
    <div class="w-[500px] flex flex-col m-auto items-center phone:w-[300px]">
        <img src="https://cdn4.iconfinder.com/data/icons/businessman-3d-avatar/512/handsome_businessman_avatar.png" alt="" class="w-[200px]">
        <h1 class="text-2xl font-bold">{{ t('profile.users.fname') }}: <span class="green">Javohir</span></h1>      
        <h1 class="text-2xl font-bold">{{ t('profile.users.lname') }}: <span class="green">Mustafoyev</span></h1>      
        <h1 class="text-2xl font-bold">{{ t('profile.users.age') }}: <span class="green">17</span></h1>      
        <h1 class="text-2xl font-bold">{{ t('profile.users.dob') }}: <span class="green">25.08.2007</span></h1>      
    </div>
</template>
<style scoped>
    
</style>