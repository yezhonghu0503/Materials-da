<template>
  <a-tabs :position="position" size="large" default-active-key="1">
    <a-tab-pane
      key="1"
      style="display: flex; justify-content: center"
      title="测量设计服务"
    >
      <ServiceMeasuringDesign></ServiceMeasuringDesign>
    </a-tab-pane>
    <a-tab-pane
      key="2"
      style="display: flex; justify-content: center"
      title="配送服务"
    >
      <ServiceDelivery></ServiceDelivery>
    </a-tab-pane>
    <a-tab-pane
      key="3"
      style="display: flex; justify-content: center"
      title="安装服务"
    >
      <ServiceAssemble></ServiceAssemble>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import ServiceMeasuringDesign from './service-measuring-design.vue';
import ServiceDelivery from './service-delivery.vue';
import ServiceAssemble from './service-assemble.vue';

export default {
  name: 'Services',
  components: { ServiceMeasuringDesign, ServiceDelivery, ServiceAssemble },
  setup() {
    const position: any = 'top';
    return {
      position,
    };
  },
};
</script>

<style lang="scss" scoped></style>
