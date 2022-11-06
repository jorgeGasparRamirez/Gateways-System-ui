<template>
  <div class="card-custom q-my-lg q-mx-md relative-position">
    <div class="flex justify-center absolute btn-position-drop">
      <q-btn icon="close" round size="8px" class="btn-custom" />
    </div>
    <div class="q-ma-md">
      <div class="row">
        <div class="col-3 flex justify-center subtitle-custom">Name</div>
        <div class="col-3 flex justify-center subtitle-custom">IP</div>
      </div>
      <div class="row q-mb-sm">
        <div class="col-3 flex justify-center">{{ item.name }}</div>
        <div class="col-3 flex justify-center">{{ item.ip }}</div>
      </div>
    </div>
    <div class="q-ma-md">
      <q-separator />
      <div class="row">
        <div class="col-2 flex justify-center subtitle-custom">UID</div>
        <div class="col-3 flex justify-center subtitle-custom">Vendor</div>
        <div class="col-2 flex justify-center subtitle-custom">Date</div>
        <div class="col-3 flex justify-center subtitle-custom">Status</div>
      </div>
      <div
        v-for="(pheripheral, index) in item.devices"
        :key="index"
        class="row q-my-sm"
      >
        <device-card :item="pheripheral" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { gateways } from 'components/models';
import DeviceCard from 'components/UI/DeviceCard.vue';
defineProps({ item: { type: Object as PropType<gateways>, required: true } });
</script>
