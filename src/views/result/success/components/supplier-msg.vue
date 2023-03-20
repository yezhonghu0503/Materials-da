<template>
  <div class="supplier">
    <a-form
      ref="formRef"
      :size="form.size"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-alert
          >检测到您的身份为供应商，一键<span style="color: #3491fa"
            >导入信息</span
          ></a-alert
        >
      </a-form-item>
      <a-form-item
        field="name"
        label="品牌名称"
        :rules="[{ required: true, message: '品牌名称不能为空' }]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.name" placeholder="请输入您的品牌名称" />
      </a-form-item>
      <a-form-item
        field="sname"
        label="供应商公司"
        :rules="[
          { required: true, message: '供应商公司名称不能为空' },
          { minLength: 5, message: '供应商公司名称至少包含五个字符' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.sname" placeholder="请输入您的供应商公司名称" />
      </a-form-item>
      <a-form-item
        field="supplying"
        label="供货方式"
        :rules="[{ required: true, message: '请选择性别' }]"
      >
        <a-radio-group v-model="form.supplying">
          <a-radio value="0">干线提货</a-radio>
          <a-radio value="1">本地仓配</a-radio>
          <a-radio value="2">安装售后</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        v-for="(post, index) of form.sourcing"
        :key="index"
        :field="`posts.${index}.value`"
        :label="`提货信息-${index}`"
      >
        <a-form
          ref="formRef"
          :size="form.size"
          :model="form.sourcing[index]"
          :style="{ width: '600px' }"
          @submit="handleSubmit"
        >
          <a-form-item
            field="goodsName"
            label="单位名称"
            :rules="[{ required: true, message: '单位名称不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.sourcing[index].goodsName"
              placeholder="请输入提货单位名称"
            />
          </a-form-item>
          <a-form-item
            field="goodsUserName"
            label="提货联系人"
            :rules="[{ required: true, message: '提货联系人不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.sourcing[index].goodsUserName"
              placeholder="请输入提货联系人名称"
            />
          </a-form-item>
          <a-form-item
            field="goodsNumber"
            label="联系电话"
            :rules="[
              { required: true, message: '联系电话不能为空' },
              { minLength: 11, message: '请输入正确的联系方式' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.sourcing[index].goodsNumber"
              placeholder="请输入提货联系人联系电话"
            />
          </a-form-item>
          <a-form-item
            field="goodsAddress"
            label="提货地址"
            :rules="[{ required: true, message: '提货地址不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.sourcing[index].goodsAddress"
              placeholder="请输入提货地址"
            />
          </a-form-item>
          <!-- <div style="text-align: right"
            ><a-button @click="handleAdd">新增</a-button>
            <a-button @click="handleDelete">删除</a-button></div
          > -->
          <a-form-item field="remarks" label="备注">
            <a-textarea
              v-model="form.sourcing[index].remarks"
              placeholder="若有其他疑问或问题，请在备注中描述"
              :max-length="100"
              allow-clear
              show-word-limit
              style="min-height: 95px"
            />
          </a-form-item>
        </a-form>
      </a-form-item>
      <div style="text-align: right; margin-bottom: 20px"
        ><a-button @click="handleAdd">新增</a-button>
        <a-button @click="handleDelete">删除</a-button></div
      >
      <a-form-item
        v-for="(post, index) of form.bailor"
        :key="index"
        :field="`posts.${index}.value`"
        :label="`委托人信息-${index}`"
      >
        <a-form
          ref="formRef"
          :size="form.size"
          :model="form.bailor[index]"
          :style="{ width: '600px' }"
          @submit="handleSubmit"
        >
          <a-form-item
            field="bailorName"
            label="委托人姓名"
            :rules="[{ required: true, message: '委托人姓名不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.bailor[index].bailorName"
              placeholder="请输入委托人姓名"
            />
          </a-form-item>
          <a-form-item
            field="bailorJob"
            label="职务"
            :rules="[{ required: true, message: '委托人职务不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.bailor[index].bailorJob"
              placeholder="请输入委托人职务名称"
            />
          </a-form-item>
          <a-form-item
            field="bailorNumber"
            label="联系电话"
            :rules="[{ required: true, message: '委托人联系电话不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.bailor[index].bailorNumber"
              :placeholder="`请输入提货委托人${form.bailorName}联系电话`"
            />
          </a-form-item>
          <a-form-item
            field="goodsAddress"
            label="地址"
            :rules="[{ required: true, message: '地址不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.bailor[index].goodsAddress"
              placeholder="请输入提货地址"
            />
          </a-form-item>
          <!-- <div style="text-align: right"
            ><a-button @click="handleAdd">新增</a-button>
            <a-button @click="handleDelete">删除</a-button></div
          > -->
        </a-form>
      </a-form-item>
      <div style="text-align: right; margin-bottom: 20px"
        ><a-button @click="bailorHandleAdd">新增</a-button>
        <a-button @click="bailorHandleDelete">删除</a-button></div
      >
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit">校验信息</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { Message } from '@arco-design/web-vue';

export default {
  name: 'SupplierMsg',
  setup() {
    const form: any = reactive({
      size: 'medium',
      name: '',
      sname: '',
      supplying: '',
      sourcing: [
        {
          goodsName: '',
          goodsUserName: '',
          goodsNumber: '',
          goodsAddress: '',
          remarks: '',
        },
      ],
      bailor: [
        {
          bailorName: '',
          goodsUserName: '',
          bailorNumber: '',
          bailorJob: '',
          goodsAddress: '',
        },
      ],
      bailorName: 'abc',
      posts: [{ value: '' }],
      bailorPosts: [{ value: '' }],
    });
    const handleSubmit = ({ values, errors }: any) => {
      // eslint-disable-next-line no-console
      if (errors === undefined) {
        // window.localStorage.setItem('user', values);
        window.localStorage.setItem('supplier', JSON.stringify(values));
        Message.success('检验成功，请点击下一个表单继续填写信息!');
      } else {
        Message.error('请检查表单是否有填写错误或不完整');
      }
    };
    const handleAdd = () => {
      form.sourcing.push({
        goodsName: '',
        goodsUserName: '',
        goodsNumber: '',
        goodsAddress: '',
        remarks: '',
      });
    };
    const bailorHandleAdd = () => {
      form.bailor.push({
        bailorName: '',
        goodsUserName: '',
        bailorNumber: '',
        bailorJob: '',
        goodsAddress: '',
      });
    };
    const handleDelete = (index: any) => {
      if (form.sourcing.length !== 1) {
        form.sourcing.splice(index, 1);
      }
    };
    const bailorHandleDelete = (index: any) => {
      if (form.bailor.length !== 1) {
        form.bailor.splice(index, 1);
      }
    };
    return {
      form,
      handleSubmit,
      handleAdd,
      handleDelete,
      bailorHandleDelete,
      bailorHandleAdd,
    };
  },
};
</script>

<style lang="less" scoped>
.supplier {
  width: 600px;
}
</style>
