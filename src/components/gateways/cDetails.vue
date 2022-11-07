<template>
  <div class="card-custom q-my-lg q-mx-md relative-position">
    <div
      class="color-custom text-subtitle1 q-my-md q-pa-xm absolute title-position-custom"
    >
      Details
    </div>
    <div class="q-ma-md">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-3 flex justify-center subtitle-custom">Name</div>
        <div class="col-3 flex justify-center subtitle-custom">IP</div>
      </div>
      <div class="row q-mb-sm">
        <div class="col-2"></div>
        <div class="col-3 flex justify-center">{{ info?.name }}</div>
        <div class="col-3 flex justify-center">{{ info?.ip }}</div>
      </div>
    </div>
    <div class="q-ma-md">
      <q-separator />
      <div class="q-ma-sm row">Device(s):</div>
      <div class="row">
        <div class="col-2 flex justify-center subtitle-custom">UID</div>
        <div class="col-3 flex justify-center subtitle-custom">Vendor</div>
        <div class="col-2 flex justify-center subtitle-custom">Date</div>
        <div class="col-3 flex justify-center subtitle-custom">Status</div>
      </div>
      <div
        v-for="(device, index) in info?.devices"
        :key="index"
        class="row q-my-sm"
      >
        <div class="col-2 flex justify-center">
          {{ device.uid }}
        </div>
        <div class="col-3 flex justify-center">
          {{ device.vendor }}
        </div>
        <div class="col-2 flex justify-center">
          {{ device.date }}
        </div>
        <div class="col-3 flex justify-center">
          {{ device.status }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRef } from 'vue';
import { gateways } from 'components/models';

import { useGatewaysStore } from 'src/stores/gatewaysStore';
const props = defineProps({ id: { type: String, required: true } });

const gatewayStore = useGatewaysStore();
const ID = toRef(props, 'id');
let info = reactive<gateways>(<gateways>{});
Object.assign(info, gatewayStore.getDetails(ID.value));
</script>
