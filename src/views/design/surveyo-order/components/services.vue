<template>
  <a-tabs :position="position" size="large" default-active-key="1">
    <ServiceMeasuringDesign></ServiceMeasuringDesign>
  </a-tabs>
</template>

<script lang="ts">
import ServiceMeasuringDesign from './service-measuring-design.vue';

export default {
  name: 'Services',
  components: { ServiceMeasuringDesign },
  setup() {
    const position: any = 'top';
    return {
      position,
    };
  },
};
</script>

<style lang="scss" scoped></style>
