<template>
  <a-form
    ref="formRef"
    :size="size"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-form-item
      v-for="(post, index) of form"
      :key="index"
      :field="`posts.${index}.value`"
      :label="`预约-${index + 1}`"
    >
      <a-form
        ref="formRef"
        :size="size"
        :model="form[index]"
        :style="{ width: '600px' }"
        @submit="handleSubmit"
      >
        <a-form-item field="time" label="上门时间">
          <a-date-picker
            v-model="form[index].time"
            style="width: 100%"
            show-time
            format="YYYY-MM-DD hh:mm"
            default-value="2023-06-03 08:00:00"
            :disabled="serviceStatus"
            @change="onChange"
            @select="onSelect"
            @ok="onOk"
          />
        </a-form-item>

        <a-form-item field="name" label="安装图纸">
          <a-image
            width="200"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-form-item>
        <a-form-item
          v-if="userRole !== 'customer'"
          field="name"
          label="指定人员"
        >
          <a-select
            v-model="form.valuecacs"
            :style="{ width: '100%' }"
            placeholder="请指定测量设计人员"
            allow-clear
            :disabled="serviceStatus"
          >
            <a-option v-for="(item, index) in planner" :key="index">{{
              item
            }}</a-option>
          </a-select>
        </a-form-item>

        <a-form-item
          v-if="userRole !== 'customer'"
          field="name"
          label="服务报价"
        >
          <a-input-number
            v-model="form.bid"
            :style="{ width: '100%' }"
            placeholder="请输入服务报价（单位/元）"
            :max="10000"
            :precision="2"
            allow-clear
            hide-button
            :disabled="serviceStatus"
          >
            <template #suffix> ￥ </template>
          </a-input-number>
        </a-form-item>
        <a-form-item field="name" label="预约状态">
          <div style="width: 100%; text-align: right"
            ><a-tag
              :color="assembleStatus === '待处理' ? 'orange' : 'green'"
              bordered
              >{{ assembleStatus }}</a-tag
            ></div
          ></a-form-item
        >
      </a-form>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';

export default {
  name: 'ServiceMeasuringDesign',
  setup() {
    const size: any = 'medium';
    const assemble = JSON.parse(window.localStorage.getItem('assemble') as any);
    const userRole = window.localStorage.getItem('userRole');
    const assembleStatus = window.localStorage.getItem('assembleStatus');
    const form: any = reactive([
      {
        time: assemble.time,
        area: '200',
        valuecacs: '安装师傅A|1304231321',
        bid: '',
      },
    ]);
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
    const planner = ref([
      '安装师傅A|1304231321',
      '安装师傅B|1304231322',
      '安装师傅C|1304231323',
      '安装师傅D|1304231324',
      '安装师傅E|1304231325',
    ]);
    const serviceStatus = ref(false);
    const measuring = JSON.parse(
      window.localStorage.getItem('measuring') as any
    );

    const changeServiceStatus = () => {
      // eslint-disable-next-line no-unused-expressions
      serviceStatus.value
        ? (serviceStatus.value = false)
        : (serviceStatus.value = true);
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
      changeServiceStatus,
      serviceStatus,
      planner,
      size,
      userRole,
      assembleStatus,
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
