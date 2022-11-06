<template>
  <div v-for="(item, index) in gatewayStore.getData" :key="item.id">
    {{ index }}
    <base-card
      :item="item"
      :ind="index"
      @dropGateway="gatewayStore.saveParameters(true, item.id, -1)"
    />
    <!-- @dropDevice="toggleVisibilityDevice(...$event)" -->
    <base-dialog
      text-body="'Are you sure you want to delete this gateway?'"
      :isVisible="gatewayStore.parameters.showDialogGateway"
      color-icon="red"
      @cancel="gatewayStore.clearParameters(true)"
      @action="gatewayStore.deleteG(gatewayStore.parameters.idSelectedGateway)"
    />

    <base-dialog
      text-body="Are you sure you want to delete this device?"
      :isVisible="gatewayStore.parameters.showDialogDevice"
      color-icon="red"
      @cancel="gatewayStore.clearParameters(false)"
      @action="gatewayStore.deleteDevice()"
    />
  </div>
</template>
<script setup lang="ts">
import BaseCard from 'components/UI/BaseCard.vue';
import BaseDialog from 'components/UI/BaseDialog.vue';
import { useGatewaysStore } from 'src/stores/gatewaysStore';

const gatewayStore = useGatewaysStore();
</script>
