<template>
  <div>
    <a-steps
      style="padding: 10px 20px"
      changeable
      :current="current"
      @change="setCurrent"
    >
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
import { defineEmits, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { postAddCustomer, postAddappointment } from '@/api/resulet';
import { useRouter } from 'vue-router';
import CustomerMsg from '../success/components/customer-msg.vue';
import Services from '../success/components/services.vue';

const router = useRouter();
const current = ref(1);
const customerRef = ref();
const serviceRef = ref();
const onPrev = () => {
  current.value = Math.max(1, current.value - 1);
};
const cusform = ref();
const onNext = async () => {
  if (current.value === 1) {
    if (customerRef.value.isError) {
      Message.success('检验成功，请点击下一个表单继续填写信息!');
      current.value = Math.min(3, current.value + 1);
      cusform.value = (await postAddCustomer(customerRef.value.form)).data;
    } else {
      Message.error('请先校验信息再进行下一步操作!');
    }
  } else if (
    !serviceRef.value.designRef.serviceStatus &&
    !serviceRef.value.assembleRef.serviceStatus &&
    !serviceRef.value.deliveryRef.serviceStatus
  ) {
    Message.error('至少选择一种预约服务!');
  } else {
    // postAddCustomer(customerRef.value.form).then((res) => {
    // console.log(cusform.value.id);
    const appointmentForm = {
      customerId: cusform.value.id,
      installInfo: serviceRef.value.assembleRef.serviceStatus
        ? serviceRef.value.assembleRef.form
        : {},
      measurementInfo: serviceRef.value.designRef.serviceStatus
        ? serviceRef.value.designRef.form
        : {},
      deliveryInfo: serviceRef.value.deliveryRef.serviceStatus
        ? serviceRef.value.deliveryRef.form
        : {},
    };
    // });
    const res = await postAddappointment(appointmentForm);
    if (res.data) {
      Message.success('订单创建成功！');
      router.go(0);
    } else {
      Message.error(res.data);
    }
  }
};

const setCurrent = (cur: any) => {
  current.value = cur;
};
</script>
