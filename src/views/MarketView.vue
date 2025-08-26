<script setup>
import axios from 'axios';
import Slider from 'primevue/slider';
import ScrollPanel from 'primevue/scrollpanel';
import { computed, onMounted, ref, watch } from 'vue';
import SlidersHorizontal from '@/Icons/SlidersHorizontal.vue';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
const value = ref([10000, 17500000]);
let category = ['project2.all','project2.notebook','project2.pc','project2.smartphone','project2.airpods','project2.keyboard']
const cate = ref('')
const catea = ref('project2.all')
const cateBtn = (item) => {
    if (item === 'project2.all') {
        cate.value = ''
        catea.value = item
    }else {
        cate.value = item.split('.').pop()
        catea.value = item
    }
}

const products = ref([]);

const enterRef = ref('');
const inputRef = ref('');
const minPrice = ref(10000)
const maxPrice = ref(Infinity)
const btn = () => {
    inputRef.value = enterRef.value
    minPrice.value = Number(value.value[0])
    maxPrice.value = Number(value.value[1])
}

const axiosProduct = async () => {
    try {
        const response = await axios.get('https://javohir-max.github.io/host_api/product.json');
        products.value = response.data;
    } catch (error) {
        console.log(error);
    }
};

const searchProduct = computed(() => {
    return products.value.filter((item) => {
        const matchesName = item.name.toLowerCase().includes(inputRef.value.toLowerCase())
        const matchesCategory = item.category.toLowerCase().includes(cate.value.toLowerCase())
        const matchesPrice = item.price >= minPrice.value && item.price <= maxPrice.value
        return matchesName && matchesCategory && matchesPrice
    });
});

const mouse = ref(false)
onMounted(() => {
    axiosProduct();
});
watch(mouse,(oldValue,newValue)=> {
    if(!oldValue && newValue) {
        btn()
    }
})
const filterOpen = ref(false)

</script>
<template>
    <div class="w-full flex" @mouseup="mouse = false">
        <aside class="w-[18%] h-[100vh] !duration-500 bg-white p-4 phone:fixed phone:w-[86%]" :class="filterOpen ? 'phone:z-10 phone:opacity-100' : 'phone:z-[-10] phone:opacity-0'">
            <h1 class="font-medium tracking-widest text-2xl text-gray-600 phone:mb-[20px]">{{ t('project2.text1') }}</h1>
            <ul class="ps-5 phone:flex phone:flex-wrap phone:gap-4">
                <li v-for="item in category" :key="item">
                    <Button text class="!p-0 !py-1 !text-black !font-medium !items-center" @click="cateBtn(item)" :class="(catea === item) ? '!text-black' : '!text-gray-400'">
                        <Icon :icon="(catea === item) ? 'cuida:caret-right-outline' : '' " :class="{'hidden' : catea !== item}" width="20" height="20" />
                        {{ t(item) }}
                    </Button>
                </li>
            </ul>
            <h1 class="text-2xl tracking-widest font-medium mb-2 text-gray-600 phone:text-center phone:mt-[30px] phone:mb-[20px]">{{ t('project2.text2') }}</h1>
            <div class="flex phone:justify-center gap-5 mb-5">
                <h3 v-for="(item, index) in value" class="outline outline-[1px] px-2 py-[2px] rounded-md text-gray-600 font-medium">{{ index ? t('project2.to') : t('project2.from') }}: {{ item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }}</h3>
            </div>
            <Slider v-model="value" @mousedown="mouse = true" range min="10000" max="17500000" class="w-[90%] phone:m-auto" pt:range="!bg-[#00bd7e]" pt:root="!bg-gray-300" />
            <Button :label="t('project2.btn')" @click="filterOpen = false" class="mt-8 w-full !bg-[#00bd7e] !text-white !hidden phone:!block"/>
        </aside>
        <section class="w-[82%] h-[100vh] p-4 outline outline-[1px] bg-white outline-white shadow-[inset_0px_0_3px_black] overflow-hidden phone:w-full">
            <div class="flex w-full pb-4 items-center">
                <input type="text" @keyup.enter="btn" v-model="enterRef" :placeholder="t('project2.text3')" class="!bg-gray-200 !text-gray-600 outline-none w-[40%] shadow-[0_0_10px_white] m-auto rounded-md p-2 px-4 phone:w-[80%]">
                <SlidersHorizontal @click="filterOpen = true"  class="text-3xl hidden !text-gray-600 phone:block" />
            </div>  
            <hr class="mb-4">
            <ScrollPanel v-if="searchProduct.length" style="height: 866px;" :dt="{bar: {background: 'gainsboro'}}" class="!overflow-hidden phone:!h-[800px] phone:pb-[10px]">
                <div  class="rounded-2xl flex flex-wrap justify-start gap-3">
                    <div v-for="item in searchProduct" :key="item.id" class="h-[315px] !bg-gray-100 rounded-2xl w-[200px] p-4 duration-300 hover:!bg-gray-200 phone:w-[150px]">
                        <RouterLink :to="{name: 'product', params:{id:item.id}}">
                            <div class="w-full rounded-2xl mb-4 overflow-hidden max-h-[176px]">
                                <img :src="item.img_url" alt="">
                            </div>
                            <h6 class="h-[48px] overflow-hidden font-medium text-gray-500">{{ item.name }}</h6>
                            <div class="flex justify-between items-center phone:block">
                                <h2 class="text-gray-500 font-bold">{{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} sum</h2>
                                <Button class="!p-0 !w-[35px] !h-[35px] !bg-transparent !border-gray-400" rounded>
                                    <Icon icon="hugeicons:shopping-cart-check-in-01" width="20" height="20" class="!text-gray-600" />
                                </Button>
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </ScrollPanel>
            <div v-else class="flex justify-center pt-[200px]">
                <span class="!text-gray-400 text-3xl font-mono">Товар недоступен</span>
                <Icon icon="eos-icons:three-dots-loading" width="50" height="50" class="!text-gray-400" />
            </div>
        </section>
    </div>
</template>
<style scoped>
.green {
    padding: 0 !important;
}
</style>