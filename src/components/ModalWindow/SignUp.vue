<script setup>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import Message from 'primevue/message';
import { onMounted, ref, watch } from 'vue';
const messageText = ref({
    text: 'Вы успешно авторизовались.',
    severity: 'success'
})
const userArr = ref([])
const inputValue = ref({
    login: '',
    email: '',
    password: ''
})
const inputCheck = ref(false)
const btnClick = () => {
    if (inputValue.value.login !== '' && inputValue.value.email !== '' && inputValue.value.password !== '') {
        const allowedDomains = ['@gmail.com', '@yandex.ru'];
        const checkEmail = (email) => {
            return allowedDomains.some(domain => email.endsWith(domain));
        }
        if (checkEmail(inputValue.value.email)) {
            if (inputValue.value.password.length >= 8) {
                let data;
                try {
                    data = JSON.parse(localStorage.getItem('Taken')) || [];
                } catch (e) {
                    data = []
                }
                let filter = data.filter(fl => fl.email.includes(inputValue.value.email))
                if (filter.length > 0) {
                    messageText.value.text = `Этот адрес ${inputValue.value.email} уже зарегистрирован!`
                    messageText.value.severity = 'error'
                    activeMessage()
                }else {
                    let arr = {
                        user: inputValue.value.login,
                        email: inputValue.value.email,
                        password: inputValue.value.password
                    }
                    userArr.value.push(arr)
                    inputValue.value.login = ''
                    inputValue.value.email = ''
                    inputValue.value.password = ''
                    inputCheck.value = false
                    messageText.value.text = 'Вы успешно авторизовались.'
                    messageText.value.severity = 'success'
                    activeMessage()
                }
            } else {
                messageText.value.text = `Ваш пароль должен состоять из восьми или более символов.`
                messageText.value.severity = 'warn'
                document.querySelector('#password').focus()
                activeMessage()
            }
        }else {
            messageText.value.text = `Ваш email не заканчивается на @gmail.com или @yandex.ru!`
            messageText.value.severity = 'warn'
            activeMessage()
        }
    }else {
        inputCheck.value = true
        messageText.value.text = `Вы не заполнили все поля.`
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
watch(userArr, (newUserArr, oldUserArr) => {
    localStorage.setItem('Taken', JSON.stringify(userArr.value))
}, { deep: true })
const addTaken = () => {
    if (localStorage.getItem('Taken')) {
        const local = JSON.parse(localStorage.getItem('Taken'))
        local.filter(fl => userArr.value.push(fl))        
    }
}
onMounted(() => {
    addTaken()
})
</script>
<template>
     <div class="w-[400px] p-4 flex flex-col items-center gap-8 min-h-16">
        <h1 class="font-bold text-3xl green">Добро пожаловать</h1>
        <img src="../assets/logo.svg" class="w-[80px]" alt="">
        <Message :severity="messageText.severity" :style="message">{{ messageText.text }}</Message>
        <FloatLabel>
            <InputText v-model="inputValue.login" id="username" class="!w-[233px] !bg-[#00000000] !outline-none !border-x-0 !border-t-0 !border-b-[1px] !rounded-none !border-gray-800 focus:!border-green-500" />
            <label for="username" :class="{ 'textAnimation' : inputCheck }">Имя пользователя</label>
        </FloatLabel>
        <FloatLabel>
            <InputText v-model="inputValue.email" type="email" id="email" class="!w-[233px] !bg-[#00000000] !outline-none !border-x-0 !border-t-0 !border-b-[1px] !rounded-none !border-gray-800 focus:!border-green-500" />
            <label for="email" :class="{ 'textAnimation' : inputCheck }">Адрес электронной почты</label>
        </FloatLabel>
        <FloatLabel>
            <Password v-model="inputValue.password" :feedback="false" class="focus:border-green-500" inputId="password" inputClass="!w-full !bg-[#ffffff00] !outline-none !border-x-0 !border-t-0 !border-b-[1px] !rounded-none !border-gray-800 focus:!border-green-500" toggleMask />
            <label for="password" :class="{ 'textAnimation' : inputCheck }">Пароль</label>
        </FloatLabel>
        <Button label="Регистрация" class="w-[233px] !font-bold !text-lg !duration-500 hover:!bg-transparent hover:!text-[#38bd7e] !py-1 active:!bg-[#38bd7e50]" rounded  @click="btnClick" />
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