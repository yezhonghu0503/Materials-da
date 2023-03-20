<template>
  <div class="supplier">
    <a-form
      ref="formRef"
      :size="form.size"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <a-form-item field="name" label="品牌名称">
        <a-input
          v-model="form.name"
          disabled
          placeholder="请输入您的品牌名称"
        />
      </a-form-item>
      <a-form-item field="sname" label="供应商公司">
        <a-input
          v-model="form.sname"
          disabled
          placeholder="请输入您的供应商公司名称"
        />
      </a-form-item>
      <a-form-item field="supplying " label="供货方式">
        <a-radio-group>
          <a-radio disabled value="0">干线提货</a-radio>
          <a-radio :default-checked="true" value="1">本地仓配</a-radio>
          <a-radio disabled value="2">安装售后</a-radio>
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
          :size="puform.size"
          :model="puform"
          :style="{ width: '600px' }"
          @submit="handleSubmit"
        >
          <a-form-item field="goodsName" label="单位名称">
            <a-input
              v-model="puform.goodsName"
              placeholder="请输入提货单位名称"
              disabled
            />
          </a-form-item>
          <a-form-item field="goodsUserName" label="提货联系人">
            <a-input
              v-model="puform.goodsUserName"
              placeholder="请输入提货联系人名称"
              disabled
            />
          </a-form-item>
          <a-form-item field="goodsNumber" label="联系电话">
            <a-input
              v-model="puform.goodsNumber"
              disabled
              placeholder="请输入提货联系人联系电话"
            />
          </a-form-item>
          <a-form-item field="goodsAddress" label="提货地址">
            <a-input
              v-model="puform.goodsAddress"
              disabled
              placeholder="请输入提货地址"
            />
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
              disabled
            />
          </a-form-item>
        </a-form>
      </a-form-item>
      <a-form-item
        v-for="(post, index) of form.bailorPosts"
        :key="index"
        :field="`posts.${index}.value`"
        :label="`委托人信息-${index}`"
      >
        <a-form
          ref="formRef"
          :size="bform.size"
          :model="bform"
          :style="{ width: '600px' }"
          @submit="handleSubmit"
        >
          <a-form-item field="bailorName" label="委托人姓名">
            <a-input
              v-model="bform.bailorName"
              placeholder="请输入委托人姓名"
              disabled
            />
          </a-form-item>
          <a-form-item field="bailorJob" label="职务">
            <a-input
              v-model="bform.goodsUserName"
              placeholder="请输入委托人职务名称"
              disabled
            />
          </a-form-item>
          <a-form-item field="bailorNumber" label="联系电话">
            <a-input
              v-model="bform.bailorNumber"
              disabled
              :placeholder="`请输入提货委托人${bform.bailorName}联系电话`"
            />
          </a-form-item>
          <a-form-item field="bailorAddress" label="地址">
            <a-input
              v-model="bform.bailorAddress"
              disabled
              placeholder="请输入提货地址"
            />
          </a-form-item>
          <!-- <div style="text-align: right"
            ><a-button @click="handleAdd">新增</a-button>
            <a-button @click="handleDelete">删除</a-button></div
          > -->
        </a-form>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';

export default {
  name: 'SupplierMsg',
  setup() {
    const form: any = reactive({
      name: '装得快供应链',
      scene: '装得快供应链有限公司',
      size: 'medium',
      bailorName: 'abc',
      posts: [{ value: '' }],
      bailorPosts: [{ value: '' }],
    });
    const puform: any = reactive({
      size: 'medium',
      goodsName: '装得快贵阳本地仓',
      goodsUserName: '叶先生',
      goodsNumber: '13023219321',
      goodsAddress: '贵阳市观山湖区金融城',
    });
    const bform: any = reactive({
      size: 'medium',
      bailorName: '陈女士',
      goodsUserName: '职业代理',
      bailorNumber: '18201332113',
      bailorAddress: '贵阳市观山湖区金融城',
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
      puform,
      bform,
    };
  },
};
</script>

<style lang="less" scoped>
.supplier {
  width: 600px;
}
</style>
