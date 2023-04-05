<template>
  <div>
    <a-steps changeable :current="current" @change="setCurrent">
      <a-step description="customer information">客户信息</a-step>
      <a-step description="Select service content">服务内容</a-step>
    </a-steps>
    <div
      :style="{
        width: '100%',
        textAlign: 'center',
        background: 'var(--color-bg-2)',
        color: '#C2C7CC',
      }"
    >
      <div style="display: flex; justify-content: center">
        <CustomerMsg v-if="current === 1" ref="customerRef"></CustomerMsg>
        <Services v-else ref="serviceRef"></Services>
      </div>
      <a-space size="large">
        <a-button type="secondary" :disabled="current <= 1" @click="onPrev">
          <IconLeft /> 上一步
        </a-button>
        <a-button type="primary" :disabled="current >= 3" @click="onNext">
          <icon-check-circle v-if="current !== 1" />{{
            current === 1 ? '下一步' : '提交'
          }}
          <IconRight v-if="current === 1" />
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { postAddCustomer } from '@/api/resulet';
import CustomerMsg from './customer-msg.vue';
// import SupplierMsg from './supplier-msg.vue';
import Services from './services.vue';

const current = ref(1);
const customerRef = ref();
const serviceRef = ref();
const onPrev = () => {
  current.value = Math.max(1, current.value - 1);
};

const onNext = async () => {
  if (current.value === 1) {
    if (customerRef.value.isError) {
      const res = await postAddCustomer(customerRef.value.form);
      console.log(res);
      Message.success('检验成功，请点击下一个表单继续填写信息!');
      current.value = Math.min(3, current.value + 1);
    } else {
      Message.error('请先校验信息再进行下一步操作!');
    }
  } else if (
    !serviceRef.value.designRef.serviceStatus &&
    !serviceRef.value.deliveryRef.serviceStatus &&
    !serviceRef.value.assembleRef.serviceStatus
  ) {
    Message.error('至少选择一种预约服务!');
  } else {
    Message.error('提交成功!');
  }
};

const setCurrent = (cur: any) => {
  current.value = cur;
};
</script>
