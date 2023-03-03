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
        :rules="[
          { required: true, message: 'name is required' },
          { minLength: 5, message: 'must be greater than 5 characters' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.name" placeholder="请输入您的品牌名称" />
      </a-form-item>
      <a-form-item
        field="sname"
        label="供应商公司"
        :rules="[
          { required: true, message: 'name is required' },
          { minLength: 5, message: 'must be greater than 5 characters' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.sname" placeholder="请输入您的供应商公司名称" />
      </a-form-item>
      <a-form-item
        field="supplying "
        label="供货方式"
        :rules="[{ required: true, message: '请选择提货方式' }]"
      >
        <a-radio-group>
          <a-radio value="0">干线提货</a-radio>
          <a-radio value="1">本地仓配</a-radio>
          <a-radio value="2">安装售后</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        v-for="(post, index) of form.posts"
        :key="index"
        :field="`posts.${index}.value`"
        :label="`提货信息-${index}`"
      >
        <a-form
          ref="formRef"
          :size="form.size"
          :model="form"
          :style="{ width: '600px' }"
          @submit="handleSubmit"
        >
          <a-form-item
            field="goodsName"
            label="单位名称"
            :rules="[
              { required: true, message: 'name is required' },
              { minLength: 5, message: 'must be greater than 5 characters' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.goodsName"
              placeholder="请输入提货单位名称"
            />
          </a-form-item>
          <a-form-item
            field="goodsUserName"
            label="提货联系人"
            :rules="[
              { required: true, message: 'name is required' },
              { minLength: 5, message: 'must be greater than 5 characters' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.goodsUserName"
              placeholder="请输入提货联系人名称"
            />
          </a-form-item>
          <a-form-item
            field="goodsNumber"
            label="联系电话"
            :rules="[
              { required: true, message: 'name is required' },
              { minLength: 5, message: 'must be greater than 5 characters' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.goodsNumber"
              placeholder="请输入提货联系人联系电话"
            />
          </a-form-item>
          <a-form-item
            field="goodsAddress"
            label="提货地址"
            :rules="[
              { required: true, message: 'name is required' },
              { minLength: 5, message: 'must be greater than 5 characters' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input v-model="form.goodsAddress" placeholder="请输入提货地址" />
          </a-form-item>
          <!-- <div style="text-align: right"
            ><a-button @click="handleAdd">新增</a-button>
            <a-button @click="handleDelete">删除</a-button></div
          > -->
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
      </a-form-item>
      <div style="text-align: right; margin-bottom: 20px"
        ><a-button @click="handleAdd">新增</a-button>
        <a-button @click="handleDelete">删除</a-button></div
      >
      <a-form-item
        v-for="(post, index) of form.bailorPosts"
        :key="index"
        :field="`posts.${index}.value`"
        :label="`委托人信息-${index}`"
      >
        <a-form
          ref="formRef"
          :size="form.size"
          :model="form"
          :style="{ width: '600px' }"
          @submit="handleSubmit"
        >
          <a-form-item
            field="bailorName"
            label="委托人姓名"
            :rules="[
              { required: true, message: 'name is required' },
              { minLength: 5, message: 'must be greater than 5 characters' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input v-model="form.bailorName" placeholder="请输入委托人姓名" />
          </a-form-item>
          <a-form-item
            field="bailorJob"
            label="职务"
            :rules="[
              { required: true, message: 'name is required' },
              { minLength: 5, message: 'must be greater than 5 characters' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.goodsUserName"
              placeholder="请输入委托人职务名称"
            />
          </a-form-item>
          <a-form-item
            field="bailorNumber"
            label="联系电话"
            :rules="[
              { required: true, message: 'name is required' },
              { minLength: 5, message: 'must be greater than 5 characters' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.bailorNumber"
              :placeholder="`请输入提货委托人${form.bailorName}联系电话`"
            />
          </a-form-item>
          <a-form-item
            field="bailorAddress"
            label="地址"
            :rules="[
              { required: true, message: 'name is required' },
              { minLength: 5, message: 'must be greater than 5 characters' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input v-model="form.goodsAddress" placeholder="请输入提货地址" />
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
    </a-form>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';

export default {
  name: 'SupplierMsg',
  setup() {
    const form: any = reactive({
      size: 'medium',
      bailorName: 'abc',
      posts: [{ value: '' }],
      bailorPosts: [{ value: '' }],
    });
    const handleSubmit = ({ values, errors }: any) => {
      // eslint-disable-next-line no-console
      console.log('values:', values, '\nerrors:', errors);
    };
    const handleAdd = () => {
      form.posts.push({
        value: '',
      });
    };
    const bailorHandleAdd = () => {
      form.bailorPosts.push({
        value: '',
      });
    };
    const handleDelete = (index: any) => {
      if (form.posts.length !== 1) {
        form.posts.splice(index, 1);
      }
    };
    const bailorHandleDelete = (index: any) => {
      if (form.bailorPosts.length !== 1) {
        form.bailorPosts.splice(index, 1);
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
