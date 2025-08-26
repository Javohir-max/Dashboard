<script setup>
import { Icon } from '@iconify/vue';
import { computed, ref, watch, watchEffect } from 'vue';

const props = defineProps({
    option: {
        type: Array,
        required: true
    },
    width: {
        type: String
    },
    height: {
        type: String
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
const searchInp = ref('')
const mSelectStatus = ref(true)
const searchInpValue = ref(false)
const focus = ref(null)
const filters = computed(() => {
    return props.option.filter(fl => fl.name.toLocaleLowerCase().includes(searchInp.value.toLocaleLowerCase()))
})
const checkFilters = computed(() => {
    return props.option.filter(fl => fl.check === true)
})
const computedWidth = computed(() => {
    return (props.width <= 400 && props.width >= 200) ? props.width : '280px'
});
const computedHeight = computed(() => {
    return (props.height <= 300 && props.height >= 30) ? props.height : '45px'
});
const computedClass = computed(() => {
    return props?.class ?? 'border'
});
const itemBtn = (item) => {
    item.check = !item.check
    if (checkFilters.value.length === filters.value.length) {
        searchInpValue.value = true
    } else {
        searchInpValue.value = false
    }
    filtersCheck(item.name)
    emit('value', props.option)
}
const filtersCheck = (name) => {
    if (checkFilters.value.length === 1) {
        checkFilters.value.filter(fl => input.value = fl.name)
    } else if (checkFilters.value.length > 1) {
        input.value = `${checkFilters.value.length} cities selected`
    } else {
        input.value = ''
    }
}
const searchInput = () => {
    if (filters.value.length === 0) {
        searchInpValue.value = false
    }else{
        searchInpValue.value = !searchInpValue.value
        filters.value.map(tr => tr.check = searchInpValue.value)
        filtersCheck()
    }
    emit('value', props.option)
}
function checkInput() {
    mSelectStatus.value = !mSelectStatus.value
    if (mSelectStatus.value == false) {
        focus.value = true
    }else if (mSelectStatus.value === true && checkFilters.value.length > 0) {
        focus.value = false
    }else {
        focus.value = null
    }
}
watch(searchInp, (newSearchInp, oldSearchInp) => {
    if (filters.value.length === checkFilters.value.length) {
        if (filters.value.length !== 0 && checkFilters.value.length !== 0) {
            searchInpValue.value = true
        } else {
            searchInpValue.value = false
        }
    }else {
        searchInpValue.value = false
    }
})
</script>
<template>
    <div 
        class="MultiSelect" 
        :style="{width: computedWidth, height: computedHeight}"
    >
        <div 
            class="container_input"
        >
            <button 
                @click="checkInput"
                :class="{
                    'default_color': input.length < 1, 
                    'validate': validate, 
                    'onFocus': focus === true,
                    'offFocus': focus === false
                }"
            >
                <h2 
                    :class="computedClass"
                >
                    {{ input || placeholder }}
                </h2>
                <Icon 
                    icon="bytesize:chevron-bottom" 
                    class="default_color" 
                    :class="{'validate': validate}"
                    width="20" 
                    height="20" 
                />
            </button>
        </div>
        <div 
            class="container_items" 
            :style="{top: computedHeight}" 
            :class="{'container_items_active': mSelectStatus}"
        >
            <div 
                class="container_checkbox_search"
            >
                <div 
                    id="checkbox"  
                    @click="searchInput" 
                    :class="{'checkbox_active' : searchInpValue}"
                >
                    <Icon 
                        icon="mingcute:check-fill" 
                        :class="{'checkbox_icon': searchInpValue}" 
                        style="color: transparent;" 
                        width="20" 
                        height="20" 
                    />
                </div>

                <div class="container_search">
                    <input 
                        id="input" 
                        type="text" 
                        v-model="searchInp" 
                        placeholder="Search Cities"
                    >
                    <Icon 
                        icon="basil:search-outline" 
                        style="color: silver;" 
                        width="20" 
                        height="20" 
                    />
                </div>
            </div>
            <div class="container_popover">
                <h2 
                    v-for="item in filters" 
                    :key="item.length" 
                    class="items" 
                    @click="itemBtn(item)"
                >
                    <div 
                        id="checkbox" 
                        :class="{'checkbox_active': item.check }"
                    >
                        <Icon 
                            icon="mingcute:check-fill" 
                            :class="{'checkbox_icon': item.check}" 
                            style="color: transparent;" 
                            width="20" 
                            height="20" 
                        />
                    </div>
                    {{ item.name }}
                </h2>
            </div>
        </div>
    </div>
</template>
<style scoped>
.MultiSelect {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
}
.MultiSelect .container_input {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center !important;
    position: relative;
}
.MultiSelect .container_input button,
.MultiSelect #input {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    outline: none;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    padding: 4px 10px;
    background-color: white;
    cursor: pointer;
    color: #181818;
    box-shadow: inset 0 0 1px gray;
    transition: .3s;
}
.MultiSelect .container_input button {
    justify-content: space-between;
}
.MultiSelect .default_color {
    color: #9ca3af !important;
}
.MultiSelect button:hover,
.MultiSelect input:hover {
    border: 1px solid #9ca3af;
}

.MultiSelect .container_items {
    width: 100%;
    max-height: 250px;
    padding: 4px;
    margin: 5px 0 0 0;
    position: absolute;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 5px gray;
    z-index: 1;
    transition: .3s;
}
.MultiSelect .container_items_active {
    height: 0;
    padding: 0;
    overflow: hidden;
}
.MultiSelect .container_checkbox_search {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 4px;
}
.MultiSelect #checkbox {
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #6b7280;
    border-radius: 4px;
    overflow: hidden;
    transition: .3s;
}
.MultiSelect .checkbox_icon {
    color: white !important;
}
.MultiSelect .checkbox_active {
    background: #181818 !important;
}
.MultiSelect .container_search {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid #d1d5db;
    border-radius: 5px; 
    padding: 0 8px 0 0;
}
.MultiSelect .container_search input {
    color: #4b5563;
    border: none !important;
    box-shadow: none !important;
}
.MultiSelect .container_popover {
    width: 100%;
    max-height: 210px;
    border-radius: 8px;
    margin: 4px 0 0;
    overflow: auto;
}
.MultiSelect .container_popover::-webkit-scrollbar {
    width: 8px;
}
.MultiSelect .container_popover::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 5px;
}
.MultiSelect .items {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 4px 4px 0 0;
    padding: 8px 4px;
    border-radius: 8px;
    cursor: pointer;
    transition: .5s;
}
.MultiSelect .items:hover {
    background: #f3f4f6;
}
.MultiSelect .validate {
    border-color: red !important;
    color: rgba(255, 0, 0, 0.5) !important;
}
.MultiSelect .onFocus {
    border-color: #00b8d7 !important;
    box-shadow: 0 0 5px #00b8d7 !important;
}
.MultiSelect .offFocus {
    border-color: #00b8d7 !important;
}
</style>