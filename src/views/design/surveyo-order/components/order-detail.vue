<template>
  <a-tabs :position="position" size="large" default-active-key="1">
    <a-tab-pane
      key="1"
      style="display: flex; justify-content: center"
      title="客户信息"
    >
      <CustomerMsg></CustomerMsg>
    </a-tab-pane>
    <a-tab-pane
      key="2"
      style="display: flex; justify-content: center"
      title="供应商信息"
    >
      <SupplierMsg></SupplierMsg>
    </a-tab-pane>
    <a-tab-pane v-if="measuring" key="3">
      <template #title>安装服务</template>
      <ServicesMeasure></ServicesMeasure>
    </a-tab-pane>
    <a-tab-pane v-if="assemble" key="4">
      <template #title>测量设计</template>
      <ServicesSurveyo></ServicesSurveyo>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import CustomerMsg from '@/views/appointment/measure/components/customer-msg.vue';
import SupplierMsg from '@/views/appointment/measure/components/supplier-msg.vue';
import ServicesMeasure from '@/views/appointment/measure/components/services.vue';
import ServicesSurveyo from '@/views/design/surveyo-order/components/services.vue';

export default {
  name: 'NewOrder',
  components: { CustomerMsg, SupplierMsg, ServicesMeasure, ServicesSurveyo },
  setup() {
    const position: any = 'right';
    const measuring = JSON.parse(
      window.localStorage.getItem('measuring') as any
    );
    const assemble = JSON.parse(window.localStorage.getItem('assemble') as any);
    return {
      position,
      measuring,
      assemble,
    };
  },
};
</script>
