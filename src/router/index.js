import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Events from '../views/Events.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*', // 當連到不是我們自訂義的路由時
    redirect: '/', // 重新指向路由回首頁
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Events',
    name: 'Events',
    component: Events,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const el = document.getElementsByTagName('body')[0];
  el.classList.remove('lock');
  next();
});

export default router;
