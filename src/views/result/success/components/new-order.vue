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
    <a-tab-pane key="3">
      <template #title>服务内容</template>
      <Services></Services>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import CustomerMsg from './customer-msg.vue';
import SupplierMsg from './supplier-msg.vue';
import Services from './services.vue';

export default {
  name: 'NewOrder',
  components: { CustomerMsg, SupplierMsg, Services },
  setup() {
    const position: any = 'right';
    return {
      position,
    };
  },
};
</script>
