<template>
  <div class="customer">
    <a-form
      ref="formRef"
      :size="form.size"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <!-- <a-form-item field="size" label="表单类别">
        <a-radio-group v-model="form.size" type="button">
          <a-radio value="basic">客户信息</a-radio>
          <a-radio value="supplier">供应商信息</a-radio>
          <a-radio value="content">服务内容</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item>
        <a-alert
          >检测到您的身份为基本客户，一键<span style="color: #3491fa"
            >填入信息</span
          ></a-alert
        >
      </a-form-item>
      <a-form-item
        field="name"
        label="客户姓名"
        :rules="[
          { required: true, message: 'name is required' },
          { minLength: 5, message: 'must be greater than 5 characters' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.name" placeholder="请输入您的姓名" />
      </a-form-item>
      <a-form-item field="age" label="性别" :rules="[{ required: true }]">
        <!-- <a-input-number
          v-model="form.age"
          placeholder="please enter your age..."
        /> -->
        <a-radio-group>
          <a-radio value="0">男</a-radio>
          <a-radio value="1">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        field="number"
        label="电话号码"
        :rules="[{ required: true }]"
      >
        <a-input v-model="form.number" placeholder="请输入您的电话号码" />
      </a-form-item>
      <a-form-item field="standbyName" label="备用联系人">
        <a-input v-model="form.number" placeholder="请输入备用联系人姓名" />
      </a-form-item>
      <a-form-item field="standbyNumber" label="电话号码">
        <a-input v-model="form.number" placeholder="请输入备用联系人电话号码" />
      </a-form-item>
      <a-form-item
        field="province"
        label="省市区"
        :rules="[{ required: true, message: 'province is required' }]"
      >
        <a-cascader
          v-model="form.province"
          :options="options"
          placeholder="Please select ..."
          allow-clear
        />
      </a-form-item>
      <a-form-item
        field="address"
        label="详细地址"
        :rules="[{ required: true }]"
      >
        <a-input v-model="form.number" placeholder="请输入您的详细地址" />
      </a-form-item>
      <a-form-item
        field="section"
        label="住宅类型"
        :rules="[{ match: /section one/, message: 'must select one' }]"
      >
        <a-select
          v-model="form.section"
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
      <a-form-item field="stairs" label="楼梯类型">
        <a-select
          v-model="form.stairs"
          allow-create
          placeholder="请选择入户楼梯类型"
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
            <a-radio value="50">50米以内</a-radio>
            <a-radio value="100">100米以内</a-radio>
            <a-radio value="101">100米以上</a-radio>
            <a-radio value="200">较远</a-radio>
          </a-radio-group>
        </a-form-item></div
      >
      <a-form-item field="stairs" label="现场情况">
        <a-select
          v-model="form.stairs"
          allow-create
          placeholder="请选择或输入现场情况"
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
      name: '',
      age: undefined,
      section: '',
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
