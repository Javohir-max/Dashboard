<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
const bgFon = ref([]);
let intervalID = null;
let delInterval = null

const random = () => {
  const width = Math.floor(Math.random() * 1850);
  const height = Math.floor(Math.random() * 1000);
  bgFon.value.push({ top: height, left: width });
};

const generate = () => {
  intervalID = setInterval(random, 300);
};

onMounted(() => {
  generate();
});

onUnmounted(() => {
  clearInterval(intervalID);
});
</script>

<template>
  <div class="animation" id="bgID">
    <div class="bg-fon-con">
        <img class="bg-fon" src="./../assets/walper.jpg" alt="Background" />
        <div v-for="(item, index) in bgFon" :key="index" class="fon-Box" :style="{top: `${item.top}px`, left: `${item.left}px`}"></div>
    </div>
    <div class="container">
        <div class="con-box">
            <button class="btn-one">{{ t('project8.btn') }}</button>
        </div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
        <div class="con-box"></div>
    </div>
  </div>
</template>

<style scoped>
.animation {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.animation .bg-fon {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.animation .bg-fon-con {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.animation .fon-Box {
  width: 5px;
  height: 5px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  box-shadow: 0 0 5px 3px white;
  z-index: 3;
  animation: down 3s ease-in-out;
  opacity: 0;
}
@keyframes down {
    0% {
        transform: translateY(0);
    }
    10% {
        opacity: 1;
    }
    100% {
        transform: translateY(300px) translateX(150px);
    }
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: center;
    padding: 20px;
    position: relative;
    z-index: 1;
    overflow: auto;
}
.container::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
}
.container::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.192);
    border-radius: 20px;
}
.con-box {
    width: 330px;
    height: 350px;
    border-radius: 10px;
    box-shadow: 0 0 20px 2px black;
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-one {
    padding: 5px 28px;
    border-radius: 20px;
    background-color: #00bd7e;
    color: white;
    overflow: hidden;
    position: relative;
    transition: .6s;
}
.btn-one::before {
    content: "";
    position: absolute;
    top: 0;
    left: -24px;
    width: 12px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.699);
    transform: skewX(-30deg) translateX(0);
    transition: .6s;
}
.btn-one::after {
    content: "";
    position: absolute;
    top: 0;
    left: -8px;
    width: 5px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.699);
    transform: skewX(-30deg) translateX(0);
    transition: .6s;
}
.btn-one:hover::before,
.btn-one:hover::after {
    transform: skewX(-30deg) translateX(135px);
}
</style>
