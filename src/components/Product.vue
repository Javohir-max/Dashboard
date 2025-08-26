<script setup>
import { Icon } from '@iconify/vue';
import axios from 'axios';
import Image from 'primevue/image';
import ScrollPanel from 'primevue/scrollpanel';
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';

const props = defineProps(['id'])
const router = useRouter();
const images = ref([]);
const products = ref([])
const axiosProduct = async () => {
    try {
        let response = await axios.get('https://javohir-max.github.io/host_api/product.json');
        let product = response.data.find(p => p.id === Number(props.id));
        if (product) {
            products.value = product
            images.value = product.images
        } else {
            console.error("Продукт с таким id не найден");
        }
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    }
};

onMounted(() => {
    axiosProduct();
});
const imgValue = ref('')
const imgClick = (item) => {
    imgValue.value = item
}
const iconSt = ref(false)
const iconClick = () => {
    iconSt.value = !iconSt.value
}
function back() {
    router.go(-1); 
}

</script>
<template>
    <div class="h-[100vh] p-4 bg-white phone:!w-full">
      <Button text rounded class="!p-0 !w-[40px] !h-[40px] !bg-gray-100 hover:!bg-gray-200"  @click="back">
        <Icon icon="line-md:arrow-left" width="20" height="20" />
      </Button>
      <div v-if="products" class="w-full h-[90%] flex justify-evenly items-center phone:flex-col">
          <div class="w-[630px] h-[620px]  gap-[10px] p-[10px] bg-gray-300 flex rounded-[10px] phone:w-[330px] phone:h-[320px]">
              <div class="w-[450px] h-full overflow-hidden rounded-[10px]">
                  <Image :src="imgValue ? imgValue : products.img_url" alt="Image" width="100%"  preview/>
              </div>
              <ScrollPanel style="width: 150px; height: 100%;" :dt="{bar:{background: 'gray'}}" class="!overflow-auto !rounded-[10px]">
                  <Image v-for="item in images" :key="item" :src="item" @click="imgClick(item)"  :alt="item" width="100%" class="duration-300 hover:!opacity-[.6]" />
              </ScrollPanel>
          </div>
          <div class="w-[400px] h-auto p-3 rounded-[10px] bg-gray-100 phone:w-[330px]">
              <h2 class="font-medium text-2xl !text-gray-800">{{ products.name }}</h2>
              <h2 v-if="products && products.price" class="font-semibold text-3xl green my-[50px]">{{ products.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} sum</h2>
              <h2 v-else class="font-semibold text-3xl green my-[50px] flex">Загрузка<Icon icon="eos-icons:three-dots-loading" width="50" /></h2>
              <div class="flex justify-between mb-[10px]">
                  <Button label="Купить в 1 клик" class="w-[85%] !bg-gray-200 !border-gray-200 !text-gray-500 hover:!bg-gray-300" rounded  />
                  <Button rounded class="!w-[40px] !h-[40px] !p-0 !bg-gray-200 hover:!bg-gray-300 !border-0" @click="iconClick">
                      <Icon v-if="iconSt" icon="weui:like-filled" width="24" height="24" class="!text-red-600"/>
                      <Icon v-else icon="weui:like-outlined" width="24" height="24" class="!text-gray-500"/>
                  </Button>
              </div>
              <Button label="Добавить в корзину" class="!w-full !bg-gray-200 !border-gray-200 !text-gray-500 hover:!bg-gray-300" rounded />
          </div>
      </div>
      <div v-else class="pt-[200px]">
          <h1 class="text-center font-medium text-3xl !text-gray-400 flex justify-center">Загружается<Icon icon="eos-icons:three-dots-loading" width="50" /></h1>
      </div>
    </div>
</template>
<style scoped>
</style>