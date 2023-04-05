<template>
  <a-tabs :position="position" size="large" default-active-key="1">
    <a-tab-pane
      key="1"
      style="display: flex; justify-content: center"
      title="测量设计服务"
    >
      <ServiceMeasuringDesign ref="designRef"></ServiceMeasuringDesign>
    </a-tab-pane>
    <a-tab-pane
      key="2"
      style="display: flex; justify-content: center"
      title="配送服务"
    >
      <ServiceDelivery ref="deliveryRef"></ServiceDelivery>
    </a-tab-pane>
    <a-tab-pane
      v-if="ordinaryUser"
      key="3"
      style="display: flex; justify-content: center"
      title="安装服务"
    >
      <ServiceAssemble ref="assembleRef"></ServiceAssemble>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { ref } from 'vue';
import ServiceMeasuringDesign from './service-measuring-design.vue';
import ServiceDelivery from './service-delivery.vue';
import ServiceAssemble from './service-assemble.vue';

export default {
  components: { ServiceMeasuringDesign, ServiceDelivery, ServiceAssemble },
  setup() {
    const position: any = 'top';
    const ordinaryUser = ref(false);
    const userinfo = JSON.parse(localStorage.getItem('userInfo') as any);
    if (userinfo.role.roleName !== '普通用户') {
      ordinaryUser.value = true;
    }
    const designRef = ref();
    const deliveryRef = ref();
    const assembleRef = ref();
    return {
      position,
      ordinaryUser,
      designRef,
      deliveryRef,
      assembleRef,
    };
  },
};
</script>

<style lang="scss" scoped></style>
