<script setup>
import CreateAdvertisements from '@/components/Community/CreateAdvertisements.vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { computed, inject, onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const update = inject('update')
const scrollDown = inject('scrollDown')
const look = inject('look')
const searchFilter = inject('searchFilter')
const deleteAdvertising = inject('deleteAdvertising')
const myadsData = ref([])
const router = useRouter()
const route = useRoute()

const filterAdvertising = computed(() => {
    return myadsData.value.filter(fl => fl.description.toLowerCase().includes(searchFilter.value.toLowerCase()))
})
const getAdvertising = async () => {
    try {
        const response = await axios.get('http://localhost:3000/advertising')
        if (response.status === 200) {
            myadsData.value = response.data
            scrollDown.value = true
            setTimeout(() => {
                scrollDown.value = false
            }, 100)
        }
    } catch (error) {
        console.log(error);
    }
}
const lookBtn = (id) => {
    look.value.active = true
    look.value.id = id
}
const edit = (id) => {
    look.value.active = true
    look.value.id = id
    look.value.put = true
}
const del = (id) => {
    deleteAdvertising.value.active = true
    deleteAdvertising.value.id = id
}
const open = (item) => {
    router.push({ name: item.cotegory })
}
watchEffect(() => {
    if (update.value === true || deleteAdvertising.value.checkTwo) getAdvertising()
})
onMounted(() => {
    getAdvertising()
})
</script>
<template>
    <div class="myads">
        <CreateAdvertisements v-if="myadsData.length === 0"/>
        <div v-else class="tables">
            <div v-for="(item, index) in filterAdvertising" :key="index" class="table">
                <div class="icon">
                    <Icon :icon="item.icon" width="20" height="20" style="color: #00B8D7;"/>
                </div>
                <h3 class="description" @click="open(item)">
                    {{ item.description }}
                </h3>
                <div class="others">
                    <button @click="lookBtn(item.id)">
                        <Icon icon="iconamoon:eye-light" width="20" height="20" style="color: #475569;"/>
                    </button>
                    <button @click="edit(item.id)">
                        <Icon icon="iconamoon:edit-light" width="20" height="20" style="color: #475569;"/>
                    </button>
                    <button @click="del(item.id)">
                        <Icon icon="solar:trash-bin-2-outline" width="20" height="20" style="color: #F2376F;"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.myads .tables {
    display: flex;
    flex-direction: column;
    align-items: start;
}
.myads .table {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: start;
    border-bottom: 1px solid #EAECF0;
}
.myads .table .icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #E2F3FF;
}
.myads .table .description {
    width: 380px;
    font-family: Mulish;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0%;
    color: #475569;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 108px 0 12px;
    white-space: nowrap;
}
.myads .table .others {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
}
.table .others button {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>