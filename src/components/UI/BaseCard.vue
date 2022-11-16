<template>
  <div class="card-custom q-my-lg q-mx-md relative-position">
    <div class="flex justify-center absolute btn-position-drop">
      <q-btn
        icon="close"
        round
        size="8px"
        class="btn-custom"
        @click="$emit('dropGateway')"
      />
    </div>
    <div class="q-ma-md">
      <div class="row">
        <div class="col-2">
          <q-btn
            icon="visibility"
            :to="{ name: 'Details', params: { id: id } }"
            round
            size="8px"
            class="btn-custom"
          />
        </div>
        <div class="col-3 flex justify-center subtitle-custom">Name</div>
        <div class="col-3 flex justify-center subtitle-custom">IP</div>
      </div>
      <div class="row q-mb-sm">
        <div class="col-2"></div>
        <div class="col-3 flex justify-center">{{ item.name }}</div>
        <div class="col-3 flex justify-center">{{ item.ip }}</div>
      </div>
    </div>
    <div class="q-ma-md">
      <q-separator />
      <div class="q-ma-sm row items-center">
        Device(s):
        <q-btn
          v-if="item.devices.length < 10"
          flat
          round
          icon="add"
          size="12px"
          class="color-custom"
          @click="toggleVisible"
        />
      </div>
      <div class="row">
        <div class="col-3 flex justify-center subtitle-custom">Vendor</div>
        <div class="col-2 flex justify-center subtitle-custom">Date</div>
        <div class="col-3 flex justify-center subtitle-custom">Status</div>
      </div>
      <div
        v-for="(pheripheral, index) in item.devices"
        :key="index"
        class="row q-my-sm"
      >
        <device-card :item="pheripheral" :id="id" />
      </div>
    </div>
  </div>
  <add-device
    :is-visible="isVisible"
    :id-gateway="id"
    @hide="isVisible = false"
  />
</template>
<script setup lang="ts">
import { PropType, toRefs, ref } from 'vue';
import { gateways } from 'components/models';
import DeviceCard from 'components/UI/DeviceCard.vue';
import AddDevice from 'components/device/cAdd.vue';

const props = defineProps({
  item: { type: Object as PropType<gateways>, required: true },
  id: { type: String, required: true },
});

defineEmits(['dropGateway']);

const { item, id } = toRefs(props);
const isVisible = ref(false);
const toggleVisible = () => (isVisible.value = !isVisible.value);
</script>
