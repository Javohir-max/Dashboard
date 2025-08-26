<script setup>
import { computed, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
// Изначальное время в секундах (например, 2 минуты = 120 секунд)
const {t} = useI18n()
const initialTime = 300
const remainingTime = ref(initialTime);
const isRunning = ref(false);
let timerInterval = null;
// Форматируем оставшееся время в формате мм:сс
const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
});

// Функция для запуска таймера
const startTimer = () => {
  if (!isRunning.value && remainingTime.value > 0) {
    isRunning.value = true;
    timerInterval = setInterval(() => {
      if (remainingTime.value > 0) {
        remainingTime.value--;
      } else {
        resetTimer();
      }
    }, 1000);
  }
};

// Функция для остановки таймера
const stopTimer = () => {
  clearInterval(timerInterval);
  isRunning.value = false;
};

// Функция для сброса таймера
const resetTimer = () => {
  stopTimer();
  remainingTime.value = initialTime;
};

// Останавливаем таймер при размонтировании компонента
onUnmounted(() => {
  stopTimer();
});

</script>
<template>
    <div class="w-full h-[100vh] bg-white text-black flex justify-center items-center">
      <div class="w-[300px] h-[300px] flex justify-center flex-col items-center gap-4">
        <div class="flex items-center gap-4">
         <h1 class="font-semibold text-3xl">{{ formattedTime }}</h1>
        </div>
        <div class="flex justify-center gap-4">
          <Button :label="t('project4.start')" class="!bg-green-700 !border-0 !text-white !shadow-[0_0_5px_green]" @click="startTimer" :disabled="isRunning"/> 
          <Button :label="t('project4.stop')" class="!bg-yellow-500 !border-0 !text-white !shadow-[0_0_5px_yellow]" @click="stopTimer" :disabled="!isRunning"/> 
          <Button :label="t('project4.reset')" class="!bg-red-600 !border-0 !text-white !shadow-[0_0_5px_red]" @click="resetTimer" /> 
        </div>
      </div>
    </div>
</template>
<style scoped>
button {
  margin: 5px;
}
</style>