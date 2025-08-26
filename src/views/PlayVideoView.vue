<script setup>
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { nextTick, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
const videoData = ref([])
const conRef = ref(null)
const boxes = ref([])
const route = useRoute()
let prevScrollY = 0
let prevId = 'id1'
const scrollOffset = ref(850)
const startVideo = ref(false)
const { t } = useI18n()
const getVideo = async () => {
    try {
        const res = await axios.get('http://localhost:4000/videos')
        if (res.status === 200) {
            videoData.value = res.data            
        }
    } catch (error) {
        console.log(error);
    }
}

const videoChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('video', file);
    
    try {
        await axios.post('http://localhost:4000/upload-video', formData);
        getVideo()
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    }
}

const directions = (text) => {
    let id = Number(route.hash.replace('#id', ''))
    const pause = document.querySelector(`#video${id}`)
    if (!pause) return
    if ((id >= 1 && text === 'down') || (id <= videoData.value.length && text === 'up')) {
        pause.muted = true
        pause.pause()
        pause.currentTime = 0
        pause.loop = false
        if (id >= 1 && text === 'down') {
            playVideo(id + 1)
        } else if (id <= videoData.value.length && text === 'up') {
            playVideo(id - 1)
        }
    }
}

function playVideo(id) {
    const play = document.querySelector(`#video${id}`)
    if (!play) return
    conRef.value.removeEventListener('scroll', scrollActive)
    window.location.hash = `id${id}`;
    play.muted = false
    play.play()
    play.loop = true
    setTimeout(() => {
        conRef.value.addEventListener('scroll', scrollActive)
    }, 500)
}


function scrollActive() {
    const scrollY = conRef.value.scrollTop
    if (scrollY > prevScrollY) {
        scrollOffset.value = 850
    } else if (scrollY < prevScrollY) {
        scrollOffset.value = 50
    }
    
    boxes.value.forEach(current => {
        const h2Height = current.offsetHeight
        const h2Top = current.offsetTop - conRef.value.offsetTop - scrollOffset.value
        const h2Id = current.getAttribute('id')
        if (scrollY > h2Top && scrollY <= h2Top + h2Height) {
            window.location.hash = `${h2Id}`
            if (prevId !== h2Id) {
                let oldId = Number(prevId.replace('id', ''))
                let newId = Number(h2Id.replace('id', ''))
                scrollVideo(oldId, newId)
            }
            prevId = h2Id
        }
    })
    prevScrollY = scrollY
}
function scrollVideo(oldId, newId) {
    const oldVideo = document.querySelector(`#video${oldId}`)
    const newVideo = document.querySelector(`#video${newId}`)
    if (!oldVideo && !newVideo) return
    oldVideo.muted = true
    oldVideo.pause()
    oldVideo.currentTime = 0
    oldVideo.loop = false
    newVideo.muted = false
    newVideo.play()
    newVideo.loop = true
}

function pauseVideo(videoId) {
    const video = document.querySelector(`#${videoId}`);
    if (video.paused) {
        video.muted = false
        video.play()
    }else {
        video.muted = true
        video.pause()
    }
}
const startVideoPlay = () => {
    startVideo.value = true
    let id = Number(route.hash.replace('#id', ''))
    playVideo(id)
}

onMounted(async () => {
    await getVideo()
    await nextTick()
    boxes.value = conRef.value.querySelectorAll('h2[id]')
    conRef.value.addEventListener('scroll', scrollActive)
    window.location.hash = `id1`;
})
</script>
<template>
    <div class="video-play">
        <div class="startVideo" :class="{'startVideoPlay' : startVideo}">
            <button @click="startVideoPlay">{{ t('project10.btn') }}</button>
        </div>
        <div class="container" ref="conRef">
            <h2 
                v-for="(item, index) in videoData" 
                :key="index" 
                :id="`id${index + 1}`"
                class="box"
            >
                <video
                    :id="`video${index +1}`"
                    @click="pauseVideo(`video${index + 1}`)"
                >
                    <source :src="item" />
                </video>
            </h2>
        </div>
        <div class="btns">
            <button @click="directions('up')">
                <Icon icon="solar:arrow-up-outline" width="24" height="24" />
            </button>
            <button @click="directions('down')">
                <Icon icon="solar:arrow-down-outline" width="24" height="24" />
            </button>
        </div>
    </div>
</template>
<style scoped>
    .video-play {
        width: 100%;
        height: 100vh;
        background-color: white;
        position: relative;
        color: #181818;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .startVideo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #0000006d;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
        z-index: 1;
        transition: .3s;
    }
    .startVideo button {
        padding: 7px 12px;
        background-color: #00bd7e;
        color: white;
        border-radius: 8px;
        font-size: 20px;
    }
    .startVideoPlay {
        transform: translateY(-100%);
    }
    .container {
        width: 500px;
        height: 95vh;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        scroll-behavior: smooth;
        overflow: auto;
        justify-content: start;
        align-items: center;
    }
    .container::-webkit-scrollbar {
        width: 0;
    }
    .box {
        width: 100%;
        min-height: 100%;
        border-radius: 20px;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .box video {
        width: 100%;
        height: 100%;
    }
    .btns {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .btns button {
        background-color: gainsboro;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }
</style>