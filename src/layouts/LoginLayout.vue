<template>
  <q-layout view="hhh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div
          v-bind:style="
            $q.screen.lt.sm ? { width: '310px' } : { width: '450px' }
          "
        >
          <q-card-section>
            <div>
              <div class="col text-h6 ellipsis flex justify-center">
                <h2
                  class="text-h4 q-my-none text-weight-regular q-mb-sm color-custom"
                >
                  LOGO
                </h2>
              </div>
            </div>
          </q-card-section>
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
