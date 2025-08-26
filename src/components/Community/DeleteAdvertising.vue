<script setup>
import { Icon } from '@iconify/vue';
import axios from 'axios';
const delet = defineModel()
const close = (e) => {
    if (delet.value.delComp === false) {
        if (e.target.classList.contains('delete-advertising-active')) {
            delet.value.active = false
            delet.value.id = null
        }
    }else if (delet.value.delComp === true) {
        delet.value.active = false
        delet.value.id = null
        setTimeout(() => {
            delet.value.delComp = false
        }, 200)
    }
}
const del = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/advertising/${id}`)
        if (response.status === 200) {
            delet.value.check = true
            delet.value.checkTwo = true
            delet.value.checkLength++
            delet.value.active = false
            delet.value.id = null
            setTimeout(() => {
                delet.value.checkTwo = false
            }, 100)
            setTimeout(() => {
                delet.value.check = false
            }, 6000);
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <div class="delete-advertising" :class="{'delete-advertising-active': delet.active}" @click="close">
        <div class="delete-box">
            <div class="text">
                <div class="icon-box">
                    <Icon v-if="!delet.delComp" icon="solar:trash-bin-2-outline" width="24" height="24" style="color: #F2376F;"/>
                    <Icon v-else icon="fluent:error-circle-16-regular" width="24" height="24" style="color: #F2376F;" />
                </div>
                <h3 class="title">
                    {{ delet.delComp ? 'Объявления будет удален' : 'Удалить объявления' }} 
                </h3>
                <p class="desc">
                    {{ delet.delComp ? 
                        'Вы действительно хотите удалить  данное объявления?' : 
                        'После удаления объявлений действие является необратимым, и объявления нельзя будет восстановить.' 
                    }}
                    
                    
                </p>
            </div>
            <button v-if="!delet.delComp" @click="del(delet.id)" class="del-btn">Да, удалить</button>
            <div v-else class="btns-con">
                <button @click="close()" class="close-btn">Отменить</button>
                <button @click="del(delet.id)" class="del-btn">Удалить</button>
            </div>
        </div>  
    </div>
</template>
<style scoped>
.delete-advertising {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #475569CC;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: .3s;
}
.delete-advertising-active {
    z-index: 1;
    opacity: 1;
}
.delete-advertising .delete-box {
    width: 400px;
    border-radius: 12px;
    background-color: #FFFFFF;
    box-shadow: 0px 8px 8px -4px #10182808;
    box-shadow: 0px 20px 24px -4px #10182814;
    backdrop-filter: blur(40px);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
}
.delete-advertising .delete-box .text {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.delete-box .text .icon-box {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FDE5EC;
}
.delete-box .text .title {
    font-family: Mulish;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0%;
    text-align: center;
    color: #212121;
    margin: 20px 0 8px;
}
.delete-box .text .desc {
    font-family: Mulish;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
    text-align: center;
    color: #475569;
}
.delete-advertising .delete-box .del-btn {
    width: 100%;
    border-radius: 100px;
    background-color: #F2376F;
    border: 1px solid #F2376F;
    box-shadow: 0px 1px 2px 0px #1018280D;
    font-family: Mulish;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0%;
    color: white;
    padding: 10px 0;
    transition: .3s;
}
.delete-advertising .delete-box .del-btn:hover,
.delete-box .btns-con .close-btn:hover {
    opacity: .8;
} 
.delete-box .btns-con {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
    gap: 12px;
}
.delete-box .btns-con .close-btn {
    border: 1px solid #D0D5DD;
    border-radius: 100px;
    background-color: transparent;
    padding: 10px 0;
    font-family: Mulish;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0%;
    color: #212121;
    transition: .3s;
}
</style>