<template>
  <div v-for="item in data" :key="item.id">
    <base-card :item="item" />
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import BaseCard from 'components/UI/BaseCard.vue';
import { gateways } from 'components/models';

const data = reactive<gateways[]>([
  {
    id: '0909es2',
    name: 'CPU',
    ip: '123.34.54.67',
    devices: [
      {
        uid: 789,
        vendor: 'ET&T',
        date: '2/3/2000',
        status: 'Online',
      },
      {
        uid: 759,
        vendor: 'YT',
        date: '5/3/2010',
        status: 'Online',
      },
      {
        uid: 709,
        vendor: 'YrrT',
        date: '12/3/2020',
        status: 'Online',
      },
    ],
  },
  {
    id: '0909ef2',
    name: 'Modem',
    ip: '122.22.54.67',
    devices: [
      {
        uid: 799,
        vendor: 'ET&T',
        date: '4/3/2020',
        status: 'Offline',
      },
    ],
  },
]);
</script>
