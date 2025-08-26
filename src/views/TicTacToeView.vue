<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
const landscapeMap = ref({
    A: [
        {
            name: '',
            code: 'A1',
            dis: false,
            win: false
        },
        {
            name: '',
            code: 'A2',
            dis: false,
            win: false
        },
        {
            name: '',
            code: 'A3',
            dis: false,
            win: false
        }
    ],
    B: [
        {
            name: '',
            code: 'B1',
            dis: false,
            win: false
        },
        {
            name: '',
            code: 'B2',
            dis: false,
            win: false
        },
        {
            name: '',
            code: 'B3',
            dis: false,
            win: false
        }
    ],
    C: [
        {
            name: '',
            code: 'C1',
            dis: false,
            win: false
        },
        {
            name: '',
            code: 'C2',
            dis: false,
            win: false
        },
        {
            name: '',
            code: 'C3',
            dis: false,
            win: false
        }
    ],
})
const type = ref(false)
const active  = ref(false)
const arrCordinat = ref(['A1','A2','A3','B1','B2','B3','C1','C2','C3',])
const crossArr = ref([])
const zeroArr = ref([])
const winTactic = [
    {
        A: 'A1',
        B: 'B1',
        C: 'C1',
    },
    {
        A: 'A2',
        B: 'B2',
        C: 'C2',
    },
    {
        A: 'A3',
        B: 'B3',
        C: 'C3',
    },
    {
        A: 'A1',
        B: 'A2',
        C: 'A3',
    },
    {
        A: 'B1',
        B: 'B2',
        C: 'B3',
    },
    {
        A: 'C1',
        B: 'C2',
        C: 'C3',
    },
    {
        A: 'A1',
        B: 'B2',
        C: 'C3',
    },
    {
        A: 'A3',
        B: 'B2',
        C: 'C1',
    },
]
const winner = ref({
    cross: false,
    zero: false,
    win: null
})
const stactic = {
    map: {
        A: [
            {
                name: '',
                code: 'A1',
                dis: false,
                win: false
            },
            {
                name: '',
                code: 'A2',
                dis: false,
                win: false
            },
            {
                name: '',
                code: 'A3',
                dis: false,
                win: false
            }
        ],
        B: [
            {
                name: '',
                code: 'B1',
                dis: false,
                win: false
            },
            {
                name: '',
                code: 'B2',
                dis: false,
                win: false
            },
            {
                name: '',
                code: 'B3',
                dis: false,
                win: false
            }
        ],
        C: [
            {
                name: '',
                code: 'C1',
                dis: false,
                win: false
            },
            {
                name: '',
                code: 'C2',
                dis: false,
                win: false
            },
            {
                name: '',
                code: 'C3',
                dis: false,
                win: false
            }
        ],
    },
    cor: ['A1','A2','A3','B1','B2','B3','C1','C2','C3',]
}
let intervalID = null

