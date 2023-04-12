<template>
  <div class="customer">
    <!-- <a-alert>客户通讯录 </a-alert> -->
    <a-card v-if="false" class="general-card" title="客户通讯录">
      <a-table :columns="columns" :data="data" :row-selection="rowSelection">
      </a-table>
    </a-card>
    <!-- <a-table>
      <a-table-column>123</a-table-column>
    </a-table> -->
    <a-form
      v-if="true"
      ref="formRef"
      :size="size"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-alert>为了避免信息错误造成的影响，请填写完成后手动校验信息 </a-alert>
      </a-form-item>
      <a-form-item
        field="realName"
        label="客户姓名"
        :rules="[
          { required: true, message: '姓名不能为空' },
          { minLength: 2, message: '请输入正确的姓名' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.realName" placeholder="请输入您的姓名" />
      </a-form-item>
      <a-form-item
        field="gender"
        label="性别"
        :rules="[{ required: true, message: '请选择性别' }]"
      >
        <!-- <a-input-number
          v-model="form.age"
          placeholder="please enter your age..."
        /> -->
        <a-radio-group v-model="form.gender">
          <a-radio value="1">男</a-radio>
          <a-radio value="2">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        field="phoneNum"
        label="电话号码"
        :rules="[
          { required: true, message: '请输入电话号码' },
          { minLength: 11, message: '请输入正确的手机号码' },
        ]"
      >
        <a-input v-model="form.phoneNum" placeholder="请输入您的电话号码" />
      </a-form-item>
      <a-form-item field="alternateRealName" label="备用联系人">
        <a-input
          v-model="form.alternateRealName"
          placeholder="请输入备用联系人姓名"
        />
      </a-form-item>
      <a-form-item field="alternatePhoneNum" label="电话号码">
        <a-input
          v-model="form.alternatePhoneNum"
          placeholder="请输入备用联系人电话号码"
        />
      </a-form-item>
      <a-form-item
        field="cityCode"
        label="省市区"
        :rules="[{ required: true, message: '请选择所处地区' }]"
      >
        <a-cascader
          v-model="form.cityCode"
          :options="options"
          placeholder="请选择地区"
          :field-names="fieldNames"
          allow-clear
        />
      </a-form-item>
      <a-form-item
        field="address"
        label="详细地址"
        :rules="[{ required: true, message: '请输入详细地址' }]"
      >
        <a-input v-model="form.address" placeholder="请输入您的详细地址" />
      </a-form-item>
      <a-form-item
        field="dwellType"
        label="住宅类型"
        :rules="[{ required: true, message: '请选择住宅类型' }]"
      >
        <a-select
          v-model="form.dwellType"
          allow-create
          placeholder="请选择住宅类型，或手动输入其他"
        >
          <a-option
            v-for="item in housingType"
            :key="item.value"
            :value="item.value"
            >{{ item.label }}</a-option
          >
        </a-select>
      </a-form-item>
      <a-form-item
        field="stairType"
        label="楼梯类型"
        :rules="[{ required: true, message: '请选择楼梯类型' }]"
      >
        <a-select
          v-model="form.stairType"
          allow-create
          placeholder="请选择入户楼梯类型"
        >
          <a-option value="1">步梯</a-option>
          <a-option value="2">电梯</a-option>
          <a-option value="3">步梯转电梯</a-option>
          <a-option value="4">电梯转步梯</a-option>
        </a-select>
      </a-form-item>
      <div style="display: flex; flex-direction: row">
        <icon-info-circle-fill
          style="margin-top: 5px; color: #57a9fb; font-size: 20px"
        />
        <a-form-item
          field="parkDistance"
          label="车辆停放距离"
          :rules="[{ required: true, message: '请选择车辆可停放距离' }]"
        >
          <a-radio-group v-model="form.parkDistance">
            <a-radio value="1">50米以内</a-radio>
            <a-radio value="2">100米以内</a-radio>
            <a-radio value="3">100米以上</a-radio>
            <a-radio value="4">较远</a-radio>
          </a-radio-group>
        </a-form-item></div
      >
      <a-form-item
        field="scene"
        label="装修情况"
        :rules="[{ required: true, message: '请选择装修情况' }]"
      >
        <a-select
          v-model="form.scene"
          allow-create
          placeholder="请选择或输入装修情况"
        >
          <a-option value="既有装修">既有装修</a-option>
          <a-option value="待装修">待装修</a-option>
          <a-option value="装修过程中">装修过程中</a-option>
          <a-option value="新装修完成">新装修完成</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="remark" label="备注">
        <a-textarea
          v-model="form.remark"
          placeholder="若有其他信息或问题，请在备注中描述"
          :max-length="100"
          allow-clear
          show-word-limit
          style="min-height: 95px"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit">校验信息</a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <!-- <div style="width: 100%; text-align: right"
      ><a-button type="primary" @click="checkCusFrom">下一步</a-button></div
    > -->
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import city from '@province-city-china/level/index';

export default {
  name: 'CustomerMsg',
  setup() {
    const rowSelection: any = {
      type: 'radio',
    };
    const columns = [
      {
        title: '姓名',
        dataIndex: 'realName',
      },
      {
        title: '联系电话',
        dataIndex: 'phoneNum',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: '操作',
        dataIndex: 'ope',
      },
    ];
    const data = reactive([
      {
        key: '1',
        realName: 'Jane Doe',
        phoneNum: 23000,
        address: '32 Park Road, London',
        ope: '编辑/删除/详情',
      },
    ]);
    const size: any = 'medium';
    const form: any = reactive({
      realName: '', // 客户姓名
      gender: undefined, // 性别(1:男/2:女/3:未知)
      phoneNum: '', // 电话号码
      alternateRealName: '', // 备用联系人姓名
      alternatePhoneNum: '', // 备用联系人电话号码
      cityCode: '', // 客户省市区
      address: '', // 详情地址
      dwellType: '', // 住宅类型(1:多层/2:高层/3:别墅/4:标准商办物业/5:临街商铺/6:特殊单位)
      stairType: '', // 楼梯类型(1:电梯/2:步梯)
      parkDistance: '', // 车辆可停放距离(1:50米以内/2:100米以内/3:100以上/4:较远)
      decoration: '', // 装修情况
      remark: '',
    });
    const fieldNames = { value: 'name', label: 'name' };
    const options = city;
    const isError: any = ref(false);
    const housingType: any = [
      {
        value: '1',
        label: '多层',
      },
      {
        value: '2',
        label: '高层',
      },
      {
        value: '3',
        label: '别墅',
      },
      // 标准商办物业
      {
        value: '4',
        label: '标准商办物业',
      },
      {
        value: '5',
        label: '临街商铺',
      },
      {
        value: '6',
        label: '特殊单位',
      },
      {
        value: '7',
        label: '店中店商铺',
      },
      {
        value: '8',
        label: '写字楼',
      },
    ];
    const handleSubmit = ({ values, errors }: any) => {
      // eslint-disable-next-line no-console
      if (errors === undefined) {
        isError.value = true;
        Message.success('检验完成!');
      } else {
        isError.value = false;
        Message.error('请检查表单是否有填写错误或不完整');
      }
    };
    const handleReset = () => {
      // console.log();
    };

    return {
      form,
      options,
      handleSubmit,
      handleReset,
      housingType,
      size,
      fieldNames,
      isError,
      rowSelection,
      columns,
      data,
    };
  },
};
</script>

<style>
.customer {
  width: 600px;
}
</style>
