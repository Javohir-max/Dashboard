<script setup>
import { Icon } from '@iconify/vue';
import { computed, inject, ref, watchEffect } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import CompSelect from '@/MyComponents/CompSelect.vue';

const active = inject('active')
const update = inject('update')
const look = inject('look')
const image = ref('')
const warning = ref(false)
const description = ref('')
const cotegory = ref('')
const route = useRoute()
const icons = {
    myads: 'mage:compass-fill',
    airplan: 'fa6-solid:plane',
    hotel: 'fa6-solid:building',
    train: 'hugeicons:speed-train-02',
}
const category = [
    {name: 'Крылья Вдохновения', code: 'airplan'},
    {name: 'Отельная Сфера', code: 'hotel'},
    {name: 'ЖД-клуб', code: 'train'}
]
const logo = `
    data:image/png;base64,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
`
const dateTime = computed(() => {
    const date = new Date()
    let time = date.getHours() < 10 ? `0${date.getHours()}`: date.getHours()
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()
    return `${time}:${minutes}`
})
const dateDay = computed(() => {
    const date = new Date()
    let day = date.getDate() < 10 ? `0${date.getDate()}`: date.getDate()
    let month = date.getMonth() +1 < 10 ? `0${date.getMonth() +1}`: date.getMonth() +1
    return `${day}.${month}.${date.getFullYear()}`
})
const rout = computed(() => {
    return icons[route.name]
})
const getLook = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/advertising/${id}`)
        if (response.status === 200) {
            image.value = response.data.image
            description.value = response.data.description
        }
    } catch (error) {
        console.log(error);
    }
}
const ctg = (e) => {
    cotegory.value = e.code
}
const selectImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => { 
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
            if (img.width > 1080 || img.height > 1080) {
                warning.value = true
                image.value = ''
                setTimeout(() => {
                    warning.value = false
                }, 3000)
                return
            }
        };
        image.value = reader.result
    };
}
const close = () => {
    active.value = false
    look.value.active = false
    look.value.id = null
    look.value.put = false
    image.value = ''
    description.value = ''
}
const add = async () => {
    let icon;
    if (route.name !== 'myads') {
        cotegory.value = route.name
        icon = rout.value
    }else {
        icon = icons[cotegory.value]
    }
    try {
        const response = await axios.post('http://localhost:3000/advertising', {
            image: image.value,
            description: description.value,
            time: dateTime.value,
            day: dateDay.value,
            cotegory: cotegory.value,
            icon: icon,
            chat: [],
            logo: logo
        })
        if (response.status === 201) {
            close()
            update.value = true
            setTimeout(() => {
                update.value = false
            }, 100);
        }
    } catch (error) {
        console.log(error);
    }
}
const edit = async (id) => {
    let icon;
    if (route.name !== 'myads') {
        cotegory.value = route.name
        icon = rout.value
    }else {
        icon = icons[cotegory.value]
    }
    try {
        const response = await axios.put(`http://localhost:3000/advertising/${id}`, {
            image: image.value,
            description: description.value,
            time: dateTime.value,
            day: dateDay.value,
            cotegory: cotegory.value,
            icon: icon,
            chat: [],
            logo: logo
        })
        if (response.status === 200) {
            close()
            update.value = true
            setTimeout(() => {
                update.value = false
            }, 100);
        }
    } catch (error) {
        console.log(error);
    }
}
watchEffect(() => {
    if (look.value.active === true) {
        getLook(look.value.id)
    }
})
</script>
<template>
    <div 
        class="addAdvertising" 
        :class="{'addAdvertising_active': active || look.active}"
    >
        <div 
            class="create_box"
        >
            <div 
                class="input_boxs"
            >
                <div 
                    v-if="!image" 
                    class="add_image"
                >
                    <div 
                        class="add_image_icon"
                    >
                        <Icon 
                            icon="lucide:cloud-upload" 
                            width="20" 
                            height="20"
                        />
                    </div>
                    <p>
                        <label for="image">
                            Нажмите, чтобы загрузить
                        </label>
                        или перетащите PNG JPG или JPEG (max. 1080x1080px)
                    </p>
                    <input 
                        type="file" 
                        hidden 
                        id="image" 
                        @change="selectImg"
                    >
                </div>
                <div 
                    v-else 
                    class="show-image"
                >
                    <img :src="image" alt="">
                </div>
                <input 
                    type="file" 
                    hidden 
                    @change="selectImg" 
                    id="image"
                >
                <label 
                    v-if="
                        image && !look.active || 
                        look.put === true" 
                    for="image" 
                    class="download"
                >
                    <Icon 
                        icon="solar:download-linear" 
                        width="20" 
                        height="20"
                    />
                    <span>Загрузить фото</span>
                </label>
                <CompSelect 
                    v-if="
                        look.put === true ||
                        route.name === 'myads' && 
                        !look.active
                    "
                    @value="ctg"
                    :option="category" 
                    width="100%" 
                    height="40px" 
                    style="
                        border: 1px solid #EAECF0; 
                        color: #475569; 
                        font-family: Mulish; 
                        font-weight: 500; 
                        font-size: 14px; 
                        line-height: 20px; 
                        letter-spacing: 0.1px; 
                        text-align: center;
                        padding: 0 10px;
                    "
                    active
                />
                <div class="add_description">
                    <textarea 
                        placeholder="Введите сообщения" 
                        :disabled="
                            look.active && 
                            look.put === false
                        " 
                        v-model="description"
                    ></textarea>
                </div>
            </div>
            <div 
                class="box_btns"
            >
                <button 
                    @click="close"
                >
                    {{ look.active && look.put === false ? 'Закрыт' : 'Отменить' }}
                </button>
                <button 
                    v-if="
                        look.put === true ||
                        !look.active
                    " 
                    @click="look.put ? edit(look.id) : add()" 
                    :disabled="!image || !description"
                >
                    {{ look.put ? 'Сохранить' : 'Создать' }}
                </button>
            </div>
        </div>
        <h2 
            class="warning" 
            :class="{'warning_active': warning}"
        >
            Разрешение изображения превышает ограничение.
        </h2>
    </div>
