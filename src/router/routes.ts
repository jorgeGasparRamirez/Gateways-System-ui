import { RouteRecordRaw } from 'vue-router';
import { ROUTES } from './address';

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.login,
    meta: { requiresUnauth: true },
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/pLogin.vue') }],
  },
  {
    path: ROUTES.list,
    meta: { requiresAuth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'List',
        path: ROUTES.list,
        component: () => import('src/pages/pDashboard.vue'),
      },
      {
        name: 'Add',
        path: ROUTES.add,
        component: () => import('components/gateways/cAdd.vue'),
      },
      {
        name: 'Details',
        path: ROUTES.details,
        component: () => import('components/gateways/cDetails.vue'),
        props: true,
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
