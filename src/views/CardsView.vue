<script setup>
import { Icon } from '@iconify/vue';
import { nextTick, ref, } from 'vue';
import { useI18n } from 'vue-i18n';
const {t} = useI18n() 
const draverObj = ref({
    index: null,
    childIndex: null,
    active: false
})
const hidden = ref({
    text: '',
    index: null,
    childIndex: null
})
const oldIndex = ref(null)
const objectCards = ref([
    {
        text: 'project6.text1', code: 'planned', col: 'dodgerblue', work: [], sp: false
    },
    {
        text: 'project6.text2', code: 'progress', col: 'orange', work: [], sp: false
    },
    {
        text: 'project6.text3', code: 'abandoned', col: 'red', work: [], sp: false
    },
    {
        text: 'project6.text4', code: 'ido', col: 'green', work: [], sp: false
    }
])
const on = ref('')
const workIndex = ref(null)
const editName = ref({
    active: false,
    error: false,
    an: false
})
const card = ref({
    index: null,
    childI: null,
    active: null,
    space: false
})
const createBox = (im, index) => {
    on.value = im.code
    let boxData = {
        text: '',
        description: '',
        dis: false
    } 
    objectCards.value[index].work.push(boxData)
    setTimeout(() => {
        let len = objectCards.value[index].work.length 
        const input = document.getElementById(`inp${index}${len - 1}`);
        if (input) {
            input.focus();
        }
        scrollToBottom(index)
    }, 100);
}
const off = (index, child) => {
    objectCards.value[index].work.splice(child, 1);
}
const onBlur = (index, child) => {
    if (objectCards.value[index].work[child].text.length > 0) {
        objectCards.value[index].work[child].dis = true
    }else {
        objectCards.value[index].work.splice(child, 1);
        hidden.value.text = ''
        hidden.value.index = null
        hidden.value.childIndex = null
    }
}
const onMouseDown = (item, index, inde, event) => {
    if (event.target.classList.contains('iconify') || event.target.classList.contains('none') || event.target.nodeName === 'path') return;
    document.body.style.cursor = "grabbing";
    objectCards.value[index].sp = true
    hidden.value.text = item.text
    hidden.value.index = index
    hidden.value.childIndex = inde
    nextTick(() => { 
        const elem = document.getElementById(`box${index}${inde}`);
        const element = document.getElementById(`box${index}`);
        if (!element) return;
        let shiftX = event.clientX - elem.getBoundingClientRect().left;
        let shiftY = event.clientY - elem.getBoundingClientRect().top;
        let top = event.clientY - shiftY + "px"; 
        element.style.left = elem.offsetLeft + "px";
        element.style.top = top;
        element.style.position = "absolute";
        element.style.zIndex = 10;
        element.style.pointerEvents = "none";
        element.style.scale = "1.1";
        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + "px";
            element.style.top = pageY - shiftY + "px";
        }
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
        function offFunction() {
            if (workIndex.value !== null) {
                const targetList = objectCards.value[workIndex.value].work;
                const targetPos = card.value.childI
                const targetType = card.value.active
                if (targetPos >= 0 && targetType == true) {
                    targetPos + 1
                } else if (targetPos > 0 && targetType == false) {
                    targetPos - 1
                }
                if (card.value.space) {
                    objectCards.value[index].work.splice(inde, 1);
                    targetList.splice(targetPos, 0, item)
                }else {
                    objectCards.value[workIndex.value].work.push(item)
                    objectCards.value[index].work.splice(inde, 1);
                }
                setTimeout(() => {
                    scrollToBottom(workIndex.value);
                }, 100);
            } else  {
                setTimeout(() => {
                    scrollToBottom(index);
                }, 100);
            }
            oldIndex.value = null
            card.value.active = null
            card.value.index = null
            card.value.childI = null
            card.value.space = false
            hidden.value.text = ''
            hidden.value.index = null
            hidden.value.childIndex = null
            objectCards.value[index].sp = false
            element.style.position = "static";
            element.style.zIndex = "initial";
            element.style.pointerEvents = "auto";
            document.body.style.cursor = "default";
            element.style.scale = "1";
            setTimeout(() => {
                element.style.left = element.offsetLeft + "px";
                element.style.top = element.offsetTop + "px";
            }, 200);
            onMouse(index)
            document.removeEventListener("mousemove", onMouseMove);
        }
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", () => {
            offFunction();
            document.removeEventListener("mouseup", offFunction);
        }, { once: true });
    });
};

