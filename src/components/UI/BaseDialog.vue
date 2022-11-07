<template>
  <q-dialog :model-value="isVisible" persistent>
    <q-card>
      <q-card-section class="row justify-center items-center">
        <q-avatar :icon="icon" :color="colorIcon" text-color="white" />
        <span class="q-ml-sm q-mt-sm">{{ textBody }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          rounded
          label="Cancel"
          @click="$emit('cancel', false)"
          class="color-custom"
          v-close-popup
        />
        <q-btn
          flat
          rounded
          label="OK"
          @click="$emit('action', true)"
          class="color-custom"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  textBody: {
    type: String,
  },
  icon: {
    type: String,
    default: () => 'delete_forever',
  },
  colorIcon: {
    type: String,
    default: () => 'negative',
  },
});
defineEmits(['cancel', 'action']);
</script>
