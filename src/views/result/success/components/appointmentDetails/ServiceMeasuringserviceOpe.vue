<template>
  <a-form
    ref="formRef"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-alert style="margin-bottom: 20px">测量设计服务</a-alert>
    <a-form-item field="time" label="上门时间">
      <a-date-picker
        v-model="form.time"
        style="width: 100%"
        show-time
        format="YYYY-MM-DD hh:mm"
        :disabled="!serviceStatus"
        @change="onChange"
        @select="onSelect"
        @ok="onOk"
      />
    </a-form-item>
    <a-form-item
      field="productType"
      label="产品类型"
      :validate-trigger="['change', 'input']"
    >
      <a-select
        v-model="form.productType"
        :style="{ width: '100%' }"
        placeholder="请选择产品类型"
        allow-clear
        :disabled="!serviceStatus"
      >
        <a-option
          v-for="(item, index) in productType"
          :key="index"
          :value="index + 1"
          >{{ item }}</a-option
        >
      </a-select>
    </a-form-item>
    <a-form-item
      field="measurementType"
      label="测量类型"
      :validate-trigger="['change', 'input']"
    >
      <a-select
        v-model="form.measurementType"
        :style="{ width: '100%' }"
        placeholder="请选择测量类型"
        allow-clear
        :disabled="!serviceStatus"
      >
        <a-option
          v-for="(item, index) in measurementType"
          :key="index"
          :value="index + 1"
          >{{ item }}</a-option
        >
      </a-select>
    </a-form-item>
    <a-form-item field="area" label="整体面积">
      <a-input-number
        v-model="form.area"
        :style="{ width: '100%' }"
        placeholder="请输入整体面积"
        :max="1000"
        :precision="2"
        allow-clear
        hide-button
        :disabled="!serviceStatus"
      >
        <template #suffix> m² </template>
      </a-input-number>
    </a-form-item>
    <a-alert style="margin-bottom: 20px">处理进度</a-alert>
    <a-steps style="margin-bottom: 20px" small type="arrow" :current="2">
      <a-step description="This is a description">完成填单</a-step>
      <a-step description="This is a description">客服报价</a-step>
      <a-step description="This is a description">上门服务</a-step>
      <a-step description="This is a description">服务完成</a-step>
    </a-steps>
    <a-form-item
      field="area"
      label="服务报价"
      :rules="[{ required: true, message: '请输入服务报价' }]"
    >
      <a-input-number
        v-model="form.area"
        :style="{ width: '100%' }"
        placeholder="请输入服务报价"
        :max="99999"
        :precision="2"
        allow-clear
        hide-button
      >
        <template #suffix> ¥ </template>
      </a-input-number>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { ref, toRefs, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { getMeasurementDetails } from '@/api/appointment';

export default {
  name: 'ServiceMeasuringDesign',
  props: { userId: String },
  setup(props) {
    const form: any = ref({
      time: '',
      productType: '',
      measurementType: '',
      area: '',
      attachUrl: 'https://blog.al2p.xyz/upload/logoen.jpeg',
      price: '',
    });
    // const measurementDetails = async () => {
    //   const res = await getMeasurementDetails({ id: userId.value });
    //   form.value = res.data;
    //   console.log(res);
    // };
    // measurementDetails();
    const handleSubmit = ({ values, errors }: any) => {
      // eslint-disable-next-line no-console
      if (errors === undefined) {
        // window.localStorage.setItem('user', values);
        window.localStorage.setItem('measuring', JSON.stringify(values));
        Message.success('检验成功，若不需要其他服务可直接提交!');
      } else {
        Message.error('请检查表单是否有填写错误或不完整');
      }
    };
    function onSelect(dateString: any, date: any) {
      console.log('onSelect', dateString, date);
    }

    function onChange(dateString: any, date: any) {
      console.log('onChange: ', dateString, date);
    }

    function onOk(dateString: any, date: any) {
      console.log('onOk: ', dateString, date);
    }
    const value = ref('');
    const productType = ref([
      '橱柜',
      '人造石台面',
      '全屋定制',
      '床垫',
      '沙发',
      '成品家具（桌几柜）',
      '五金配件',
      '工具',
      '成品家具（床）',
      '其他',
    ]);
    const measurementType = ref([
      '多空间全屋定制测量',
      '厨房空间测量',
      '⻔窗测量',
    ]);
    const valuecacs = ref('');
    const planner = ref([
      '设计师A|1304231321',
      '设计师B|1304231322',
      '设计师C|1304231323',
      '设计师D|1304231324',
      '设计师E|1304231325',
    ]);
    const serviceStatus = ref(false);
    const changeServiceStatus = () => {
      // eslint-disable-next-line no-unused-expressions
      serviceStatus.value
        ? (serviceStatus.value = false)
        : (serviceStatus.value = true);
    };
    const { userId } = toRefs(props);
    const measurementDetails = async (uid: any) => {
      const res = await getMeasurementDetails({ id: uid });
      form.value = res.data;
    };
    measurementDetails(userId.value);
    watch(userId, async (newVal) => {
      measurementDetails(newVal);
    });
    return {
      form,
      handleSubmit,
      onSelect,
      onChange,
      onOk,
      value,
      valuecacs,
      productType,
      changeServiceStatus,
      serviceStatus,
      planner,
      measurementType,
    };
  },
};
</script>

<style scoped>
.custom-checkbox-card {
  padding: 5px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 470px;
  box-sizing: border-box;
}

.custom-checkbox-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-checkbox-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.custom-checkbox-card-title {
  color: var(--color-text-1);
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  margin-top: -5px;
  text-align: start !important;
}

.custom-checkbox-card:hover,
.custom-checkbox-card-checked,
.custom-checkbox-card:hover .custom-checkbox-card-mask,
.custom-checkbox-card-checked .custom-checkbox-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-checkbox-card:hover .custom-checkbox-card-title,
.custom-checkbox-card-checked .custom-checkbox-card-title {
  color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>
