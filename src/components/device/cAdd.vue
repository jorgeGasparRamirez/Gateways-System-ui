<template>
  <q-dialog :model-value="isVisible" persistent>
    <div class="card-custom q-my-lg q-mx-md q-pa-md relative-position">
      <div class="q-mb-sm">
        <q-input
          outlined
          v-model="vendor"
          name="vendor"
          label="Vendor"
          :error="!!errors.vendor"
        >
          <template #error>
            {{ errors.vendor }}
          </template>
        </q-input>
      </div>
      <div class="q-mb-sm">
        <q-toggle color="amber" v-model="status" label="Online" />
      </div>
      <div class="row flex justify-between">
        <div>
          <q-btn class="btn-custom" label="Cancel" @click="$emit('hide')" />
        </div>
        <div>
          <q-btn
            class="btn-custom"
            label="Add"
            @click="submit()"
            :disable="!meta.valid"
          />
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { date } from 'quasar';
import { string, object, boolean } from 'yup';
import { useField, useForm } from 'vee-validate';
import { addDevice } from 'components/models';
import { notify } from 'src/plugins/notifications';
import { useGatewaysStore } from 'src/stores/gatewaysStore';

const props = defineProps({
  isVisible: { type: Boolean, default: () => false },
  idGateway: { type: String, required: true },
});

const emit = defineEmits(['hide']);
const { isVisible, idGateway } = toRefs(props);
const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, 'DD/MM/YYYY');
const gatewayStore = useGatewaysStore();

const validationSchema = computed(() => {
  return object({
    vendor: string().required('Required'),
    status: boolean(),
  });
});

const { errors, meta } = useForm({ validationSchema });

const { value: vendor, setValue: vendorValue } = useField<string>('vendor');
const { value: status, setValue: statusValue } = useField<boolean>('status');

statusValue(false);

function submit() {
  try {
    const device: addDevice = {
      vendor: vendor.value,
      date: formattedString,
      status: status.value ? 'Online' : 'Offline',
      gatewayId: idGateway.value,
    };
    gatewayStore
      .addDevice(device)
      .then((res) => {
        gatewayStore.refreshDevices('add', idGateway.value, {
          uid: parseInt(res.device.uid),
          vendor: res.device.vendor,
          date: res.device.date,
          status: res.device.status,
          gatewayId: res.device.gatewayId,
        });
        notify.sucess('The operation was successfully');
        vendorValue('');
        statusValue(false);
      })
      .catch((error) => notify.failed(<string>error));

    emit('hide');
  } catch (error) {
    notify.failed(<string>error);
  }
}
</script>