const clickBox = (item, index, childI) => { 
    let newName;
    if (type.value) {
        newName = '0'
        zeroArr.value.push(item)
        zeroTest()
    } else {
        newName = 'X'
        crossArr.value.push(item)
        crossTest()
    }
    landscapeMap.value[index][childI].name = newName
    landscapeMap.value[index][childI].dis = true
    type.value = !type.value
    textResult(item)
}
function ac() {
    const randomElement = arrCordinat.value[Math.floor(Math.random() * arrCordinat.value.length)];
    let box = document.getElementById(`btn${randomElement}`)
    let index = box.dataset.index
    let childI = box.dataset.childI
    setTimeout(() => {
        clickBox(randomElement, index, childI)
    }, 300);
}
const winners = () => {
    let count = 0
    intervalID = setInterval(() => {
        winCol(count)
        count++
        if (count > 2) {
            clearInterval(intervalID)
        }    
    }, 200);
    setTimeout(() => {
        off()
    }, 600)
}
function off() {
    setTimeout(() => {
        active.value = true
    }, 200);
}
function crossTest() {
    const filtered = winTactic.filter(obj => {
        return Object.values(obj).every(val => crossArr.value.includes(val));
    });
    winner.value.cross = filtered.length > 0
    winner.value.win = filtered
    
}
function zeroTest() {
    const filtered = winTactic.filter(obj => {
        return Object.values(obj).every(val => zeroArr.value.includes(val));
    });
    winner.value.zero = filtered.length > 0
    winner.value.win = filtered
}
function winCol(col) {
    let simvol;
    let element;
    const path = winner.value.win[0]
    if (col === 0) {
        simvol = path.A[0]
        element = path.A
        
    }else if (col === 1) {
        simvol = path.B[0]
        element = path.B
        
    } else if (col === 2) {
        simvol = path.C[0]
        element = path.C
        
    }
    landscapeMap.value[simvol] = landscapeMap.value[simvol].map(us => {
        if (us.code === element) {
            return { ...us, win: true }
        }
        return us   
    })
    
}
const block = (code) => {
    const box = document.getElementById(`btn${code}`);
    if (!box) {
        console.warn(`Не найден элемент с id="btn${code}"`);
        return;
    }
    const index = box.dataset.index;
    const childI = box.dataset.childI;
    setTimeout(() => {
        clickBox(code, index, childI);
    }, 300);
};
const check = (arr, item, count = 0) => {
    if (count >= arr.length) {
        ac(item);
        return;
    }
    const current = arr[count];
    const zArr = zeroArr.value.filter(fl => fl === current);
    if (zArr.length < 1) {
        block(current);
    } else {
        check(arr, item, count + 1);
    }
};
const textResult = (item) => {
    let a = arrCordinat.value.indexOf(item)
    arrCordinat.value.splice(a, 1)
    if (winner.value.cross == true) return winners()
    if (winner.value.zero == true) return winners()
    if (type.value !== true) return
    if (arrCordinat.value.length === 0) return off()
    let winMove = winResult()
    if (winMove.length > 0) return block(winMove[0])
    let res = winTactic
        .filter(obj => {
            const matchCount = Object.values(obj).filter(val => crossArr.value.includes(val)).length;
            return matchCount === 2;
        })
        .map(obj => {
            const entries = Object.entries(obj);
            const missing = entries.find(([key, val]) => !crossArr.value.includes(val));
            return missing[1]
        });
        
    if (res.length > 0) {
        check(res, item)
    }else {
        ac()
    }
};
const winResult = () => {
    let res = winTactic
        .filter(obj => {
            const matchCount = Object.values(obj).filter(val => zeroArr.value.includes(val)).length;
            return matchCount === 2;
        })
        .map(obj => {
            const entries = Object.entries(obj);
            const missing = entries.find(([key, val]) => !zeroArr.value.includes(val));
            return missing[1]
        });
    return arrCordinat.value.filter(item => res.includes(item))
};
const reset = () => {
    landscapeMap.value = structuredClone(stactic.map)
    arrCordinat.value = structuredClone(stactic.cor)
    crossArr.value = []
    zeroArr.value = []
    winner.value.cross = false
    winner.value.zero = false
    winner.value.win = null
    type.value = false
    active.value =  false
}
</script>
<template>
    <div class="tic-container">
        <h1>{{ t('project7.title') }}</h1>
        <div 
            class="container phone:scale-75" 
            :class="{'class_stop': type}"
        >
            <div 
                class="blur_box" 
                :class="{'class_active': !active}"
            >
                <h2 
                    class="icons-style" 
                    v-if="active && winner.cross == true && winner.zero == false"
                >
                    {{ t('project7.text2') }} 
                    <Icon 
                        icon="maki:cross" 
                        width="46" 
                        height="46" 
                    />
                </h2>
                <h2 
                    class="icons-style" 
                    v-if="active && winner.cross == false && winner.zero == true"
                >
                    {{ t('project7.text2') }} 
                    <Icon 
                        icon="material-symbols:exposure-zero" 
                        width="56" 
                        height="56" 
                    />
                </h2>
                <h2 
                    class="icons-style" 
                    v-if="active && winner.cross == false && winner.zero == false"
                >
                    {{ t('project7.text1') }}
                    <Icon 
                        icon="maki:cross" 
                        width="46" 
                        height="46" 
                    />
                    <Icon 
                        icon="vaadin:handshake" 
                        width="46" 
                        height="46" 
                    />
                    <Icon 
                        icon="material-symbols:exposure-zero" 
                        width="56" 
                        height="56" 
                    />
                </h2>
            </div>
            <div 
                v-for="(context, index) in landscapeMap" 
                :key="index" 
                class="box"
            >
                <button 
                    v-for="(item, childI) in context" 
                    :key="childI" 
                    :data-index="index" 
                    :data-child-I="childI" 
                    :id="`btn${item.code}`" 
                    class="childBox" 
                    @click="clickBox(item.code, index, childI)" 
                    :disabled="item.dis"
                    :class="{'disabled': item.dis, 'winBtn': item.win}"
                >
                    <h3 class="boxName">{{ item.code }}</h3>
                    <h1 class="newName">{{ item.name }}</h1>
                </button>
            </div>
        </div>
        <div class="res-con">
            <button 
                @click="reset()" 
                class="res-btn"
            >
                {{ t('project7.btn') }}
            </button>
        </div>
    </div>
</template>
<style scoped>
.tic-container {
    width: 100%;
    height: 100vh;
    background-color: white;
    color: #181818;
    padding: 12px;
    user-select: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}
.container {
    width: 360px;
    height: 360px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    transition: all .3s;
}
.blur_box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(5px);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .3s;
}
.container::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
}
.class_active {
    top: -100%;
}
.class_stop::before {
    z-index: 1;
}
.box {
    width: 100%;
    height: 105px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.childBox {
    width: 105px;
    height: 100%;
    border: 3px solid red;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 13px;
    transition: .3s;
}
.childBox:hover {
    border: 3px solid blue;
}
.boxName {
    position: absolute;
    top: 5px;
    left: 5px;
}
.newName {
    font-size: 32px;
    font-weight: 800;
}
.disabled {
    border: 3px solid gray;
}
.disabled:hover {
    border: 3px solid gray !important;
}
.winBtn {
    border-color: green;
    color: green;
}
.icons-style {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    font-size: 32px;
    font-weight: 700;
    color: green;
}
.res-con {
    width: 100%;
    display: flex;
    justify-content: center;
}
.res-btn {
    padding: 8px 12px;
    border-radius: 12px;
    background-color: #2563eb;
    color: white;
    transition: .2s;
}
.res-btn:hover {
    opacity: .8;
}
.res-btn:active {
    transform: scale(.95);
}
</style>