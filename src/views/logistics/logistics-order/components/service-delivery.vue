<template>
  <a-form
    ref="formRef"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-form-item>
      <div :style="{ marginTop: '20px' }"> </div>
    </a-form-item>
    <a-form-item field="time" label="上门时间" :rules="[{ required: true }]">
      <a-date-picker
        v-model="form.time"
        style="width: 100%"
        show-time
        format="YYYY-MM-DD hh:mm"
        @change="onChange"
        @select="onSelect"
        @ok="onOk"
      />
    </a-form-item>
    <a-form-item label="配送方式" field="deliveryTyp">
      <a-radio-group
        v-model="form.deliveryType"
        default-value="0"
        @change="changeType"
      >
        <a-radio value="1">干线提货</a-radio>
        <a-radio value="2">本地仓库</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      v-for="(post, index) of deliveryInfos"
      v-show="islocal"
      :key="index"
      :field="`posts.${index}.value`"
      :label="`提货信息-${index}`"
    >
      <a-form
        ref="formRef"
        disabled
        :model="deliveryInfos[index]"
        :style="{ width: '600px' }"
      >
        <a-form-item field="companyName" label="单位名称">
          <a-input
            v-model="deliveryInfos[index].companyName"
            placeholder="请输入提货单位名称"
          />
        </a-form-item>
        <a-form-item field="contactName" label="提货联系人">
          <a-input
            v-model="deliveryInfos[index].contactName"
            placeholder="请输入提货联系人名称"
          />
        </a-form-item>
        <a-form-item field="contactPhoneNum" label="联系电话">
          <a-input
            v-model="deliveryInfos[index].contactPhoneNum"
            placeholder="请输入提货联系人联系电话"
          />
        </a-form-item>
        <a-form-item field="address" label="提货地址">
          <a-input
            v-model="deliveryInfos[index].address"
            placeholder="请输入提货地址"
          />
        </a-form-item>
        <a-form-item field="remark" label="备注">
          <a-textarea
            v-model="deliveryInfos[index].remark"
            placeholder="若有其他疑问或问题，请在备注中描述"
            :max-length="100"
            allow-clear
            show-word-limit
            style="min-height: 95px"
          />
        </a-form-item>
      </a-form>
    </a-form-item>
    <a-form-item
      field="attachUrl"
      label="货物清单"
      :rules="[{ required: true }]"
      :validate-trigger="['change', 'input']"
    >
      <a-upload draggable :limit="3" action="/" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { getUserSupplier } from '@/api/resulet';
import { Message } from '@arco-design/web-vue';

export default {
  name: 'ServiceDelivery',
  setup() {
    const form: any = reactive({
      time: '',
      deliveryType: '',
      supplierId: '',
      attachUrl: '',
      price: '',
    });
    const islocal: any = ref(false);
    const deliveryInfos: any = ref([]);
    const getSupplier = async (id: any) => {
      const res = await getUserSupplier({ userId: id });
      deliveryInfos.value = res.data.deliveryInfos;
    };
    getSupplier(
      JSON.parse(localStorage.getItem('userInfo') as any).user.userId
    );
    const handleSubmit = () => {
      // eslint-disable-next-line no-console
      console.log();
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
      if (!serviceStatus.value) {
        form.deliveryType = '';
        islocal.value = false;
      }
    };
    const changeType = () => {
      // eslint-disable-next-line no-unused-expressions
      if (form.deliveryType === '1') {
        if (deliveryInfos.value.length <= 0) {
          Message.error('当前用户没有绑定供应商！');
        } else {
          islocal.value = true;
        }
      } else {
        islocal.value = false;
      }
      // form.deliveryType === '1'
      //   ? (islocal.value = true)
      //   : (islocal.value = false);
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
      deliveryInfos,
      islocal,
      changeType,
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
