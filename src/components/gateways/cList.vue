<template>
  <div v-for="item in gatewayStore.getData" :key="item.id">
    <base-card
      :item="item"
      :id="item.id"
      @dropGateway="gatewayStore.saveParameters(true, item.id, -1)"
    />
    <base-dialog
      text-body="'Are you sure you want to delete this gateway?'"
      :isVisible="gatewayStore.parameters.showDialogGateway"
      color-icon="red"
      @cancel="gatewayStore.clearParameters(true)"
      @action="dropGateway()"
    />

    <base-dialog
      text-body="Are you sure you want to delete this device?"
      :isVisible="gatewayStore.parameters.showDialogDevice"
      color-icon="red"
      @cancel="gatewayStore.clearParameters(false)"
      @action="dropDevice()"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import BaseCard from 'components/UI/BaseCard.vue';
import BaseDialog from 'components/UI/BaseDialog.vue';
import { useGatewaysStore } from 'src/stores/gatewaysStore';
import { notify } from 'src/plugins/notifications';
import { AxiosError } from 'axios';

const gatewayStore = useGatewaysStore();

function dropGateway() {
  try {
    gatewayStore
      .deleteGateway(gatewayStore.parameters.idSelectedGateway)
      .then(() => {
        notify.sucess('The operation was successfully');
        gatewayStore.refreshGateway(
          'delete',
          gatewayStore.parameters.idSelectedGateway
        );
        gatewayStore.clearParameters(true);
      })
      .catch((error: AxiosError) => notify.failed(<string>error.message));
  } catch (error) {
    notify.failed(error as string);
  }
}

function dropDevice() {
  try {
    gatewayStore
      .deleteDevice(
        gatewayStore.parameters.idSelectedGateway,
        gatewayStore.parameters.idSelectedDevice.toString()
      )
      .then(() => {
        notify.sucess('The operation was successfully');
        gatewayStore.refreshDevices(
          'delete',
          gatewayStore.parameters.idSelectedGateway
        );
        gatewayStore.clearParameters(false);
      })
      .catch((error: AxiosError) => notify.failed(<string>error.message));
  } catch (error) {
    notify.failed(error as string);
  }
}

onMounted(() => {
  gatewayStore.obtainDataFromBack();
});
</script>
