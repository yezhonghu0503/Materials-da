<!-- <template>
  <div class="container">
    <Breadcrumb :items="['menu.result', 'menu.create-order.title']" />
    <customerMsg></customerMsg>
  </div>
</template>

<script lang="ts">
import customerMsg from '../success/components/customer-msg.vue';

export default {
  components: {
    customerMsg,
  },
};
</script>

<style lang="scss" scoped></style> -->
<template>
  <div class="container">
    <Breadcrumb :items="['menu.result', 'menu.create-order.title']" />
    <div style="padding: 20px">
      <a-steps changeable :current="current" @change="setCurrent">
        <a-step description="请填写订单客户基本信息">填写客户信息</a-step>
        <a-step description="请填写供应商基本信息">填写供应商信息</a-step>
        <a-step description="请选择填写所需服务内容">选择服务内容</a-step>
      </a-steps>
      <div
        :style="{
          width: '100%',
          height: 'auto',
          textAlign: 'center',
          background: 'var(--color-bg-2)',
          color: '#C2C7CC',
        }"
      >
        <div style="padding: 20px; display: flex; justify-content: center"
          ><customerMsg v-if="current === 1"></customerMsg>
          <SupplierMsg v-if="current === 2"></SupplierMsg>
          <Services v-if="current === 3"></Services>
        </div>
        <a-space
          style="padding: 20px; display: flex; justify-content: right"
          size="large"
        >
          <a-button type="secondary" :disabled="current <= 1" @click="onPrev">
            <IconLeft /> 上一步
          </a-button>
          <a-button type="primary" @click="onNext">
            {{ current !== 3 ? '下一步' : '提交' }} <IconRight />
          </a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script>
import customerMsg from '../success/components/customer-msg.vue';
import SupplierMsg from '../success/components/supplier-msg.vue';
import Services from '../success/components/services.vue';

export default {
  components: {
    customerMsg,
    SupplierMsg,
    Services,
  },
  data() {
    return {
      current: 1,
    };
  },
  methods: {
    onPrev() {
      this.current = Math.max(1, this.current - 1);
    },

    onNext() {
      this.current = Math.min(3, this.current + 1);
    },

    setCurrent(current) {
      this.current = current;
    },
  },
};
</script>
