<template>
  <q-page class="flex flex-center">
    <div
      class="card-custom q-pa-md relative-position"
      v-bind:style="$q.screen.lt.sm ? { width: '320px' } : { width: '600px' }"
    >
      <div
        class="color-custom text-subtitle1 q-my-md q-pa-xm absolute title-position-custom"
      >
        Add Gateway
      </div>
      <div class="q-mb-sm">
        <q-input
          outlined
          v-model="name"
          name="name"
          label="Name"
          :error="!!errors.name"
        >
          <template #error>
            {{ errors.name }}
          </template>
        </q-input>
      </div>
      <div class="q-mb-sm">
        <q-input
          outlined
          v-model="ip"
          name="ip"
          label="IP"
          mask="###.###.###.###"
          hint="Mask: ###.###.###.####"
          :error="!!errors.ip"
        >
          <template #error>
            {{ errors.ip }}
          </template>
        </q-input>
      </div>
      <q-separator />
      <div class="q-mb-sm q-mt-lg">
        <q-input
          outlined
          v-model="uid"
          name="uid"
          label="UID"
          :error="!!errors.uid"
        >
          <template #error>
            {{ errors.uid }}
          </template>
        </q-input>
      </div>
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
      <div class="row flex flex-center">
        <q-btn
          class="btn-custom"
          label="Add"
          @click="submit()"
          :disable="!meta.valid"
        />
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { date } from 'quasar';
import { string, number, object, boolean } from 'yup';
import { useField, useForm } from 'vee-validate';
import { useGatewaysStore } from 'src/stores/gatewaysStore';
import { gateways } from 'components/models';
import { useRouter, NavigationFailure } from 'vue-router';
import { ROUTES } from 'src/router/address';
import { notify } from 'src/plugins/notifications';

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, 'DD/MM/YYYY');
const router = useRouter();
const gatewayStore = useGatewaysStore();

const validationSchema = computed(() => {
  return object({
    name: string().required('Required'),
    ip: string()
      .required('Required')
      .matches(
        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        'Wrong IP'
      ),
    uid: number()
      .integer('Must be a number')
      .typeError('Must be a number. Required'),
    vendor: string().required('Required'),
    status: boolean(),
  });
});

const { errors, meta } = useForm({ validationSchema });

const { value: name } = useField<string>('name');
const { value: ip } = useField<string>('ip');
const { value: uid } = useField<string>('uid');
const { value: vendor } = useField<string>('vendor');
const { value: status, setValue } = useField<boolean>('status');

setValue(false);

function submit() {
  try {
    const data: gateways = {
      id: timeStamp.toString(),
      name: name.value,
      ip: ip.value,
      devices: [
        {
          uid: parseInt(uid.value),
          vendor: vendor.value,
          date: formattedString,
          status: status.value ? 'Online' : 'Offline',
        },
      ],
    };
    gatewayStore.add(data);
    router
      .push(ROUTES.list)
      .then((res) => res)
      .catch((error: NavigationFailure) => notify.failed(error.message));
  } catch (error) {
    notify.failed(<string>error);
  }
}
</script>