const scrollToBottom = (id) => {
    const container = document.getElementById(`scroll${id}`);
    if (!container) return
    const targetScroll = container.scrollHeight - container.clientHeight;
    const step = 15;
    const interval = setInterval(() => {
        container.scrollTop += step;
        if (container.scrollTop >= targetScroll) {
            clearInterval(interval);
        }
    }, 15);
};
const edit = (index, childIndex) => {
    draverObj.value.index = index
    draverObj.value.childIndex = childIndex
    draverObj.value.active = true
}
const draverClose = (e) => {
    if (e.target.classList.contains('c-draver-con-active')) {
        (editName.value.error) ? saveName(draverObj.value) : draverObj.value.active = false
    }
} 
const clear = () => {
    objectCards.value[draverObj.value.index].work[draverObj.value.childIndex].description = ''
}
function onMouse(index, event) {
    const cursor = getComputedStyle(document.body).cursor;
    if (cursor !== 'grabbing') return
    workIndex.value = index
    if (event.target.classList.contains('w-bottom')) {
        if (index !== oldIndex.value) card.value.space = false
    }
}
function openSpace(fatherIndex, index, event) {
    const cursor = getComputedStyle(document.body).cursor;
    if (cursor !== 'grabbing') return
    let Y = event.target.offsetHeight / 2
    if (Y < event.offsetY) {
        card.value.active = true
    }else {
        card.value.active = false
    }
    card.value.childI = index
    card.value.index = fatherIndex
    card.value.space = true
    oldIndex.value = fatherIndex
}
const mouseLv = (index) => {
    workIndex.value = null
    oldIndex.value = index
}
const openSave = (num) => {
    editName.value.active = true
    setTimeout(() => {
        let editInp = document.getElementById(`ed${num.index}${num.childIndex}`)
        if (editInp) {   
            editInp.focus()
        }
    }, 100)
}
const saveName = (num) => {
    let text = objectCards.value[num.index].work[num.childIndex].text
    if (text.length == 0) {
        editName.value.error = true
        editName.value.an = true
        setTimeout(() => {
            editName.value.an = false
        }, 510)
    }else {
        editName.value.error = false
        editName.value.active = false
    }
}
const edInp = (e) => {
    (e.target.value.length == 0) ? editName.value.error = true : editName.value.error = false
}
</script>
<template>
    <div class="c-con select-none phone:!h-auto">
        <div 
            @click="draverClose($event)"
            class="c-draver-con" 
            :class="{ 'c-draver-con-active': draverObj.active }"
        >
            <div 
                class="c-draver phone:!w-[75%]" 
                :class="{'c-draver-active': draverObj.active}"
            >
                <div 
                    v-if="draverObj.active" 
                    class="draver-close"
                >
                    <h1 
                        v-if="!editName.active"
                        class="draver-title"
                        @click="openSave(draverObj)"
                    >
                        {{ objectCards[draverObj.index].work[draverObj.childIndex].text }}
                    </h1>
                    <input 
                        v-else
                        type="text"
                        class="edit-name"
                        :id="`ed${draverObj.index}${draverObj.childIndex}`"
                        v-model="objectCards[draverObj.index].work[draverObj.childIndex].text"
                        :class="{'err-inp': editName.error, 'inp-animation': editName.an}"
                        :placeholder="t('project6.inptxt')"
                        @input="edInp"
                        @blur="saveName(draverObj)"
                    >
                    <button 
                        class="draver-close-btn" 
                        @click="(editName.error) ? saveName(draverObj) : draverObj.active = false"
                    >
                        <Icon 
                            icon="material-symbols:close-rounded" 
                            width="24" 
                            height="24" 
                            class="icon-close"
                        />
                    </button>
                </div>
                <textarea 
                    v-if="draverObj.active"
                    class="des" 
                    :placeholder="t('project6.textarea')" 
                    v-model="objectCards[draverObj.index].work[draverObj.childIndex].description"
                ></textarea>
                <button @click="clear" class="draver-btn">{{ t('project6.btn') }}</button>
            </div>
        </div>
            
        <div 
            class="
                c-box 
                phone:!w-[95%] 
                phone:!h-auto
                phone:!grid-cols-[repeat(1,_1fr)] 
                phone:!grid-rows-[repeat(4,_400px)] 
            "
        >
            <div 
                v-for="(item, index) in objectCards" 
                :key="index" 
                class="c-work"   
            >
                <div class="w-head">
                    <div class="left">
                        <div 
                            :style="{backgroundColor: item.col}" 
                            class="circ"
                        ></div>
                        <span>{{ t(item.text) }}</span>
                    </div>
                </div>
                <div 
                    class="w-bottom"
                    @mousemove="onMouse(index, $event)"
                    @mouseleave="mouseLv(index)"
                    :id="`scroll${index}`"
                    :data-index="index"
                    :class="{'boxSH': index === workIndex}"
                >
                <div
                    class="w-box pos phone:!w-[270px]"
                    :id="`box${index}`"
                    v-if="hidden.index === index"
                >
                    <div class="inp">
                        <h2 class="disAc">{{ hidden.text }}</h2>
                        <button>
                            <Icon 
                                icon="cuida:edit-outline" 
                                width="24" 
                                height="24" 
                            />
                        </button>
                        <button>
                            <Icon 
                                icon="material-symbols:close-rounded" 
                                width="24" 
                                height="24" 
                            />
                        </button>
                    </div>
                </div>
                <div v-for="(ice, inde) in item.work" 
                    :key="inde" 
                    class="w-box phone:!w-[270px]"
                    :id="`box${index}${inde}`"
                    @mousedown="onMouseDown(ice, index, inde, $event)"
                    @mousemove="openSpace(index, inde, $event)"
                    :class="{
                        'opacity-30': index == hidden.index && inde == hidden.childIndex,
                        'mb-20': index == card.index && inde == card.childI && card.active == true, 
                        'mt-20': index == card.index && inde == card.childI && card.active == false 
                    }"
                >
                    <div class="inp">
                        <input 
                            v-if="ice.dis === false"
                            type="text" 
                            :id="`inp${index}${inde}`" 
                            @blur="onBlur(index, inde)"
                            @keydown.enter="onBlur(index, inde)" 
                            :placeholder="t('project6.inptxt')" 
                            v-model="ice.text" 
                            :disabled="ice.dis"
                        >
                        <h2 v-else class="disAc">{{ ice.text }}</h2>
                        <button @click="edit(index, inde)">
                            <Icon 
                                icon="cuida:edit-outline" 
                                width="24" 
                                height="24" 
                            />
                        </button>
                        <button @click="off(index, inde)">
                            <Icon 
                                icon="material-symbols:close-rounded" 
                                width="24" 
                                height="24" 
                            />
                        </button>
                    </div>
                </div>
                    <button 
                        @click="createBox(item, index)" 
                        class="c-create"
                    >
                        + {{ t('project6.text5') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.c-con {
    width: 100%;
    height: 100%;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}    
.c-draver-con {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    transition: .3s;
}
.c-draver-con-active {
    z-index: 1;
    opacity: 1;
}
.c-draver {
    width: 25%;
    height: 100vh;
    background-color: white;
    position: fixed;
    top: 0;
    right: -25%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    transition: .3s;
}
.c-draver-active {
    right: 0;
    border-radius: 10px 0 0 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
.draver-close {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 0;
    border-bottom: 3px solid rgba(128, 128, 128, 0.3);
}
.draver-title {
    color: rgba(0, 0, 0, 0.9);
    font-weight: 800;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
}
.draver-close-btn {
    background-color: rgba(0, 0, 0, 0.05);
    border: none;
    border-radius: 50%;
    padding: 5px;
    color: rgba(0, 0, 0, 0.9);
    transition: .3s;
}
.draver-close-btn:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
.c-draver .des {
    width: 100%;
    height: 500px;
    background-color: rgb(240, 240, 240);
    border-radius: 8px;
    border: none;
    outline: none;
    padding: 10px;
    font-size: 18px;
    color: black;
    resize: none;
}
.draver-btn {
    width: 30%;
    padding: 5px 0;
    border-radius: 20px;
    font-size: 18px;
    background-color: red;
    color: white;
    transition: .3s;
}
.draver-btn:hover {
    opacity: .7;
}
.c-box {
    width: 85%;
    height: 95vh;
    padding: 10px;
    background-color: rgba(128, 128, 128, 0.15);
    border-radius: 8px;
    border: 8px solid rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 426px);
    gap: 20px;
}
.c-work {
    height: 100%;
    border: 3px solid rgba(128, 128, 128, 0.3);
    border-radius: 10px;
}
.w-head {
    width: 100%;
    height: 50px;
    border-bottom: 3px solid rgba(128, 128, 128, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 7%;
}
.w-head .left {
    display: flex;
    align-items: center;
    gap: 10px;
}
.circ {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
.w-head span {
    color: rgba(0, 0, 0, 0.9);
    font-weight: 800;
}
.c-dis {
    background-color: lightgray !important;
}
.w-bottom {
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    transition: .3s;
}
.w-bottom .c-create {
    height: 34px;
    padding: 5px 8px;
    border-radius: 20px;
    background-color: dodgerblue;
    color: white;
    transition: .3s;
}
.w-bottom button:hover {
    opacity: .7;
}
.w-box {
    width: 510px;
    min-height: 100px;
    background-color: whitesmoke;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px 10px 10px;
    cursor: grab;
}
.pos {
    position: fixed;
    opacity: .7;
}
.w-box .inp {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}
.w-box .inp input {
    width: 100%;
    height: 100%;
    background-color: rgb(238, 238, 238);
    border-radius: 8px;
    font-size: 18px;
    outline: none;
    border: none;
    color: black;
    z-index: initial;
    padding: 5px 8px;
    text-align: center;
}
.inp button {
    padding: 5px 8px;
    border-radius: 20px;
    transition: .3s;
}
.inp button:nth-child(2) {
    background-color: green;
    color: white;
}
.inp button:nth-child(3) {
    background-color: red;
    color: white;
}
input:focus {
    outline: 1px solid dodgerblue;
}
.w-bottom .sp {
    min-height: 100px;
    width: 510px;
}
.disAc {
    width: 370px;
    height: 100%;
    text-align: center;
    background-color: rgb(240, 240, 240);
    border-radius: 8px;
    padding: 5px 8px;
    font-size: 18px;
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
}
.boxSH {
    background-color: rgba(30, 143, 255, 0.082);
}
.edit-name {
    background-color: transparent;
    padding: 5px 8px;
    font-weight: 700;
    outline: none !important;
    border-radius: 8px;
    transition: .3s;
}
.edit-name:focus {
    background-color: rgb(243, 243, 243);
}
.err-inp {
    border: 1px solid red;
    background-color: rgb(243, 243, 243);
}
.inp-animation {
    animation: err .5s 1 ease-in-out;
}
@keyframes err {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(3%);
    }
    50% {
        transform: translateX(-3%);
    }
    75% {
        transform: translateX(3%);
    }
    100% {
        transform: translateX(0);
    }
}
</style>