</template>
<style scoped>
.addAdvertising {
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
.addAdvertising_active {
    z-index: 1;
    opacity: 1;
}
.addAdvertising .create_box {
    width: 450px;
    padding: 20px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 8px 8px -4px #10182808;
    box-shadow: 0px 20px 24px -4px #10182814;
    backdrop-filter: blur(40px)
}
.addAdvertising .create_box .input_boxs {
    width: 100%;
    display: flex; 
    flex-direction: column;
    gap: 8px;
}
.create_box .input_boxs .add_image {
    width: 100%;
    border: 1px solid #EAECF0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
}
.input_boxs .add_image .add_image_icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F2F4F7;
    border: 6px solid #F9FAFB;
    border-radius: 50%;
    color: #475569;
}
.input_boxs .add_image p {
    text-align: center;
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    letter-spacing: 0%;
    color: #475569;
}
.add_image p label {
    font-family: Inter;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
    color: #6A67F8;
    cursor: pointer;
    transition: .3s;
}
.add_image p label:hover {
    text-decoration: underline;
}
.create_box .input_boxs .add_description {
    width: 100%;
    height: 152px;
}
.input_boxs .add_description textarea {
    width: 100%;
    height: 100%;
    border: 1px solid #EAECF0;
    border-radius: 8px;
    resize: none;
    padding: 8px 14px;
    outline: none;
    font-family: Mulish;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
    color: #475569;
}
.add_description textarea::-webkit-scrollbar {
    width: 5px;
}
.add_description textarea::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 5px;
}
.add_description textarea::placeholder {
    color: #838C97;
}
.create_box .box_btns {
    margin-top: 18px;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 14px;
}
.create_box .box_btns button {
    padding: 10px 24px;
    border-radius: 30px;
    font-family: Mulish;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    text-align: center;
    color: #475569;
    border: 1px solid #D0D5DD;
    background-color: white;
    transition: .3s;
}
.create_box .box_btns button:nth-child(2) {
    color: white;
    background-color: #00B5D7;
    border: none;
}
.create_box .box_btns button:hover {
    opacity: .8;
}
.addAdvertising .warning {
    position: absolute;
    top: 0;
    background-color: orange;
    color: white;
    padding: 5px 12px;
    border-radius: 5px;
    transform: translateY(-100%);
    transition: .3s transform ease-in-out;
}
.addAdvertising .warning_active {
    transform: translateY(20px);
}
.create_box .input_boxs .show-image {
    width: 100%;
    max-height: 240px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.input_boxs .show-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.create_box .input_boxs .download {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    color: #475569;
    margin-top: 4px;
    cursor: pointer;
}
.input_boxs .download span {
    font-family: Mulish;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
}
</style>