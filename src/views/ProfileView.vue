<script setup>
import About from '@/components/Profile/About.vue';
import Contact from '@/components/Profile/Contact.vue';
import Users from '@/components/Profile/Users.vue';
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const rout = {
    '/users': Users,
    '/about': About,
    '/contact': Contact
}
const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return rout[currentPath.value.slice(1) || '/']
})
const actLink = [
    {href: '#/users', content: 'profile.users.title'},
    {href: '#/about', content: 'profile.about.title'},
    {href: '#/contact', content: 'profile.contact.title'}
]
let contentText = ref(null);
let st = ref(true)
const linkActive = (context) => {
  contentText.value = context;
  st.value = false;
};
</script>
<template>
    <header>
        <nav 
            class="
                w-full 
                h-[70px] 
                flex 
                items-center 
                px-4 
                shadow-[0_2px_5px_black] 
                fixed 
                z-[1] 
                bg-[#181818]
            "
        >
            <menu 
                id="menu" 
                class="flex gap-5"
            >
                <a 
                    v-for="item in actLink" 
                    :key="item.content" 
                    :href="item.href" 
                    class="rounded-md px-2" 
                    :class="{'!text-[#ebebeba3] bg-transparent' : contentText === item.content}" 
                    @click="linkActive(item.content)"
                >
                    {{ t(item.content) }}
                </a>
            </menu>
        </nav>
    </header>
    <main class=" mt-[80px] px-2">
        <div v-if="st">{{ t('profile.text') }}</div>
        <component :is="currentView" />
    </main>
</template>
<style scoped>

</style>