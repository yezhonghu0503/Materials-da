<template>
  <a-form
    ref="formRef"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-alert style="margin-bottom: 20px">安装服务</a-alert>
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
    <a-form-item field="installNum" label="家具个数">
      <a-input-number
        v-model="form.installNum"
        :style="{ width: '100%' }"
        placeholder="请输入安装家具空间数量"
        :max="1000"
        :precision="2"
        allow-clear
        hide-button
        :disabled="!serviceStatus"
      >
        <template #suffix> 个 </template>
      </a-input-number>
    </a-form-item>
    <a-form-item
      field="attachUrl"
      label="图纸上传"
      :validate-trigger="['change', 'input']"
    >
      <a-upload draggable :disabled="!serviceStatus" :limit="3" action="/" />
    </a-form-item>
    <a-alert style="margin-bottom: 20px">处理进度</a-alert>
    <a-steps style="margin-bottom: 20px" small type="arrow" :current="2">
      <a-step description="This is a description">完成填单</a-step>
      <a-step description="This is a description">客服报价</a-step>
      <a-step description="This is a description">上门服务</a-step>
      <a-step description="This is a description">服务完成</a-step>
    </a-steps>
    <a-form-item
      field="price"
      label="服务报价"
      :rules="[{ required: true, message: '请输入服务报价' }]"
    >
      <a-input-number
        v-model="form.price"
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
import { getInstallDetails } from '@/api/appointment';

export default {
  name: 'ServiceAssemble',
  props: { userId: String },
  setup(props) {
    const form: any = ref({
      time: '',
      // time: '',
      installNum: '',
      attachUrl: '',
      price: '',
    });
    const { userId } = toRefs(props);
    console.log(userId);
    const installDetails = async (uid: any) => {
      const res = await getInstallDetails({ id: uid });
      form.value = res.data;
    };
    installDetails(userId.value);
    watch(userId, (newVal) => {
      installDetails(newVal);
    });
    const handleSubmit = ({ values, errors }: any) => {
      if (errors === undefined) {
        // window.localStorage.setItem('user', values);
        window.localStorage.setItem('assemble', JSON.stringify(values));
        Message.success('检验成功，请点击下一个表单继续填写信息!');
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
    const valuecacs = ref('');
    const planner = ref([]);
    const serviceStatus = ref(false);
    const changeServiceStatus = () => {
      // eslint-disable-next-line no-unused-expressions
      serviceStatus.value
        ? (serviceStatus.value = false)
        : (serviceStatus.value = true);
      if (serviceStatus.value) {
        form.value = {
          time: '',
          // time: '',
          installNum: '',
          attachUrl: '',
          price: '',
        };
      } else {
        form.value = {};
      }
    };
    return {
      form,
      handleSubmit,
      onSelect,
      onChange,
      onOk,
      value,
      valuecacs,
      productType,
      planner,
      changeServiceStatus,
      serviceStatus,
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
