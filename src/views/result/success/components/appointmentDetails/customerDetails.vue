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
    <a-alert class="alert__msg"> 基本客户信息 </a-alert>
    <a-form
      v-if="true"
      ref="formRef"
      :size="size"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <!-- <a-form-item>
        <a-alert> 基本客户信息 </a-alert>
      </a-form-item> -->
      <a-form-item field="realName" label="客户姓名" disabled>
        <a-input
          v-model="form.realName"
          disabled
          placeholder="请输入您的姓名"
        />
      </a-form-item>
      <a-form-item v-model="form.gender" field="gender" label="性别">
        <!-- <a-input-number
          v-model="form.age"
          placeholder="please enter your age..."
        /> -->

        <a-radio
          v-if="form.gender === 1"
          disabled
          :default-checked="true"
          value="1"
          >男</a-radio
        >
        <a-radio v-else disabled value="1">男</a-radio>

        <a-radio
          v-if="form.gender === 2"
          disabled
          :default-checked="true"
          value="2"
          >女</a-radio
        >
        <a-radio v-else disabled value="2">女</a-radio>
      </a-form-item>
      <a-form-item field="phoneNum" label="电话号码">
        <a-input
          v-model="form.phoneNum"
          disabled
          placeholder="请输入您的电话号码"
        />
      </a-form-item>
      <a-form-item field="alternateRealName" label="备用联系人">
        <a-input
          v-model="form.alternateRealName"
          disabled
          placeholder="请输入备用联系人姓名"
        />
      </a-form-item>
      <a-form-item field="alternatePhoneNum" label="电话号码">
        <a-input
          v-model="form.alternatePhoneNum"
          disabled
          placeholder="请输入备用联系人电话号码"
        />
      </a-form-item>
      <a-form-item field="cityCode" label="省市区">
        <a-cascader
          v-model="form.cityCode"
          :options="options"
          placeholder="请选择地区"
          :field-names="fieldNames"
          allow-clear
          disabled
        />
      </a-form-item>
      <a-form-item field="address" label="详细地址">
        <a-input
          v-model="form.address"
          disabled
          placeholder="请输入您的详细地址"
        />
      </a-form-item>
      <a-form-item field="dwellType" label="住宅类型">
        <a-select
          :model-value="
            form.dwellType !== '' ? housingType[form.dwellType - 1].label : ''
          "
          disabled
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
      <a-form-item field="stairType" label="楼梯类型">
        <a-select
          :model-value="
            ['步梯', '电梯', '步梯转电梯', '电梯转步梯'][form.stairType - 1]
          "
          disabled
          allow-create
          placeholder="请选择入户楼梯类型"
        >
        </a-select>
      </a-form-item>
      <div style="display: flex; flex-direction: row">
        <icon-info-circle-fill
          style="margin-top: 5px; color: #57a9fb; font-size: 20px"
        />
        <a-form-item field="parkDistance" label="车辆停放距离">
          <a-radio
            v-if="form.parkDistance === 1"
            disabled
            :default-checked="true"
            value="1"
            >50米以内</a-radio
          >
          <a-radio v-else disabled value="1">50米以内</a-radio>

          <a-radio
            v-if="form.parkDistance === 2"
            disabled
            :default-checked="true"
            value="2"
            >100米以内</a-radio
          >
          <a-radio v-else disabled value="2">100米以内</a-radio>

          <a-radio
            v-if="form.parkDistance === 3"
            disabled
            :default-checked="true"
            value="3"
            >100米以上</a-radio
          >
          <a-radio v-else disabled value="3">100米以上</a-radio>

          <a-radio
            v-if="form.parkDistance === 4"
            disabled
            :default-checked="true"
            value="4"
            >较远</a-radio
          >
          <a-radio v-else disabled value="4">较远</a-radio>
        </a-form-item></div
      >
      <a-form-item field="stairType" label="装修情况">
        <a-select
          :v-model="
            ['既有装修', '待装修', '装修过程中', '新装修完成'][form.scene - 1]
          "
          allow-create
          placeholder="请选择或输入装修情况"
          disabled
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
          disabled
        />
      </a-form-item>
    </a-form>
    <!-- <div style="width: 100%; text-align: right"
      ><a-button type="primary" @click="checkCusFrom">下一步</a-button></div
    > -->
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import city from '@province-city-china/level/index';
import { getMeasurementDetails } from '@/api/appointment';

export default {
  name: 'CustomerMsg',
  props: { userId: String },
  setup(props) {
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
    const form: any = ref({
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
    const housingType: any = ref([
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
    ]);
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

    const { userId } = toRefs(props);
    watch(userId, async (newVal) => {
      const res = await getMeasurementDetails({ id: newVal });
      form.value = res.data.customer;
      // form.realName = res.data.customer.realName;
      // form.gender = res.data.customer.gender;
      // form.phoneNum = res.data.customer.phoneNum;
      // form.alternatePhoneNum = res.data.customer.alternatePhoneNum;
      // form.alternateRealName = res.data.customer.alternateRealName;
      // form.address = res.data.customer.address;
      // console.log(newVal);
    });
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
.alert__msg {
  margin-bottom: 20px;
}
</style>
