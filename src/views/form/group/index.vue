<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.form.group']" />
    <a-card class="general-card" :title="$t('menu.form.group')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="number"
                  :label="$t('menu.form.group.number')"
                >
                  <a-input
                    v-model="formModel.number"
                    :placeholder="$t('menu.form.group.number.placeholder')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 54px" direction="vertical" />
        <a-col :flex="'200px'" style="text-align: center; line-height: 54px">
          <a-space
            :flex="'180px'"
            style="flex-direction: row"
            direction="vertical"
            :size="18"
          >
            <a-button style="margin-right: 10px" type="primary">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="visible = true">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
          </a-space>
          <a-modal
            width="auto"
            :visible="visible"
            :hide-cancel="true"
            ok-text="取消"
            @cancel="visible = false"
            @ok="handleOk"
          >
            <userAddVue :user-info="userinfo"></userAddVue>
            <template #title> 新增用户 </template>
          </a-modal>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="renderData"
        :bordered="false"
      >
        <template #columns>
          <a-table-column title="用户名" data-index="userName" />
          <a-table-column title="用户名称" data-index="showName" />
          <a-table-column title="联系电话" data-index="phone" />
          <a-table-column title="角色" data-index="role" />
          <a-table-column title="创建时间" data-index="createTime" />

          <a-table-column
            :title="$t('searchTable.columns.operations')"
            data-index="operations"
            align="center"
          >
            <template #cell="{ record }">
              <a-popconfirm
                content="删除后不可恢复，是否确定删除该角色?"
                @ok="deleteRole(record.userId)"
              >
                <a-button type="text" size="small"> 删除 </a-button>
              </a-popconfirm>
              <a-button
                type="text"
                size="small"
                @click="editUser(record.userId)"
              >
                编辑
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { PolicyRecord } from '@/api/list';
import { Pagination } from '@/types/global';
import { getUserList, getDelUser } from '@/api/user';
import { Message } from '@arco-design/web-vue';
import userAddVue from './components/user-add.vue';

const generateFormModel = () => {
  return {
    number: '',
    name: '',
    contentType: '',
    filterType: '',
    createdTime: [],
    status: '',
  };
};
export default defineComponent({
  components: { userAddVue },
  setup() {
    const { loading } = useLoading(false);
    const { t } = useI18n();
    const renderData = ref<PolicyRecord[]>([]);
    const formModel = ref(generateFormModel());
    const basePagination: Pagination = {
      current: 1,
      pageSize: 20,
    };
    const pagination = reactive({
      ...basePagination,
    });
    const reset = () => {
      formModel.value = generateFormModel();
    };
    const userList = async () => {
      const data = { page: 1, limit: 10 };
      const res = await getUserList(data);
      console.log(res);
      renderData.value = res.data;
    };
    userList();
    const visible = ref(false);
    const handleOk = () => {
      visible.value = false;
    };
    const userinfo = ref('');
    const editUser = (id: any) => {
      userinfo.value = id;
      visible.value = true;
    };
    const deleteRole = async (id: any) => {
      try {
        await getDelUser({ userId: id });
        Message.success('删除成功！');
        visible.value = false;
        userList();
      } catch (error: any) {
        Message.error(error);
      }
    };
    return {
      loading,
      renderData,
      pagination,
      formModel,
      reset,
      visible,
      handleOk,
      editUser,
      userinfo,
      deleteRole,
    };
  },
});
</script>

<style scoped lang="less">
:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
</style>
