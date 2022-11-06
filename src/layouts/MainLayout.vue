<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Gateways System </q-toolbar-title>

        <div>
          <q-btn class="glossy" round icon="exit_to_app" @click="logout()" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from 'src/stores/userStore';
import { NavigationFailure, useRouter } from 'vue-router';
import { ROUTES } from 'src/router/address';
import { notify } from 'src/plugins/notifications';

const userStore = useAuthenticationStore();
const router = useRouter();

function logout() {
  userStore.logout();
  router
    .replace(ROUTES.login)
    .then((res) => res)
    .catch((e) => notify.failed((e as NavigationFailure).message));
}
</script>
