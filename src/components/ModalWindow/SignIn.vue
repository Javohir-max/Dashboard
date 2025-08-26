<script setup>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import Message from 'primevue/message';
import { ref, watch } from 'vue';
const inputValue = ref({
    login: '',
    password: ''
})
const messageText = ref({
    text: '',
    severity: ''
})
const inputCheck = ref(false)
const authorization = ref(false)
const btnClick = () => {
    if (inputValue.value.login !== '' && inputValue.value.password !== '') {
        if (localStorage.getItem('Taken')) {
            let data;
            try {
                data = JSON.parse(localStorage.getItem('Taken')) || [];
            } catch (e) {
                data = []
            }
            let filter = data.filter(fl => fl.user === inputValue.value.login && fl.password === inputValue.value.password)
            if (filter.length > 0) {
                authorization.value = true
                messageText.value.text = `Вход успешно выполнен ;).`
                messageText.value.severity = 'success'
                activeMessage()
                inputValue.value.login = ''
                inputValue.value.password = ''
                inputCheck.value = false
                authorization.value = true
            }else {
                messageText.value.text = `Имя пользователя или пароль неверны!`
                messageText.value.severity = 'error'
                activeMessage()
            }
        } else {
            messageText.value.text = `Пользователь не существует!`
            messageText.value.severity = 'error'
            activeMessage()
        }
    }else {
        inputCheck.value = true
        messageText.value.text = `Вы не заполнили все поля!`
        messageText.value.severity = 'error'
        activeMessage()
    }
}
const message = ref({
    height: '0px',
    opacity: '0',
    transition: 'all 0.5s ease'
})
const activeMessage = () => {
    message.value.height = '68px'
    message.value.opacity = '1'
    setTimeout(() => {
        message.value.height = '0'
        message.value.opacity = '0'
    }, 5000);
}
watch(authorization, (newAuthorization, oldAuthorization) => {
    localStorage.setItem('WindowOpen', JSON.stringify(newAuthorization))
    
})
</script>
<template>
    <div class="w-[400px] p-4 flex flex-col items-center gap-8 min-h-16">
        <h1 class="font-bold text-3xl green">Добро пожаловать</h1>
        <img src="../../assets/logo.svg" class="w-[80px]" alt="">
        <Message :severity="messageText.severity" :style="message">{{ messageText.text }}</Message>
        <form @keyup.enter="btnClick" class="flex flex-col items-center gap-8">
            <FloatLabel>
                <InputText v-model="inputValue.login" id="username" class="!w-[233px] !bg-[#00000000] !outline-none !border-x-0 !border-t-0 !border-b-[1px] !rounded-none !border-gray-800 focus:!border-green-500" />
                <label for="username" :class="{ 'textAnimation' : inputCheck }">Имя пользователя</label>
            </FloatLabel>
            <FloatLabel>
                <Password v-model="inputValue.password" :feedback="false" class="focus:border-green-500" inputId="password" inputClass="!w-full !bg-[#ffffff00] !outline-none !border-x-0 !border-t-0 !border-b-[1px] !rounded-none !border-gray-800 focus:!border-green-500" toggleMask />
                <label for="password" :class="{ 'textAnimation' : inputCheck }">Пароль</label>
            </FloatLabel>
            <Button label="Вход" class="w-[233px] !font-bold !text-lg !duration-500 hover:!bg-transparent hover:!text-[#38bd7e] !py-1 active:!bg-[#38bd7e50]" rounded  @click="btnClick" />
        </form>
    </div>
</template>
<style scoped>
.textAnimation {
    color: red;
    animation: textA .3s 1 ease;
}
@keyframes textA {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(10px);
    }
    50% {
        transform: translateX(0);
    }
    75% {
        transform: translateX(-20px);
    }
    100% {
        transform: translateX(0);
    }
}
</style>