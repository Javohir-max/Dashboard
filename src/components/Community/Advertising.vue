<script setup>
import CompImage from '@/MyComponents/CompImage.vue';
import { Icon } from '@iconify/vue';
import { inject, ref } from 'vue';

const look = inject('look')
const deleteAdvertising = inject('deleteAdvertising')
const discuss = inject('discuss')
const otherActive = ref(false)
const props = defineProps({
    options: {
        type: Object,
        required: true
    },
    noDiscussion: {
        type: Boolean,
        default: false
    }
})
const closeBlur = () => {
    setTimeout(() => {
        otherActive.value = false
    }, 100);
}
const otherBtn = (id) => {
    if (id === otherActive.value) {
        otherActive.value = false
    }else {
        otherActive.value = true
    }
}
const delBtn = (id) => {
    deleteAdvertising.value.active = true
    deleteAdvertising.value.id = id
    deleteAdvertising.value.delComp = true
}
const edit = (id) => {
    look.value.active = true
    look.value.id = id
    look.value.put = true
}
const openDiscuss = (id) => {
    discuss.value.active = true
    discuss.value.id = id
}
</script>
<template>
    <div class="advertising">
        <div class="cards">
            <CompImage v-if="options.logo" :src="options.logo" width="40px" height="40px" style="border-radius: 50%; overflow: hidden;"/> 
            <div class="card">
                <CompImage v-if="options.image" :src="options.image" width="372px" height="372px" style="border-radius: 12px 12px 0 0; overflow: hidden;"/>
                <div class="center" :class="{'bottom-radius': noDiscussion}">
                    <div class="name-and-other">
                        <h2>Hourglass</h2>
                        <div class="other-con">
                            <button class="other-btn" @click="otherBtn(options.id)" @blur="closeBlur">
                                <Icon icon="basil:other-1-outline" width="24" height="24" style="transform: rotate(90deg); color: #475569;" />
                            </button>
                            <div class="other-show" :class="{'show-active': otherActive}">
                                <button @click="delBtn(options.id)">
                                    <Icon icon="solar:trash-bin-2-outline" width="24" height="24"/>
                                    <span>Удалить</span>
                                </button>
                                <button @click="edit(options.id)">
                                    <Icon icon="iconamoon:edit-light" width="24" height="24"/>
                                    <span>Редактировать</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <textarea :disabled="true" class="description" v-model="options.description"></textarea>
                    <div class="time-and-historyUpdate">
                        <h3>{{ options.time }}</h3>
                        <p>История обновлений</p>
                    </div>
                </div>
                <button v-if="!noDiscussion" @click="openDiscuss(options.id)" class="bottom">
                    <div class="text-and-icon">
                        <Icon icon="mage:message-dots-round" width="20" height="20"/>
                        <h3>Обсудить</h3>
                    </div>
                    <Icon icon="mingcute:right-line" width="16" height="16" style="color: #212121;"/>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.advertising .cards {
    display: flex;
    align-items: end;
    gap: 12px;
}
.advertising .cards .card {
    width: 372px;
}
.cards .card .center {
    width: 100%;
    padding: 12px 12px 16px;
    background-color: #F5F7FA;
}
.cards .card .bottom-radius {
    border-radius: 0 0 8px 8px;
}
.card .center .name-and-other {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.center .name-and-other h2 {
    padding: 4px 8px;
    border-radius: 28px;
    font-family: Mulish;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0%;
    color: #403E94;
    background-color: #F0F0FE;
}
.center .name-and-other .other-con {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: -12px;
    position: relative;
}
.name-and-other .other-con .other-btn {
    width: 100%;
    height: 100%;
    border-radius: 50px;
    overflow: hidden;
}
.name-and-other .other-con .other-show {
    width: 290px;
    height: 0;
    background-color: #FFFFFF;
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px #1018280F;
    box-shadow: 0px 1px 3px 0px #1018281A;
    position: absolute;
    top: 25px;
    right: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: .3s;
}
.name-and-other .other-con .show-active {
    overflow: initial;
    padding: 8px 0;
    height: 128px;
}
.other-con .other-show button {
    padding: 16px 12px;
    display: flex;
    gap: 12px;
    align-items: center; 
    color: #212121;
    transition: .3s;
}
.other-show button span {
    font-family: Mulish;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
}
.other-con .other-show button:nth-child(1) {
    color: #F2376F;
}
.other-con .other-show button:hover {
    opacity: .8;
    background-color: rgb(245, 245, 245);
}
.card .center .description {
    width: 330px;
    height: 120px;
    margin: 10px 0;
    font-family: Mulish;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0%;
    color: #212121;
    resize: none;
    background-color: transparent;
    overflow: none;
}
.card .center .description::-webkit-scrollbar {
    width: 0;
}
.card .center .time-and-historyUpdate {
    width: 100%;
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.center .time-and-historyUpdate h3 {
    font-family: Mulish;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0%;
    color: #868F9C;
}
.center .time-and-historyUpdate p {
    font-family: Mulish;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: center;
    text-decoration: underline;
    text-decoration-style: solid;
    text-decoration-thickness: Auto;
    color: #475569;
}
.cards .card .bottom {
    width: 100%;  
    display: flex;
    padding: 11px 12px;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #D0D5DD;
    background-color: #F8F9FB;
    border-radius: 0 0 8px 8px;
}
.card .bottom .text-and-icon {
    display: flex;
    gap: 8px;
    align-items: center;
    color: #212121;
}
.bottom .text-and-icon h3 {
    font-family: Mulish;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0%;
}
</style>