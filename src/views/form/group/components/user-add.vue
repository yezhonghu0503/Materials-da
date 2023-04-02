<template>
  <div class="supplier">
    <a-form
      ref="formRef"
      :size="size"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <a-form-item
        field="userName"
        label="用户名称"
        :rules="[{ required: true, message: '用户名称不能为空' }]"
      >
        <a-input v-model="form.userName" placeholder="请输入用户名称" />
      </a-form-item>
      <a-form-item
        field="showName"
        label="用户昵称"
        :rules="[{ required: true, message: '用户昵称不能为空' }]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.showName" placeholder="请输入用户昵称" />
      </a-form-item>
      <a-form-item
        field="password"
        label="用户密码"
        :rules="[{ required: true, message: '用户密码不能为空' }]"
      >
        <a-input
          v-model="form.password"
          type="password"
          placeholder="请输入您的用户密码"
        />
      </a-form-item>
      <a-form-item field="againPassword" label="再次输入" :rules="rules">
        <a-input
          v-model="form.againPassword"
          type="password"
          placeholder="请再次输入您的用户密码"
        />
      </a-form-item>
      <a-form-item
        field="phone"
        label="联系电话"
        :rules="[{ required: true, message: '联系电话不能为空' }]"
      >
        <a-input v-model="form.phone" placeholder="请输入您的联系电话" />
      </a-form-item>
      <a-form-item
        field="roleId"
        label="选择角色"
        :rules="[{ required: true, message: '角色选择不能为空' }]"
      >
        <a-select v-model="form.roleId" placeholder="请选择角色" allow-clear>
          <a-option
            v-for="(item, index) in roleData"
            :key="index"
            @click="getKey(item.id)"
            >{{ item.roleName }}</a-option
          >
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit">
            {{ $props.userInfo ? '确认修改' : '确认创建' }}</a-button
          >
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { postAddUser, getUserInfo } from '@/api/user';
import { getRoleList } from '@/api/form';

export default {
  name: 'SupplierMsg',
  props: ['userInfo'],
  setup(props) {
    const form: any = reactive({
      userName: '',
      // brandName: '',
      // companyName: '',
      showName: '',
      password: '',
      againPassword: '',
      phone: '',
      roleId: '',
    });
    const roleData: any = ref([]);
    const RoleList = async () => {
      roleData.value = (await getRoleList()).data;
    };
    RoleList();
    watch(
      () => props.userInfo,
      async (id) => {
        console.log(roleData);
        const res = await getUserInfo({ userId: id });
        form.userName = res.data.userName;
        form.showName = res.data.showName;
        form.phone = res.data.phone;
        roleData.value.forEach((item: any) => {
          if (item.id === res.data.roleId) {
            form.roleId = item.roleName;
          }
        });
      }
    );
    const size: any = ref('medium');
    let formCheck = false;
    let delId: any = null;
    const getKey = (index: any) => {
      delId = index;
    };
    const inconsistency = ref(true);
    const rules = [
      {
        required: true,
        validator: (value: any, cb: any) => {
          return new Promise((resolve) => {
            window.setTimeout(() => {
              if (form.password !== value) {
                cb('两次输入密码不一致');
              }
              resolve(value);
            }, 500);
          });
        },
      },
    ];
    const handleSubmit = async ({ values, errors }: any) => {
      // eslint-disable-next-line no-console
      if (errors === undefined) {
        // window.localStorage.setItem('user', values);
        formCheck = true;
        const data = {
          userName: form.userName,
          showName: form.showName,
          password: form.password,
          phone: form.phone,
          roleId: delId,
        };
        try {
          await postAddUser(data);
          Message.success('创建完成!');
        } catch (error) {
          Message.error(`错误:${error}`);
        }
      } else {
        formCheck = false;
        Message.error('请检查表单是否有填写错误或不完整');
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
    return {
      form,
      handleSubmit,
      handleAdd,
      handleDelete,
      bailorHandleDelete,
      bailorHandleAdd,
      isDeliveryInfos,
      size,
      roleData,
      getKey,
      rules,
      inconsistency,
    };
  },
};
</script>

<style lang="less" scoped>
.supplier {
  width: 800px;
  display: flex;
  justify-content: center;
}
</style>
