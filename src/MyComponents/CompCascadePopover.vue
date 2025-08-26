<script setup>
import { computed, ref, watchEffect } from 'vue';
const props = defineProps({
    option: {
        type: Object,
        required: true
    },
    width: {
        type: String,
    },
    height: {
        type: String
    }
})

const popoverData = defineModel()
const itemText = ref('')
const optionGrandChild = ref([])
const filter = computed(() => {
    let prop = props.option[0].key.split('-').length;
    return prop - 1
})
const computedWidth = computed(() => {
    if (props.width) {
        let arr = props.width.split('')
        let numbersArray = arr
            .map(char => Number(char))
            .filter(num => !isNaN(num))
            .join('');
        return  `${numbersArray * filter.value}px`;    
    }
});
const itemBtn = (item) => {
    popoverData.value.input = item.name
    popoverData.value.code = item.code ?? ''    
    popoverData.value.type = true    
}

const itemMove = (item) => {
    const nestedObject = Object.values(item).find(
        value => typeof value === 'object' && value !== null
    );
    if (nestedObject) {
        itemText.value = item.name
        optionGrandChild.value = nestedObject;
    }
};
watchEffect(() => {
    if (props.option) {
        optionGrandChild.value = []  
    }
})
watchEffect(() => {
     if (popoverData.value.type === false && popoverData.value.input === '') {
        optionGrandChild.value = []  
    }else {
        itemText.value = ''
    }
})

</script>
<template>
    <div class="flex">
        <div
            class="container_items" 
            :style="{left: computedWidth}" 
            :class="{'container_items_active': popoverData.type}"
        >
            <div class="container_popover">
                <h2 
                    v-for="item in option" 
                    :key="item.key" 
                    :class="(item.name === popoverData.input) ? 'item_active' : 'items'"
                    @mouseover="itemMove(item)"
                    @click="itemBtn(item)"
                >
                    {{ item.name }}
                    <i 
                        v-if="Object.values(item).some(value => value && typeof value === 'object' && Array.isArray(value))"
                        class="bi bi-chevron-right" 
                        :class="{'icon_active' :  item.name === itemText}"
                    ></i> 
                </h2>
            </div>
        </div>
    <div v-if="optionGrandChild.length >= 1">
        <CompCascadePopover v-model="popoverData" :option="optionGrandChild" :width="width" />
    </div>
    </div>
</template>
<style scoped>
.container_items {
    width: 100%;
    max-height: 250px;
    padding: 4px;
    margin: 5px 0 0 0;
    position: absolute;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 5px gray;
    transition: .3s;
}
.container_items_active {
    height: 0;
    padding: 0 !important;
    overflow: hidden;
}
.container_popover {
    width: 100%;
    max-height: 210px;
    border-radius: 2px;
    margin: 4px 0 0;
    padding: 0;
    overflow: auto;
}
.items,
.item_active {
    margin: 4px 0 0;
    padding: 8px 8px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    transition: .5s;
}
.item_active {
    background-color: #020617;
    color: white;
}
.icon_active {
    opacity: .3;
}
.items:hover {
    background: #dbeafe;
}
.item_active:hover {
    background-color: #1e2235;
}
</style>