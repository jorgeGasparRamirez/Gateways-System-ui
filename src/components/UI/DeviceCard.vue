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
  <div v-if="showDeleteButton" class="col-2 flex justify-center">
    <q-btn
      icon="delete"
      round
      size="8px"
      class="btn-custom"
      @click="gatewayStore.saveParameters(false, ind, item.uid)"
    />{{ ind }}
  </div>
</template>
<script setup lang="ts">
import { PropType, toRefs, computed } from 'vue';
import { device } from 'components/models';
import { useGatewaysStore } from 'src/stores/gatewaysStore';

const props = defineProps({
  item: { type: Object as PropType<device>, required: true },
  ind: { type: Number, required: true },
});

defineEmits(['dropDevice', 'drop']);

const { item, ind } = toRefs(props);
const gatewayStore = useGatewaysStore();
const showDeleteButton = computed(
  () => gatewayStore.getDevicesLength(ind.value) > 1
);
</script>
