<template>
  <div class="customer">
    <a-form
      ref="formRef"
      :size="form.size"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <a-form-item field="name" label="客户姓名">
        <a-input v-model="form.name" disabled placeholder="请输入您的姓名" />
      </a-form-item>
      <a-form-item field="age" label="性别">
        <!-- <a-input-number
          v-model="form.age"
          placeholder="please enter your age..."
        /> -->

        <a-radio value="0" :default-checked="true">男</a-radio>
        <a-radio value="1" disabled>女</a-radio>
      </a-form-item>
      <a-form-item field="number" disabled label="电话号码">
        <a-input
          v-model="form.number"
          disabled
          placeholder="请输入您的电话号码"
        />
      </a-form-item>
      <a-form-item field="standbyName" disabled label="备用联系人">
        <a-input
          v-model="form.standbyName"
          placeholder="请输入备用联系人姓名"
        />
      </a-form-item>
      <a-form-item field="standbyNumber" disabled label="电话号码">
        <a-input
          v-model="form.standbyNumber"
          placeholder="请输入备用联系人电话号码"
        />
      </a-form-item>
      <a-form-item field="province" label="省市区">
        <a-cascader
          v-model="form.province"
          :options="options"
          placeholder="Please select ..."
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
      <a-form-item field="section" label="住宅类型">
        <a-select
          v-model="form.section"
          allow-create
          disabled
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
      <a-form-item field="stairs" label="楼梯类型">
        <a-select
          v-model="form.stairs"
          allow-create
          placeholder="请选择入户楼梯类型"
          disabled
        >
          <a-option value="step">步梯</a-option>
          <a-option value="elevator">电梯</a-option>
        </a-select>
      </a-form-item>
      <div style="display: flex; flex-direction: row"
        ><icon-info-circle-fill
          style="margin-top: 5px; color: #57a9fb; font-size: 20px"
        />
        <a-form-item field="options" label="车辆可停放距离">
          <a-radio-group>
            <a-radio disabled value="50">50米以内</a-radio>
            <a-radio :default-checked="true" value="100">100米以内</a-radio>
            <a-radio disabled value="101">100米以上</a-radio>
            <a-radio disabled value="200">较远</a-radio>
          </a-radio-group>
        </a-form-item></div
      >
      <a-form-item field="scene" label="现场情况">
        <a-select
          v-model="form.scene"
          allow-create
          placeholder="请选择或输入现场情况"
          disabled
        >
          <a-option value="new">新装修</a-option>
          <a-option value="old">以旧换新</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="remarks" label="备注">
        <a-textarea
          placeholder="Please enter something"
          :max-length="100"
          allow-clear
          show-word-limit
          style="min-height: 95px"
          disabled
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';

export default {
  name: 'CustomerMsg',
  setup() {
    const handleSubmit = ({ values, errors }: any) => {
      // eslint-disable-next-line no-console
      console.log('values:', values, '\nerrors:', errors);
    };
    const handleReset = () => {
      // console.log();
    };
    const form: any = reactive({
      size: 'medium',
      name: '叶先生',
      age: undefined,
      number: '13023231293',
      standbyName: '陈女士',
      standbyNumber: '18231231294',
      address: '贵阳市观山湖区金融城',
      section: '多层',
      disabled: '电梯',
      scene: '新装修',
      province: 'haidian',
      options: [],
      date: '',
      time: '',
      radio: 'radio one',
      slider: 5,
      score: 5,
      switch: false,
      multiSelect: ['section one'],
      treeSelect: '',
    });
    const options = [
      {
        value: 'Shanghai',
        label: '上海市',
        children: [
          {
            value: 'chaoyang',
            label: 'ChaoYang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'XiCheng',
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'shanghaishi',
            label: 'Shanghai',
            children: [
              {
                value: 'huangpu',
                label: 'Huangpu',
              },
            ],
          },
        ],
      },
    ];
    const treeData = [
      {
        key: 'node1',
        title: 'Node1',
        children: [
          {
            key: 'node2',
            title: 'Node2',
          },
        ],
      },
      {
        key: 'node3',
        title: 'Node3',
        children: [
          {
            key: 'node4',
            title: 'Node4',
          },
          {
            key: 'node5',
            title: 'Node5',
          },
        ],
      },
    ];
    const position: any = 'right';
    const housingType: any = [
      {
        value: 'duoceng',
        label: '多层',
      },
      {
        value: 'gaoceng',
        label: '高层',
      },
      {
        value: 'bieshu',
        label: '别墅',
      },
      // 标准商办物业
      {
        value: 'biaozhun',
        label: '标准商办物业',
      },
      {
        value: 'shangpu',
        label: '临街商铺',
      },
      {
        value: 'danwei',
        label: '特殊单位',
      },
    ];
    return {
      form,
      options,
      treeData,
      handleSubmit,
      handleReset,
      position,
      housingType,
    };
  },
};
</script>

<style>
.customer {
  width: 600px;
}
</style>
