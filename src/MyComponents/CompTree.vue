<script setup>
import CompButton from './CompButton.vue';
const props = defineProps({
    option: {
        type: Array,
        required: true
    }
})
const btnKey = (item) => {
    item.status = !item.status
}
</script>
<template>
    <div>
        <div v-for="item in option" :key="item.key">
            <div 
                class="Tree" 
                :class="{'ps': !item.children}"
            >
                <CompButton 
                    v-if="item.children" 
                    @click="btnKey(item)" 
                    :icon="item.status ? 'pi pi-angle-down' : 'pi pi-angle-right'" 
                    class="button_class" 
                    rounded 
                />
                <h2>
                    <i :class="item.icon"></i>
                    {{ item.label }}
                </h2>
            </div>
            <div 
                v-if="item.status" 
                class="padding_con"
            >
                <CompTree :option="item.children" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.Tree {
    display: flex;
    align-items: center;
    gap: 8px;
}
.ps {
    padding-left: 24px;
}
.padding_con {
    padding-left: 20px;
}
.Tree .button_class {
    padding: 4px !important;
    color: black;
    background: #00000000;
    border-radius: 50%;
    transition: .3s;
}
.Tree .button_class:hover {
    background: #00000010;
}
</style>