<script setup>
import CompImage from '@/MyComponents/CompImage.vue';
import { ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import CompButton from '@/MyComponents/CompButton.vue'
import { onMounted } from 'vue';
import { defineProps } from 'vue';
import axios from 'axios';
const {t} = useI18n()
const emit = defineEmits(['deleteImage']);
const props = defineProps({
  option: Object
})
const imgData = ref({
  width: null,
  height: null,
  size: null
})
const getImage = (base64) => {
  const img = new Image();

  img.onload = () => {
    const width = img.width;
    const height = img.height;
    const sizeInBytes = Math.round((base64.length * 3) / 4 - (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0));
    imgData.value.width = width
    imgData.value.height = height
    imgData.value.size = sizeInBytes
  };

  img.src = base64;
};
const del = (id) => {
  emit('deleteImage', id);
}
watchEffect(() => {
  if (props.option) getImage(props.option.image)
})
</script>
<template>
    <div class="imagesCon">
      <div class="imgCon">
        <CompImage :src="option.image" width="100%" height="100%" preview/>
      </div>
      <h3>{{ t('project9.text2') }}: <b>{{ imgData.width }} (px)</b></h3>
      <h3>{{ t('project9.text3') }}: <b>{{ imgData.height }} (px)</b></h3>
      <h3>{{ t('project9.text4') }}: <b>{{ Math.floor(imgData.size / 1024) }} (KB)</b></h3>
      <CompButton label="Delete" @click="del(option.id)"/>
    </div>
</template>
<style scoped>
  .imagesCon {
    width: 290px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .showImage {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    background-color: transparent;
    transition: .3s;
  }
  .showImage img {
    width: 45%;
    transform: scale(0.8);
    transition: .3s;
  }
  .showActive {
    z-index: 1;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.616);
  }
  .showActive img {
    transform: scale(1);
  }
</style>