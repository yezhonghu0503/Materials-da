<template>
  <div class="customer">
    <a-form
      ref="formRef"
      :size="size"
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
          { required: true, message: '姓名不能为空' },
          { minLength: 2, message: '请输入正确的姓名' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.name" placeholder="请输入您的姓名" />
      </a-form-item>
      <a-form-item
        field="sex"
        label="性别"
        :rules="[{ required: true, message: '请选择性别' }]"
      >
        <!-- <a-input-number
          v-model="form.age"
          placeholder="please enter your age..."
        /> -->
        <a-radio-group v-model="form.sex">
          <a-radio value="0">男</a-radio>
          <a-radio value="1">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        field="number"
        label="电话号码"
        :rules="[
          { required: true, message: '请输入电话号码' },
          { minLength: 11, message: '请输入正确的手机号码' },
        ]"
      >
        <a-input v-model="form.number" placeholder="请输入您的电话号码" />
      </a-form-item>
      <a-form-item field="standbyName" label="备用联系人">
        <a-input
          v-model="form.standbyName"
          placeholder="请输入备用联系人姓名"
        />
      </a-form-item>
      <a-form-item field="standbyNumber" label="电话号码">
        <a-input
          v-model="form.standbyNumber"
          placeholder="请输入备用联系人电话号码"
        />
      </a-form-item>
      <a-form-item
        field="region"
        label="省市区"
        :rules="[{ required: true, message: '请选择所处地区' }]"
      >
        <a-cascader
          v-model="form.region"
          :options="options"
          placeholder="请选择地区"
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
        field="residence"
        label="住宅类型"
        :rules="[{ required: true, message: '请选择住宅类型' }]"
      >
        <a-select
          v-model="form.residence"
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
        field="stairs"
        label="楼梯类型"
        :rules="[{ required: true, message: '请选择楼梯类型' }]"
      >
        <a-select
          v-model="form.stairs"
          allow-create
          placeholder="请选择入户楼梯类型"
        >
          <a-option value="step">步梯</a-option>
          <a-option value="elevator">电梯</a-option>
        </a-select>
      </a-form-item>
      <div style="display: flex; flex-direction: row">
        <icon-info-circle-fill
          style="margin-top: 5px; color: #57a9fb; font-size: 20px"
        />
        <a-form-item
          field="range"
          label="车辆停放距离"
          :rules="[{ required: true, message: '请选择车辆可停放距离' }]"
        >
          <a-radio-group v-model="form.range">
            <a-radio value="50">50米以内</a-radio>
            <a-radio value="100">100米以内</a-radio>
            <a-radio value="101">100米以上</a-radio>
            <a-radio value="200">较远</a-radio>
          </a-radio-group>
        </a-form-item></div
      >
      <a-form-item
        field="scene"
        label="现场情况"
        :rules="[{ required: true, message: '请选择现场情况' }]"
      >
        <a-select
          v-model="form.scene"
          allow-create
          placeholder="请选择或输入现场情况"
        >
          <a-option value="new">新装修</a-option>
          <a-option value="old">以旧换新</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="remarks" label="备注">
        <a-textarea
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
import { reactive } from 'vue';
import { Message } from '@arco-design/web-vue';

export default {
  name: 'CustomerMsg',
  setup() {
    const handleSubmit = ({ values, errors }: any) => {
      // eslint-disable-next-line no-console
      if (errors === undefined) {
        // window.localStorage.setItem('user', values);
        window.localStorage.setItem('customer', JSON.stringify(values));
        Message.success('检验成功，请点击下一个表单继续填写信息!');
      } else {
        Message.error('请检查表单是否有填写错误或不完整');
      }
    };
    const handleReset = () => {
      // console.log();
    };
    const size: any = 'medium';
    const form: any = reactive({
      name: '',
      sex: undefined,
      standbyName: '',
      standbyNumber: '',
      section: '',
      region: '',
      address: '',
      residence: '',
      stairs: '',
      range: '',
      scene: '',
    });
    const options = [
      {
        value: '上海市',
        label: '上海市',
        children: [
          {
            value: '黄浦区',
            label: '黄浦区',
          },
          {
            value: '徐汇区',
            label: '徐汇区',
          },
          {
            value: '长宁区',
            label: '长宁区',
          },
          {
            value: '静安区',
            label: '静安区',
          },
          {
            value: '普陀区',
            label: '普陀区',
          },
          {
            value: '虹口区',
            label: '虹口区',
          },
          {
            value: '杨浦区',
            label: '杨浦区',
          },
          {
            value: '浦东新区',
            label: '浦东新区',
          },
          {
            value: '闵行区',
            label: '闵行区',
          },
          {
            value: '宝山区',
            label: '宝山区',
          },
          {
            value: '嘉定区',
            label: '嘉定区',
          },
          {
            value: '金山区',
            label: '金山区',
          },
          {
            value: '松江区',
            label: '松江区',
          },
          {
            value: '青浦区',
            label: '青浦区',
          },
          {
            value: '奉贤区',
            label: '奉贤区',
          },
          {
            value: '崇明区',
            label: '崇明区',
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
        value: '多层',
        label: '多层',
      },
      {
        value: '多层',
        label: '高层',
      },
      {
        value: '多层',
        label: '别墅',
      },
      // 标准商办物业
      {
        value: '标准商办物业',
        label: '标准商办物业',
      },
      {
        value: '临街商铺',
        label: '临街商铺',
      },
      {
        value: '特殊单位',
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
      size,
    };
  },
};
</script>

<style>
.customer {
  width: 600px;
}
</style>
