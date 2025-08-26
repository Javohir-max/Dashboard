<script setup>
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

const props = defineProps({
    option: {
        type: Object,
        required: true
    }
})
const screen = defineModel()
const emit = defineEmits(['lang'])
const active = ref(false)
const object = ref({})
const blur = () => {
    setTimeout(() => {
        active.value = false
    }, 100)
}
const lang = (item) => {
    object.value = item
    emit('lang', item)
}
onMounted(() => {
    lang(props.option[0])
})
</script>
<template>
    <div 
        class="select-lang" 
        :class="{'screen-select': screen}"
    >
        <div class="head">
            <button 
                class="head-btn" 
                :class="{'screen-btn': screen}" 
                @click="active = !active" 
                @blur="blur"
            >
                <Icon 
                    :icon="object.flag" 
                    width="30" 
                    height="30" 
                />
                <span 
                    v-if="!screen" 
                    class="green"
                >
                    {{ object.name }}
                </span>
                <Icon 
                    v-if="!screen" 
                    :icon="active ? 'mingcute:down-line' : 'mingcute:right-line'" 
                    width="35" 
                    height="35" 
                    style="color: #00bd7e;"
                />
            </button>
        </div>
        <div 
            class="body" 
            :class="{'body-active': !active}"
        >
            <ul>
                <li 
                    v-for="(item, index) in props.option" 
                    :class="{'screen-li': screen}" 
                    :key="index" 
                    @click="lang(item)"
                    :title="item.name"
                >
                    <Icon 
                        :icon="item.flag" 
                        width="30" 
                        height="30" 
                    />
                    <span v-if="!screen">
                        {{ item.name }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    .select-lang {
        width: 240px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .screen-select {
        width: 100%;
    }
    .head {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: #252525;
        transition: .3s;
    }
    .head:hover {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: #00bd7e48;
    }
    .head-btn {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
    }
    .screen-btn {
        justify-content: center;
    }
    .head-btn .green {
        font-size: 17px;
    }
    .body {
        position: absolute;
        top: 48px;
        left: 0;
        width: 100%;
        max-height: 300px;
        z-index: 1;
        border-radius: 8px;
        background-color: #252525;
        padding: 10px 5px;
        transition: .3s;
    }
    .body ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
    }
    .body ul li {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 15px;
        cursor: default;
        padding: 5px;
        color: #fff;
        border-radius: 8px;
    }
    .screen-li {
        padding: 3px !important;
    }
    .body ul li:hover {
        transition: .3s;
        background-color: #00bd7e8f;
    }
    .body-active {
        overflow: hidden;
        height: 0;
        padding: 0;
    }
</style>