<template>
  <div class="q-mb-sm">
    <q-input
      outlined
      v-model="email"
      type="email"
      name="email"
      label="Email"
      :error="!!errors.email"
    >
      <template #error>
        {{ errors.email }}
      </template>
    </q-input>
  </div>
  <div class="q-mb-sm">
    <q-input
      outlined
      v-model="password"
      name="password"
      :type="indicators.hideText ? 'password' : 'text'"
      label="Contrasena"
      :error="!!errors.password"
    >
      <template v-if="!errors.password" #append>
        <q-icon
          :name="indicators.hideText ? 'visibility_off' : 'visibility'"
          class="cursor-pointer, color-custom"
          @click="indicators.hideText = !indicators.hideText"
        />
      </template>
      <template #error>
        {{ errors.password }}
      </template>
    </q-input>
  </div>
  <div>
    <q-btn
      class="btn-custom"
      type="submit"
      label="Acceder"
      :disable="!meta.valid"
      @click="submit(email, password)"
    >
      <template v-slot:loading> <q-spinner-facebook /> </template
    ></q-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { string, object } from 'yup';
import { useField, useForm } from 'vee-validate';
import { useAuthenticationStore } from 'src/stores/userStore';
import { notify } from 'src/plugins/notifications';
import { useRouter, NavigationFailure } from 'vue-router';
import { ROUTES } from 'src/router/address';

const indicators = reactive({ hideText: true, isLoading: false });
const userStore = useAuthenticationStore();
const router = useRouter();

const validationSchema = computed(() => {
  return object({
    email: string().required('Requerido').email('Correo Invalido'),
    password: string()
      .required('Requerido')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        '8 dígitos,(una mayúscula)letras y números'
      ),
  });
});

const { errors, meta } = useForm({ validationSchema });

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

function submit(email: string, password: string) {
  indicators.isLoading = !indicators.isLoading;
  try {
    userStore.login(email, password).then(() => {
      if (userStore.isLogged === true) {
        router
          .push(ROUTES.list)
          .then(() => {
            notify.sucess('Operacion satifactoria');
          })
          .catch((error: NavigationFailure) => notify.failed(error.message));
      } else {
        notify.failed('Credenciales Incorrectas');
      }
      indicators.isLoading = !indicators.isLoading;
    });
  } catch (error) {
    notify.failed(<string>error);
  }
}
</script>
