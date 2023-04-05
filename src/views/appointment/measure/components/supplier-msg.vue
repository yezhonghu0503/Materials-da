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
        <a-radio
          :disabled="form.supplying !== '0'"
          :default-checked="form.supplying === '0'"
          value="0"
          >干线提货</a-radio
        >
        <a-radio
          :disabled="form.supplying !== '1'"
          :default-checked="form.supplying === '1'"
          value="1"
          >本地仓配</a-radio
        >
        <a-radio
          :disabled="form.supplying !== '2'"
          :default-checked="form.supplying === '2'"
          value="2"
          >安装售后</a-radio
        >
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
          :model="form.posts[index]"
          :style="{ width: '600px' }"
          @submit="handleSubmit"
        >
          <a-form-item field="goodsName" label="单位名称">
            <a-input
              v-model="form.posts[index].goodsName"
              placeholder="请输入提货单位名称"
              disabled
            />
          </a-form-item>
          <a-form-item field="goodsUserName" label="提货联系人">
            <a-input
              v-model="form.posts[index].goodsUserName"
              placeholder="请输入提货联系人名称"
              disabled
            />
          </a-form-item>
          <a-form-item field="goodsNumber" label="联系电话">
            <a-input
              v-model="form.posts[index].goodsNumber"
              disabled
              placeholder="请输入提货联系人联系电话"
            />
          </a-form-item>
          <a-form-item field="goodsAddress" label="提货地址">
            <a-input
              v-model="form.posts[index].goodsAddress"
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
              v-model="form.posts[index].remarks"
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
          :model="form.bailorPosts[index]"
          :style="{ width: '600px' }"
          @submit="handleSubmit"
        >
          <a-form-item field="bailorName" label="委托人姓名">
            <a-input
              v-model="form.bailorPosts[index].bailorName"
              placeholder="请输入委托人姓名"
              disabled
            />
          </a-form-item>
          <a-form-item field="bailorJob" label="职务">
            <a-input
              v-model="form.bailorPosts[index].goodsUserName"
              placeholder="请输入委托人职务名称"
              disabled
            />
          </a-form-item>
          <a-form-item field="bailorNumber" label="联系电话">
            <a-input
              v-model="form.bailorPosts[index].bailorNumber"
              disabled
              :placeholder="`请输入提货委托人${bform.bailorName}联系电话`"
            />
          </a-form-item>
          <a-form-item field="bailorAddress" label="地址">
            <a-input
              v-model="form.bailorPosts[index].bailorAddress"
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
    const supplier = JSON.parse(window.localStorage.getItem('supplier') as any);
    const form: any = reactive({});
    const puform: any = reactive({});
    const bform: any = reactive({});
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
