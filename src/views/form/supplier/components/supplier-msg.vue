<template>
  <div class="supplier">
    <a-form
      ref="formRef"
      :size="size"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-alert
          >创建完成后，将会同步创建供应商管理员，供应商管理员账户默认为第一委托人电话号码，默认密码为123456，管理员账户创建后，账号不可修改，请谨慎填写！</a-alert
        >
      </a-form-item>
      <a-form-item
        field="supplierName"
        label="供应商名称"
        :rules="[{ required: true, message: '供应商名称不能为空' }]"
      >
        <a-input v-model="form.supplierName" placeholder="请输入供应商名称" />
      </a-form-item>
      <a-form-item
        field="brandName"
        label="品牌名称"
        :rules="[{ required: true, message: '品牌名称不能为空' }]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.brandName" placeholder="请输入品牌名称" />
      </a-form-item>
      <a-form-item
        field="companyName"
        label="公司名称"
        :rules="[
          { required: true, message: '公司名称不能为空' },
          { minLength: 5, message: '供应商公司名称至少包含五个字符' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input
          v-model="form.companyName"
          placeholder="请输入您的供应商公司名称"
        />
      </a-form-item>
      <a-form-item
        field="supplyMode"
        label="供货方式"
        :rules="[{ required: true, message: '请选择性别' }]"
      >
        <a-radio-group v-model="form.supplyMode">
          <a-radio value="0" @click="isDeliveryInfos = false">干线提货</a-radio>
          <a-radio value="1" @click="isDeliveryInfos = true">本地仓配</a-radio>
          <a-radio value="2" @click="isDeliveryInfos = true">安装售后</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        v-for="(post, index) of form.deliveryInfos"
        :key="index"
        :field="`posts.${index}.value`"
        :label="`提货信息-${index}`"
      >
        <a-form
          ref="formRef"
          :size="size"
          :model="form.deliveryInfos[index]"
          :style="{ width: '600px' }"
          :disabled="isDeliveryInfos"
          @submit="handleSubmit"
        >
          <a-form-item
            field="companyName"
            label="单位名称"
            :rules="[{ required: true, message: '单位名称不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.deliveryInfos[index].companyName"
              placeholder="请输入提货单位名称"
            />
          </a-form-item>
          <a-form-item
            field="contactName"
            label="提货联系人"
            :rules="[{ required: true, message: '提货联系人不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.deliveryInfos[index].contactName"
              placeholder="请输入提货联系人名称"
            />
          </a-form-item>
          <a-form-item
            field="contactPhoneNum"
            label="联系电话"
            :rules="[
              { required: true, message: '联系电话不能为空' },
              { minLength: 11, message: '请输入正确的联系方式' },
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.deliveryInfos[index].contactPhoneNum"
              placeholder="请输入提货联系人联系电话"
            />
          </a-form-item>
          <a-form-item
            field="address"
            label="提货地址"
            :rules="[{ required: true, message: '提货地址不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.deliveryInfos[index].address"
              placeholder="请输入提货地址"
            />
          </a-form-item>
          <!-- <div style="text-align: right"
            ><a-button @click="handleAdd">新增</a-button>
            <a-button @click="handleDelete">删除</a-button></div
          > -->
          <a-form-item field="remark" label="备注">
            <a-textarea
              v-model="form.deliveryInfos[index].remark"
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
        v-for="(post, index) of form.principalInfos"
        :key="index"
        :field="`posts.${index}.value`"
        :label="`委托人信息-${index}`"
      >
        <a-form
          ref="formRef"
          :size="size"
          :model="form.principalInfos[index]"
          :style="{ width: '600px' }"
          @submit="handleSubmit"
        >
          <a-form-item
            field="contactName"
            label="委托人姓名"
            :rules="[{ required: true, message: '委托人姓名不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.principalInfos[index].contactName"
              placeholder="请输入委托人姓名"
            />
          </a-form-item>
          <a-form-item
            field="position"
            label="职务"
            :rules="[{ required: true, message: '委托人职务不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.principalInfos[index].position"
              placeholder="请输入委托人职务名称"
            />
          </a-form-item>
          <a-form-item
            field="contactPhoneNum"
            label="联系电话"
            :rules="[{ required: true, message: '委托人联系电话不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.principalInfos[index].contactPhoneNum"
              :placeholder="`请输入提货委托人${form.contactName}联系电话`"
            />
          </a-form-item>
          <a-form-item
            field="address"
            label="地址"
            :rules="[{ required: true, message: '地址不能为空' }]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="form.principalInfos[index].address"
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
          <a-button type="primary" @click="addSupplier">提交</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits } from 'vue';
import { Message } from '@arco-design/web-vue';
import { addNewSupplier, getRoleList } from '@/api/form';
// import { postAddUser } from '@/api/user';

const size: any = ref('medium');
const form: any = reactive({
  supplierName: '',
  // brandName: '',
  // companyName: '',
  supplyMode: '',
  createTime: '',
  deliveryInfos: [
    {
      companyName: '',
      contactName: '',
      contactPhoneNum: '',
      address: '',
      remark: '',
    },
  ],
  principalInfos: [
    {
      contactName: '',
      contactPhoneNum: '',
      position: '',
      address: '',
    },
  ],
  // bailorName: 'abc',
  // posts: [{ value: '' }],
  // bailorPosts: [{ value: '' }],
});
let formCheck = false;
const handleSubmit = async ({ values, errors }: any) => {
  // eslint-disable-next-line no-console
  if (errors === undefined) {
    // window.localStorage.setItem('user', values);
    formCheck = true;
    Message.success('检验完成，信息已填写完整!');
  } else {
    formCheck = false;
    Message.error('请检查表单是否有填写错误或不完整');
  }
};
const emit = defineEmits(['handle']);
const addSupplier = async () => {
  let supplierRoleId = null;
  const res = await getRoleList();
  res.data.forEach((item: any) => {
    if (item.roleName === '供应商') {
      supplierRoleId = item.id;
    }
  });
  if (!supplierRoleId) {
    Message.error('暂无供应商角色，请先创建!');
  } else if (formCheck) {
    await addNewSupplier(form);
    // await postAddUser({
    //   userName: form.principalInfos[0].contactPhoneNum,
    //   showName: form.supplierName,
    //   password: '123456',
    //   roleId: supplierRoleId,
    //   phone: form.principalInfos[0].contactPhoneNum,
    // });
    Message.success('创建完成！');
    emit('handle');
  }
};
const handleAdd = () => {
  form.deliveryInfos.push({
    goodsName: '',
    goodsUserName: '',
    goodsNumber: '',
    goodsAddress: '',
    remarks: '',
  });
};
const bailorHandleAdd = () => {
  form.principalInfos.push({
    bailorName: '',
    goodsUserName: '',
    contactPhoneNum: '',
    bailorJob: '',
    goodsAddress: '',
  });
};
const handleDelete = (index: any) => {
  if (form.deliveryInfos.length !== 1) {
    form.deliveryInfos.splice(index, 1);
  }
};
const bailorHandleDelete = (index: any) => {
  if (form.principalInfos.length !== 1) {
    form.principalInfos.splice(index, 1);
  }
};
const isDeliveryInfos = ref(false);
</script>

<style lang="less" scoped>
.supplier {
  width: 800px;
  display: flex;
  justify-content: center;
}
</style>
