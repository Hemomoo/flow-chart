import Index from '@/pages/index.vue';
import NotFound from '@/pages/not-found.vue';
import Menu from '@/pages/menu.vue';

export const routes = [
  { path: '/', component: Index },
  { path: '/Menu', component: Menu },
  { path: '/:path(.*)', component: NotFound },
];

export default routes;
