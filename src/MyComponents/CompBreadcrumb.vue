<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    icon: {
        type: String
    }
})
const router = useRouter()
const route = useRoute()
const rootArr = ref([])
const rootName = ref('')
const btnRoot = (item) => {
  router.push(item.path)
  rootName.value = item.name
}
watch(() => route.matched, (newRoot, oldRoot) => {
    rootArr.value = newRoot
})
onMounted(() => {
    rootArr.value = route.matched
})
</script>
<template>
    <div class="container_menu">
        <div 
            v-for="(item, index) in rootArr" 
            :key="item.length" 
            @click="btnRoot(item)" 
            class="container_item"
        >
            <p class="item">{{ item.name }}</p>
            <i 
                v-if="index !== rootArr.length - 1" 
                :class="icon ? icon : 'pi pi-angle-right'"
            ></i>
        </div>
    </div>
</template>
<style scoped>
.container_menu {
    width: 100%;
    display: flex;
    gap: 8px;
    justify-content: center;
}
.container_item {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    color: #374151;
}
.item {
    color: #181818;
    text-transform: capitalize;
    cursor: pointer;
}
</style>