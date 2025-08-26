<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    bgFon: {
        type: String,
        default: 'white'
    },
    iconColor: {
        type: String,
        default: 'dodgerblue'
    },
    width: {
        type: String,
        default: '620'
    },
    height: {
        type: String,
        default: '625'
    },
    col: {
        type: Number,
        default: 3
    },
    iconSize: {
        type: String,
        default: '48'
    }
})
const active = ref(false)
const imageIndex = ref(0)
const gridRow = computed(() => {
    let row = props.options.length / props.col
    return Math.ceil(row)
})
const rowHeight = computed(() => {
    let a = (props.col -1) * 10
    let b = props.width - a
    let row = b / props.col
    return row
})
const gall = (index) => {
    imageIndex.value = index
    setTimeout(() => {
        active.value = true
    }, 100);
}
const closeImage = () => {
    active.value = false
}
const nextSlide = () => {
    imageIndex.value = (imageIndex.value + 1) % props.options.length;
};
const prevSlide = () => {
  imageIndex.value =
    (imageIndex.value - 1 + props.options.length) % props.options.length;
};
</script>
<template>
    <div>
        <div 
            class="gallery-container"
            :style="{
                maxWidth: `${width}px`, 
                maxHeight: `${height}px`,
                backgroundColor: bgFon, 
                gridTemplateColumns: 
                    options.length < col ? 
                    `repeat(${options.length}, 1fr)` : 
                    `repeat(${col}, 1fr)`,
                gridTemplateRows: `repeat(${gridRow}, ${rowHeight}px)`,
            }"
        >
            <div 
                v-for="(item, index) in options" 
                :key="index" 
                class="showImage" 
                :style="{backgroundColor: bgFon}"
            >  
                <img v-if="item" @click="gall(index)" :src="item"> 
            </div>
        </div>
        <div 
            class="slider" 
            :class="{'slider_active': active}"
        >
            <div 
                class="slides" 
                :style="{ 
                    transform: `translateX(-${imageIndex * 200}%)`, 
                    gridTemplateColumns: `repeat(${options.length}, 100%)`
                }"
            >
                <img 
                    v-for="(slide, index) in options" 
                    :key="index" 
                    :src="slide"
                />
            </div>
            <button @click="closeImage">
                <Icon 
                    icon="material-symbols:close-rounded" 
                    class="image_close_icon" 
                    :style="{color: iconColor}"
                    :width="iconSize" 
                    :height="iconSize" 
                />
            </button>
            <button @click="prevSlide">
                <Icon 
                    icon="mingcute:left-fill" 
                    :width="iconSize" 
                    :height="iconSize"  
                    :style="{color: iconColor}" />
            </button>
            <button @click="nextSlide">
                <Icon 
                    icon="mingcute:right-fill" 
                    :width="iconSize" 
                    :height="iconSize"  
                    :style="{color: iconColor}" />
            </button>
        </div>
    </div>
</template>
<style scoped>
.gallery-container {
    position: relative;
    overflow: auto;
    display: grid;
    justify-content: space-between;
    gap: 10px;
}
.gallery-container::-webkit-scrollbar {
    width: 0;
}
.showImage {
    position: relative;
    transition: .3s;
}
.showImage img {
    width: 100%;
}
.showImage:hover {
    opacity: .9;
}
.icon_disabled {
    color: #d1d5db !important;
}
/* Slider styles */
.slider {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: -1;
    opacity: 0;
    transition: .3s;
}
.slider_active {
    z-index: 1;
    opacity: 1;
}
.slides {
    width: 90%;
    height: 100vh;
    display: grid;
    align-content: center;
    justify-items: center;
    gap: 100%;
    grid-template-rows: repeat(1, 80%);
    transition: transform 0.5s ease-in-out;
}
img {
    height: 100%;
    object-fit: cover;
}
.slider button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    cursor: pointer;
}
.slider button:nth-child(2) {
    top: 20px;
    right: 0;
}
.slider button:nth-child(3) {
    left: 10px;
}
.slider button:nth-child(4) {
    right: 10px;
}
</style>