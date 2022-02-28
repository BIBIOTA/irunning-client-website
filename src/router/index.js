import Vue from 'vue';
import VueRouter from 'vue-router';
import Activities from '@/views/Activities.vue';
import Activity from '@/views/Activity.vue';
import Events from '@/views/Events.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Member from '@/views/Member.vue';
import MemberForm from '@/views/MemberForm.vue';
import Cookies from 'js-cookie';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

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
    path: '/Member',
    name: 'Member',
    meta: { isLogin: true },
    component: Member,
  },
  {
    path: '/Member/:formType',
    name: 'MemberForm',
    meta: { isLogin: true },
    component: MemberForm,
  },
  {
    path: '/Events/:page',
    name: 'Events',
    component: Events,
  },
  {
    path: '/Activities/:page',
    name: 'Activities',
    meta: { isLogin: true },
    component: Activities,
  },
  {
    path: '/Activity/:id',
    name: 'Activity',
    meta: { isLogin: true },
    component: Activity,
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
  const member = Cookies.get('member') ?? false;
  if (to?.meta?.isLogin && !member ) {
    next({ name: 'Home' });
  }
  const el = document.getElementsByTagName('body')[0];
  el.classList.remove('lock');
  next();
});

export default router;
