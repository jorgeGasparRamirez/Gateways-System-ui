<template>
  <div class="col-2 flex justify-center">
    {{ item.uid }}
  </div>
  <div class="col-3 flex justify-center">
    {{ item.vendor }}
  </div>
  <div class="col-2 flex justify-center">
    {{ item.date }}
  </div>
  <div class="col-3 flex justify-center">
    {{ item.status }}
  </div>
  <div class="col-2 flex justify-center">
    <q-btn icon="delete" round size="8px" class="btn-custom" />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { device } from 'components/models';

defineProps({ item: { type: Object as PropType<device>, required: true } });
</script>
