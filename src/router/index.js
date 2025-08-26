import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/settings/',
            name: 'settings',
            component: () =>
                import ('../views/SettingView.vue')
        },
        {
            path: '/profile/',
            name: 'profile',
            component: () =>
                import ('../views/ProfileView.vue')
        },
        {
            path: '/passenger/',
            name: 'passenger',
            component: () =>
                import ('../views/PassengerView.vue')
        },
        {
            path: '/market/',
            name: 'market',
            component: () =>
                import ('../views/MarketView.vue')
        },
        {
            path: '/product/:id',
            name: 'product',
            component: () =>
                import ('../components/Product.vue'),
            props: true
        },
        {
            path: '/modalwindow/',
            name: 'modalwindow',
            component: () =>
                import ('../views/ModalWindowView.vue'),
        },
        {
            path: '/countdown/',
            name: 'countdown',
            component: () =>
                import ('../views/CountDownView.vue'),
        },
        {
            path: '/community',
            name: 'community',
            component: () =>
                import ('../views/CommunityView.vue'),
            redirect: '/myads',
            children: [{
                    path: '/myads',
                    name: 'myads',
                    component: () =>
                        import ('../components/Community/MyAds.vue'),
                    props: true
                },
                {
                    path: '/airplan',
                    name: 'airplan',
                    component: () =>
                        import ('../components/Community/AirPlan.vue'),
                    props: true
                },
                {
                    path: '/hotel',
                    name: 'hotel',
                    component: () =>
                        import ('../components/Community/Hotel.vue'),
                    props: true
                },
                {
                    path: '/train',
                    name: 'train',
                    component: () =>
                        import ('../components/Community/Train.vue'),
                    props: true
                }
            ]
        },
        {
            path: '/cards',
            name: 'cards',
            component: () =>
                import ('../views/CardsView.vue')
        },
        {
            path: '/tictac',
            name: 'tictac',
            component: () =>
                import ('../views/TicTacToeView.vue')
        },
        {
            path: '/animation',
            name: 'animation',
            component: () =>
                import ('../views/AnimationView.vue')
        },
        {
            path: '/uploadImg',
            name: 'uploadImg',
            component: () =>
                import ('../views/UploadImageView.vue')
        },
        {
            path: '/videos',
            name: 'videoView',
            component: () =>
                import ('../views/PlayVideoView.vue')
        }
    ]
})
export default router