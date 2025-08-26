<script setup>
import { ref, watchEffect } from 'vue';
import CompCascadePopover from './CompCascadePopover.vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
    option: {
        type: Array,
        required: true
    },
    width: {
        type: String,
        default: '240px'
    },
    height: {
        type: String,
        default: '45px'
    },
    class: {
        type: String
    },
    placeholder: {
        type: String
    },
    validate: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['value'])
const selectPopover = ref({
    type: true,
    input: '',
    code: ''
})
const defBlur = ref(null)
const focus = ref(false)
function checkInput() {
    selectPopover.value.type = !selectPopover.value.type
    selectPopover.value.type ? close() : defBlur.value = false
}
function close() {
    setTimeout(() => {
        if (selectPopover.value.input.length > 0) {
            focus.value = true
            defBlur.value = null
        }else {
            defBlur.value = true
            focus.value = false
        }
        selectPopover.value.type = true
    }, 100)
}
watchEffect(() => {
    if (selectPopover.value.input.length > 0) {
        emit('value', selectPopover.value)
    }
})
</script>
<template>
    <div class="container" :style="{width: width, height: height}">
        <div class="container_input">
            <button 
                @click="checkInput" 
                @blur="close"
                type="button" 
                :class="{
                    'default_color': selectPopover.input.length < 1, 
                    'validate': defBlur || validate, 
                    'onFocus': defBlur == false,
                    ' offFocus': focus
                }"
            >
                <h2 :class="props.class">
                    {{ selectPopover.input || placeholder}}
                </h2>
                <Icon 
                    icon="bytesize:chevron-bottom" 
                    class="default_color" 
                    :class="{'validate': defBlur || validate}"
                    width="20" 
                    height="20" 
                />
            </button>
        </div>
        <div class="container_items" :style="{top: height}">
            <CompCascadePopover 
                v-model="selectPopover" 
                :option="option" 
                :width="width" 
                :height="height" 
            />
        </div>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
}
.container_input {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}
button {
    width: 100%;
    height: 100%;
    outline: none;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    padding: 4px 8px;
    background-color: white;
    box-shadow: inset 0 0 1px gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: .3s;
}
button:hover {
    border: 1px solid #9ca3af;
}
.default_color {
    color: #9ca3af !important;
}
.container_items {
    width: 100%;
    position: absolute;
    z-index: 1;
}
.validate {
    border-color: red !important;
    color: rgba(255, 0, 0, 0.5) !important;
}
.onFocus {
    border-color: #00b8d7;
    box-shadow: 0 0 5px #00b8d7;
}
.offFocus {
    border-color: #00b8d7;
}
</style>