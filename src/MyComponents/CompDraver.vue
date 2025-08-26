<script setup>
import { computed, ref, watchEffect } from 'vue';
import CompButton from './CompButton.vue';
const props = defineProps({
    position: {
        type: String,
        default: 'left'
    },
    headerText: {
        type: String,
        default: 'Draver'
    },
    width: {
        type: String,
        default: '20%'
    },
    class: {
        type: String
    }
})
const model = defineModel()
const draverStyle = ref({
    width:'100%',
    height: '100%',
    top: '0',
    left: '0'
})
const computedHeader = computed(() => {
    return props.headerText
})
const computedWidth = computed(() => {
    return props.width
})
const computedClass = computed(() => {
    return props.class
})
const btn = (e) => {
    if (e.target.classList[0] === 'Draver') close()
}
const close = () => {
    model.value = false
    if (props.position === 'left') {
        draverStyle.value.left = `-${computedWidth.value}`  
    } else if (props.position === 'top') {
        draverStyle.value.top = `-${computedWidth.value}`  
    } else if (props.position === 'bottom') {
        draverStyle.value.top = '100%' 
    } else if (props.position === 'right') {
        draverStyle.value.left = '100%' 
    } else if(props.position === 'center') {
        draverStyle.value.top = '0' 
        draverStyle.value.left = '0' 
    }
}
watchEffect(() => {
    if (props.position === 'left' && model.value === true) {
        draverStyle.value.width = computedWidth.value
        draverStyle.value.height = '100%'
        draverStyle.value.top = '0'
        draverStyle.value.left = '0'
    } else if (props.position === 'top' && model.value === true) {
        draverStyle.value.width = '100%'
        draverStyle.value.height = computedWidth.value
        draverStyle.value.top = '0'
        draverStyle.value.left = '0'
    } else if (props.position === 'bottom' && model.value === true) {
        draverStyle.value.width = '100%'
        draverStyle.value.height = computedWidth.value
        draverStyle.value.top = `calc(100% - ${computedWidth.value})`
        draverStyle.value.left = '0'
    } else if (props.position === 'right' && model.value === true) {
        draverStyle.value.width = computedWidth.value
        draverStyle.value.height = '100%'
        draverStyle.value.top = '0'
        draverStyle.value.left = `calc(100% - ${computedWidth.value})`
    } else if (props.position === 'center' && model.value === true) {
        draverStyle.value.width = '100%'
        draverStyle.value.height = '100%'
        draverStyle.value.top = '0'
        draverStyle.value.left = '0'
    }
})
</script>
<template>
    <div 
        class="Draver" 
        @click="btn" 
        :class="{ 'parent_opacity' : model}"
    >
        <div 
            :style="draverStyle" 
            class="container_child" 
            :class="computedClass"
        >
            <div 
                class="draver_container"
            >
                <h1 
                    class="draver_container_h1"
                >
                    {{ computedHeader }}
                </h1>
                <CompButton 
                    icon="pi pi-times" 
                    :disabled="!model" 
                    @click="close" 
                    class="draver_button" 
                    rounded 
                />
            </div>
            <div 
                class="container_slot"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<style scoped>
.Draver {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: #00000066;
    z-index: -1;
    opacity: 0;
    transition: .5s;
}
.parent_opacity {
    z-index: 1;
    opacity: 1;
}
.container_child {
    position: fixed;
    background: white;
    padding: 16px;
    transition: .3s;
}
.draver_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.draver_container_h1 {
    font-size: larger;
    font-weight: 700;
}
.draver_button {
    background: #00000000;
    color: black;
    padding: 8px;
}
.Draver .draver_button:hover {
    background: #00000015;
}
.container_slot {
    width: 100%;
    display: block;
    overflow: hidden;
}
    
</style>