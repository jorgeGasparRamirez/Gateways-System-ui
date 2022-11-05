import { RouteRecordRaw } from 'vue-router';
import { ROUTES } from './address';

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.login,
    meta: { requiresUnauth: true },
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/pLogin.vue') }],
  },
  {
    path: ROUTES.main,
    meta: { requiresAuth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: ROUTES.main,
        component: () => import('src/components/gateways/cList.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
