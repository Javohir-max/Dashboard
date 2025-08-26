<script setup>
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { computed, inject, onMounted, ref } from 'vue';
import Advertising from './Advertising.vue';
import CompImage from '@/MyComponents/CompImage.vue';
const discuss = inject('discuss')
const chatData = ref([])
const message = ref('')
const date = new Date()
const messageContainer = ref([])
const logo = `
    data:image/png;base64,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
`
const chatShow = ref(null)  
const scroll = ref(null)
const focus = ref(null)
const getChat = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/advertising/${id}`)
        if (response.status === 200) {
            chatData.value = response.data    
            messageContainer.value = response.data.chat
        }
        const chatdate = response.data.chat
        chatShow.value = chatdate.reduce((acc, item) => {
            if (!acc[item.date]) acc[item.date] = [];
            acc[item.date].push(item);
            return acc;
        }, {});
        setTimeout(() => {
            maxScroll()
        },100)
    } catch (error) {
        console.log(error);
    }
}
const dateTime = computed(() => {
    let time = date.getHours() < 10 ? `0${date.getHours()}`: date.getHours()
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()
    return `${time}:${minutes}`
})
const dateDay = computed(() => {
    let day = date.getDate() < 10 ? `0${date.getDate()}`: date.getDate()
    let month = date.getMonth() +1 < 10 ? `0${date.getMonth() +1}`: date.getMonth() +1
    return `${day}.${month}.${date.getFullYear()}`
})
const messageSend = async (id) => {
    let newMessage = {
        message: message.value,
        time: dateTime.value,
        date: dateDay.value,
        logo: logo
    }
    messageContainer.value.push(newMessage)
    try {
        const response = await axios.put(`http://localhost:3000/advertising/${id}`, {
            image: chatData.value.image,
            description: chatData.value.description, 
            time: chatData.value.time,
            day: chatData.value.day,
            cotegory: chatData.value.cotegory,
            icon: chatData.value.icon,
            logo: chatData.value.logo,
            chat: messageContainer.value
        })
        if (response.status === 200) {
            message.value = ''
            getChat(discuss.value.id)
            focus.value.focus()
        }
    } catch (error) {
        console.log(error);
    }
}
const back = () => {
    discuss.value.active = false
    discuss.value.id = null
}
const maxScroll = () => {
    scroll.value.scrollTo({
        top: scroll.value.scrollHeight,
        behavior: 'smooth'
    })
}
const test = () => {
    console.log('test');
}
onMounted(() => {
    getChat(discuss.value.id)
})
</script>
<template>
    <div class="discuss">
        <div class="back-and-search">
            <button @click="back()" class="back">
                <Icon icon="uiw:left" width="20" height="20"/>
                <span>Назад</span>
            </button>
            <div class="serach-box">
                <label for="ser">
                    <Icon icon="iconoir:search" width="24" height="24" style="color: #475569;"/>
                </label>
                <input type="text" placeholder="Поиск по агентством" id="ser"/>
            </div>
        </div>
        <div ref="scroll" class="content">
            <Advertising :options="chatData" noDiscussion/>
            <div v-for="(items, date) in chatShow" :key="date" class="all-container">
                <div class="date">
                    <hr>
                    <h3>{{ date === dateDay ? 'Сегодня' : date }}</h3>
                    <hr>
                </div>
                <div v-for="(item, index) in items" :key="index" class="message-container">
                    <CompImage v-if="item.logo" :src="item.logo" width="40px" height="40px"/>
                    <div class="message">
                        <h2>{{ item.message }}</h2>
                        <span>{{ item.time }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="send-message">
            <input type="text" ref="focus" @keydown.enter="message ? messageSend(discuss.id) : null" placeholder="Введите сообщения" v-model="message">
            <button type="submit" :disabled="!message" @click="messageSend(discuss.id)">Отправить</button>
        </div>
    </div>
</template>
<style scoped>
.discuss {
    width: 768.3px;
    height: 885px;
    background-color: white;
    position: fixed;
    border-radius: 8px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 16px;
}
.discuss .back-and-search {
    width: 100%;
    display: flex;
    padding: 12px 20px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #EAECF0;
}
.discuss .back-and-search .back {
    display: flex;
    gap: 8px;
    align-items: center;
    background-color: transparent;
    padding: 8px 16px;
    color: #475569;
}
button {
    transition: .3s;
}
button:hover {
    opacity: 0.8;
}
.discuss .back-and-search .back span {
    font-family: Mulish;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
}
.discuss .back-and-search .serach-box {
    height: 40px;
    display: flex;
    align-items: center;
    gap: 6.4px;
    padding: 0 16px 0 6.4px;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
}
.back-and-search .serach-box input {
    width: 100%;
    height: 100%;
    font-family: Mulish;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #475569;
    outline: none;
    border: none;
    background-color: transparent;
}
.serach-box input::placeholder {
    font-size: 16px;
    color: #475569;
}
.discuss .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 25px 20px;
    overflow: auto;
}
.discuss .content::-webkit-scrollbar {
    width: 5px;
}
.discuss .content::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 5px;
}
.discuss .content .all-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.discuss .content .date {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}
.content .date h3 {
    font-family: Mulish;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
    text-align: center;
    color: #838C97;
}
.content .date hr {
    width: 100%;
    background-color: #EAECF0;
}
.discuss .content .message-container {
    display: flex;
    align-items: end;
    gap: 12px;
}
.content .message-container .message {
    min-width: 100px;
    max-width: 586px;
    padding: 8px;
    background-color: #EDF1F6;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: start;
    border-radius: 8px;
}
.message-container .message h2 {
    font-family: Mulish;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
    color: #475569;
}
.message-container .message span {
    font-family: Mulish;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0%;
    color: #838C97;
}
.discuss .send-message {
    width: 729px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 8px 14px;
    border: 1px solid #EAECF0;
    align-items: center;
    margin: 0 auto;
    border-radius: 8px;
}
.discuss .send-message input {
    width: 100%;
    font-family: Mulish;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
    color: #838C97;
    outline: none;
    border: none;
}
.discuss .send-message input::placeholder {
    font-size: 14px;
    color: #838C97;
}
.discuss .send-message button {
    background-color: transparent;
    padding: 10px 0;
    font-family: Mulish;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
    text-align: center;
    color: #6E7C87;
}
</style>