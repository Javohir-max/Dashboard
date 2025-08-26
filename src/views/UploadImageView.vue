<script setup>
import { Icon } from '@iconify/vue';
import bgFon from './../assets/upload.png'
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Image from '@/components/Images.vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css'
import { useI18n } from 'vue-i18n';
import { watchEffect } from 'vue';
const {t} = useI18n()
const imageUp = ref(null)
const width = ref(null)
const height = ref(null)
const size = ref(null)
const fileName = ref('')
const getData = ref([])
const croppedImage = ref(null)
const activePruning = ref(false)
const cropWidth = ref(null)
const cropHeight = ref(null)
const getPost = async () => {
    try {
        const response = await axios.post('http://localhost:3000/images', {
            image: imageUp.value,
            name: fileName.value,
        })
        if (response.status == 201) {
            clear()
            setTimeout(() => {
                getImages()
            }, 200)
        }
    } catch (error) {
        console.log('❌ Ошибка при отправке:', error)
    }
}
const getImages = async () => {
    try {
        const response = await axios.get('http://localhost:3000/images')
        getData.value = response.data
    } catch (error) {
        console.log(error);
    }
}
const onFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    fileName.value = file.name
    size.value = file.size

    const reader = new FileReader()
    reader.onload = () => {
        imageUp.value = reader.result
        const img = new window.Image()
        img.onload = () => {
            width.value = img.width
            height.value = img.height
        }
        img.src = reader.result;
    }
    reader.readAsDataURL(file)
}
const linkImage = (image) => {
    const link = document.createElement('a')
    link.href = image
    link.download = 'image.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
const clear = () => {
    imageUp.value = null
    width.value = null
    height.value = null
    size.value = null
    fileName.value = ''
    croppedImage.value = null
    activePruning.value = false
}
const change = ({ coordinates, canvas }) => {
    if (canvas) {
        croppedImage.value = canvas.toDataURL('image/jpeg')
        cropWidth.value = coordinates.width
        cropHeight.value = coordinates.height
    }
}
const pruning = () => {
    if (croppedImage.value === null) {
        activePruning.value = true
    }else {
        imageUp.value = croppedImage.value
        getImage(imageUp.value)
        activePruning.value = false
        croppedImage.value = null
    }
}
const getImage = (base64) => {
  const img = new window.Image();

  img.onload = () => {
    const newWidth = img.width;
    const newHeight = img.height;
    const newSizeInBytes = Math.round((base64.length * 3) / 4 - (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0));
    width.value = newWidth
    height.value = newHeight
    size.value = newSizeInBytes
  };

  img.src = base64;
};
const close = () => {
    activePruning.value = false
    cropWidth.value = null
    cropHeight.value = null
    croppedImage.value = null
}
const delet = (id) => {
    axios.delete(`http://localhost:3000/images/${id}`)
        .then(() => {
            getImages()
        })
        .catch(error => {
            console.error('Ошибка при удалении изображения:', error)
        })
}

onMounted(() => {
    getImages()
})
</script>
<template>
    <div class="upload-container">
        <div class="c-left">
            <div class="container-img">
                <div class="c-img">
                    <input type="file" hidden id="file" @change="onFileChange">
                    <label v-if="!imageUp" for="file" class="up-image">
                        <img :src="bgFon" alt="">
                    </label>
                    <Cropper 
                        v-else-if="imageUp && activePruning"
                        :src="imageUp" 
                        @change="change"
                    />
                    <img v-else-if="imageUp && !activePruning" :src="imageUp" :class="{'he': height > width}" alt="">
                </div>
                <div class="pruning-size" :class="{'pruning-size-active': activePruning}">
                    <h2>{{ t('project9.text2') }} <b>({{ cropWidth }})</b></h2>
                    <button @click="close">{{ t('project9.btn5') }}</button>
                    <h2>{{ t('project9.text3') }} <b>({{ cropHeight }})</b></h2>
                </div>
                <h2 class="file-name">{{ t('project9.text1') }}: <b>{{ fileName }}</b></h2>
                <div class="c-edit">
                    <h2 class="edit-size">{{ t('project9.text4') }}: <b>{{ Math.floor(size / 1024) }}</b> (KB)</h2>
                    <input type="number" placeholder="Ширина (px)" v-model.number="width" :disabled="true">
                    <input type="number" placeholder="Высота (px)" v-model.number="height" :disabled="true">
                </div>
                <div class="c-btns">
                    <button @click="clear()">{{ t('project9.btn1') }}</button>
                    <button @click="pruning()" :disabled="!imageUp" :class="{'!bg-green-600': activePruning}">{{ activePruning ? t('project9.btn3'): t('project9.btn2') }} <Icon icon="ion:cut-outline" width="24" height="24"/></button>
                    <button @click="getPost()" :disabled="!imageUp && !fileName">{{ t('project9.btn4') }}</button>
                </div>
            </div>
        </div>
        <div class="c-right" id="downRight">
            <Image @deleteImage="delet" v-for="(item, index) in getData" :key="index" :option="item"/>
        </div>
    </div>
</template>
<style scoped>
    .upload-container {
        background-color: white;
        color: #181818;
        width: 100%;
        height: 100vh;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .c-left,
    .c-right {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .c-left .container-img {
        width: 450px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .c-img {
        height: 450px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .c-edit {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .c-edit input,
    .pruning-size h2 {
        width: 120px;
        background-color: rgb(223, 222, 222);
        padding: 5px 10px;
        outline: none;
        border: none;
        border-radius: 8px;
    }
    .pruning-size h2 {
        width: auto;
    }
    .pruning-size {
        height: 0;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        transition: .3s;
    }
    .pruning-size button {
        padding: 5px 12px;
        border-radius: 30px;
        background-color: orange;
        color: white;
        transition: .3s;
    }
    .pruning-size button:hover {
        opacity: .8;
    }
    .pruning-size button:active {
        transform: scale(.9);
    }
    .pruning-size-active {
        height: 35px;
        overflow: auto;
    }
    .c-btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .edit-size {
        padding: 5px 12px;
        background-color: rgb(223, 222, 222);
        border-radius: 8px;
    }
    .c-btns button {
        padding: 5px 12px;
        border-radius: 20px;
        color: white;
        text-transform: capitalize;
        transition: .3s;
    }
    .c-btns button:hover {
        opacity: .8;
    }
    .c-btns button:active {
        transform: scale(0.9);
    }
    .c-btns button:nth-child(1) {
        background-color: red;
    }
    .c-btns button:nth-child(2) {
        background-color: dodgerblue;
        display: flex;
        gap: 10px;
        align-items: center;
        background-color: dodgerblue;
    }
    .c-btns button:nth-child(3) {
        background-color: green;
    }
    .up-image {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 100px;
    }
    .file-name {
        width: 100%;
        background-color: rgb(223, 222, 222);
        border-radius: 8px;
        padding: 5px 0;
        text-align: center;
    }
    .c-img .he {
        height: 100%;
    }
    .c-right {
        flex-direction: initial;
        flex-wrap: wrap;
        align-items: start;
        align-content: start;
        gap: 15px;
        overflow: auto;
    }
    .c-right img {
        width: 200px;
    }
    .up-image img {
        cursor: pointer;
    }

</style>