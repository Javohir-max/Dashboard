<script setup>
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const {t} = useI18n()
const pass = ref()
const passengers = [
    {label: 'project1.text1', count: ref(1), id: 1},
    {label: 'project1.text2', count: ref(0), id: 2},
    {label: 'project1.text3', count: ref(0), id: 3}
]
const canDecre = (item) => {
    if (item.id === 1) {
        return item.count.value > 1;
    } 
    if (item.id === 2) {
        return item.count.value > 0;
    } 
    if (item.id === 3) {
        return item.count.value > 0;
    } 
    return false
}
const canIncre = (item) => {
    if (item.id === 1) {
        return item.count.value < 5;
    }
    if (item.id === 2) {
        return item.count.value < 3;
    }
    if (item.id === 3) {
        return item.count.value < passengers[0].count.value;
    }
    return false
}
const decreBtn = (item) => {
    if (canDecre(item)) {
        item.count.value -= 1;
        if (item.id === 1 && passengers[2].count.value > 1 && passengers[0].count.value < passengers[2].count.value) {
            const iItem = passengers.find(t => t.id === 3)
            iItem.count.value -= 1;
        }else {
            
        }
    }
    pass.value = ''
}
const increBtn = (item) => {
    if (canIncre(item)) {
        item.count.value += 1;
    }
    pass.value = ''
}

const all = () => {
    let allPass = computed(()=>{
        return passengers[0].count.value + passengers[1].count.value + passengers[2].count.value
    }) 
    let p = [
        {label: 'project1.text4', shot: allPass.value, clas: 'font-semibold text-xl text-black block'},
        {label: 'project1.text1', shot: passengers[0].count.value, clas: 'flex justify-between ps-2 text-lg font-medium pe-4', sclas: 'green font-semibold'},
        {label: 'project1.text2', shot: passengers[1].count.value, clas: 'flex justify-between ps-2 text-lg font-medium pe-4', sclas: 'green font-semibold'},
        {label: 'project1.text3', shot: passengers[2].count.value, clas: 'flex justify-between ps-2 text-lg font-medium pe-4', sclas: 'green font-semibold'},
    ]
    pass.value = p 
}

</script>
<template>
    <div class="p-3 flex flex-col items-center h-full bg-white">
        <div  class="w-[500px] p-4 flex flex-col gap-4 mt-[100px] rounded-3xl shadow-[0_0_5px_black] phone:w-[300px]">
            <div v-for="item in passengers" :key="item.label" class="flex justify-between">
                <div class="">
                    <h1 class="text-3xl font-medium text-black phone:text-2xl">{{ t(item.label) }}</h1>
                </div>
                <div class="flex items-center gap-4">
                    <Button 
                        :key="item.id"
                        rounded 
                        class="w-[34px] h-[34px] !p-0 !border-0"
                        :class="canDecre(item) ? '!bg-green-100 !text-[#00bd7e] hover:!bg-green-200' : '!bg-gray-100 !text-gray-500 hover:!bg-gray-200'"
                        @click="decreBtn(item)"
                        >
                        <Icon icon="cuida:minus-outline" width="20" height="20" />
                    </Button>
                    <span class="text-2xl text-black">{{ item.count }}</span>
                    <Button 
                        :key="item.id"
                        rounded 
                        class="w-[34px] h-[34px] !p-0 !border-0"
                        :class="canIncre(item) ? '!bg-green-100 !text-[#00bd7e] hover:!bg-green-200' : '!bg-gray-100 !text-gray-500 hover:!bg-gray-200'"
                        @click="increBtn(item)"
                        v-if="item.id === 1 || item.id === 2 || item.id === 3"
                        >
                        <Icon icon="cuida:plus-outline" width="20" height="20" />
                    </Button>
                </div>
            </div>
            <Button :label="t('project1.btn')" pt:label="!font-semibold" class="!font-black !text-lg !bg-transparent hover:!bg-[#34d399] !rounded-2xl" @click="all"/>
            <h3 v-for="(v, index) in pass" :key="index" :class="v.clas" class="text-black">{{ t(v.label) }}: <span :class="v.sclas">({{ v.shot }})</span></h3>
        </div>
    </div>
</template>
<style scoped>

</style>