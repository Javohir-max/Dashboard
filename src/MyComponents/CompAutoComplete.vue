<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    option: {
        type: Array,
        required: true
    },
    width: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
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
const input = ref('')
const complateStatus = ref(true)
const focus = ref(null)
const blur = ref(false)
const filters = computed(() => {
    return props.option.filter(fl => fl.name.toLocaleLowerCase().includes(input.value.toLocaleLowerCase()))
})
const computedWidth = computed(() => {
    return (props.width <= 300 && props.width >= 200) ? props.width : '240px'
});
const computedHeight = computed(() => {
    return (props.height <= 300 && props.height >= 30) ? props.height : '45px'
});
const computedClass = computed(() => {
    return props?.class ?? 'border'
});
const itemBtn = (item) => {
    input.value = item.name
    complateStatus.value = true
    emit('value', item)
}
const inputDown = () => {
    focus.value = false
}
function checkInput() {
    if (input.value.length >= 1) {
        complateStatus.value = false
        blur.value = false
    }else if (input.value === '') {
        complateStatus.value = true
    }
}
function close() {
    if (input.value.length == 0) {
        focus.value = true
    }else {
        focus.value = null
        blur.value = true
    }
    setTimeout(() => {
        complateStatus.value = true
    }, 100)
}
const enter = () => {
    itemBtn(filters.value[0])
}
</script>
<template>
    <div 
        class="AutoComplete" 
        :style="{width: computedWidth, height: computedHeight}"
    >
        <input 
            type="text" 
            v-model="input" 
            :placeholder="placeholder" 
            :class="[
                computedClass, 
                {'validate': focus || validate, 
                'focus': focus === false, 
                'focusNoShadow': blur}
            ]" 
            @input="checkInput"
            @blur="close"
            @keydown.enter="enter"
            @mousedown="inputDown"
        >
        <div 
            class="container_popover" 
            :style="{top: computedHeight}" 
            :class="{'container_popover_active': complateStatus}"
        >
            <div class="container_items">
                <h2 
                    v-for="item in filters" 
                    :key="item.length" 
                    class="item" 
                    @click="itemBtn(item)"
                >
                    {{ item.name }}
                </h2>
            </div>
        </div>
    </div>
</template>
<style scoped>
.AutoComplete {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
.AutoComplete input {
    position: relative;
    width: 100%;
    height: 100%;
    outline: none;
    border-radius: 5px;
    padding: 4px 8px;
    transition: .3s;
    border: 1px solid #d1d5db;
}
.AutoComplete input:hover {
    border: 1px solid #9ca3af;
}
.AutoComplete input::placeholder {
    transition: .3s;
}
.AutoComplete .container_popover {
    width: 100%;
    max-height: 250px;
    padding: 4px 0;
    margin-top: 5px;
    position: absolute;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 5px gray;
    z-index: 1;
    transition: .2s;
}
.AutoComplete .container_popover_active {
    height: 0;
    padding: 0;
    overflow: hidden;
}
.AutoComplete .container_items {
    width: 100%;
    max-height: 240px;
    padding: 0 4px;
    border-radius: 8px;
    overflow: auto;
}
.AutoComplete .container_items::-webkit-scrollbar {
    width: 8px;
}
.AutoComplete .container_items::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 5px;
}
.AutoComplete .item {
    margin: 0 0 4px;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: .5s;
}
.AutoComplete .item:hover {
    background: #e5e7eb;
}
.AutoComplete .focus {
    border: 1px solid #00b8d7;
    box-shadow: 0 0 5px #00b8d7;
}
.AutoComplete .focusNoShadow {
    border: 1px solid #00b8d7;
}
.AutoComplete .validate {
    border: 1px solid red;
    color: red;
}
.AutoComplete .validate::placeholder {
    color: rgba(255, 0, 0, 0.5);
}
.AutoComplete .validate:hover {
    border: 1px solid rgba(255, 0, 0, 0.5);
}
</style>