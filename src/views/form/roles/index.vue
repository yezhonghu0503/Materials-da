<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.form.roles']" />
    <a-card class="general-card" title="职权树">
      <div class="card">
        <a-card class="card__left">
          <a-tree :field-names="newdata" checkable show-line :data="treeData">
          </a-tree>
        </a-card>
        <div class="card__right">
          <div style="text-align: right; padding: 0 10px 10px 10px">
            <a-button type="primary" @click="visible = true"
              >新建</a-button
            ></div
          >

          <a-modal
            width="800px"
            :visible="visible"
            :ok-text="`提交`"
            @cancel="visible = false"
            @ok="handleOk"
          >
            <div style="display: flex; justify-content: center">
              <a-form :model="addForm" :style="{ width: '600px' }">
                <a-form-item
                  field="ruleName"
                  label="角色名"
                  :rules="[{ required: true, message: '供应商名称不能为空' }]"
                >
                  <a-input
                    v-model="addForm.ruleName"
                    placeholder="请输入角色名称"
                  ></a-input>
                </a-form-item>
                <a-form-item field="roleDesc" label="角色描述">
                  <a-input
                    v-model="addForm.roleDesc"
                    placeholder="请输入角色名称"
                  ></a-input>
                </a-form-item>
                <a-form-item field="rights" label="职权树">
                  <a-tree
                    v-model:checked-keys="addForm.rights"
                    :field-names="newdata"
                    checkable
                    show-line
                    :data="treeData"
                  >
                  </a-tree>
                </a-form-item>
              </a-form>
            </div>
            <template #title>新增角色</template>
          </a-modal>

          <a-table
            row-key="id"
            :loading="loading"
            :pagination="pagination"
            :data="renderData"
            :bordered="false"
          >
            <template #columns>
              <a-table-column title="角色编号" data-index="id" />
              <a-table-column title="角色名称" data-index="roleName" />
              <a-table-column title="角色描述" data-index="roleDesc" />
              <a-table-column title="创建时间" data-index="createTime" />

              <a-table-column
                :title="$t('searchTable.columns.operations')"
                data-index="operations"
                :width="200"
                align="center"
              >
                <template #cell="{ record }">
                  <a-popconfirm
                    content="删除后不可恢复，是否确定删除该角色?"
                    @ok="deleteRole(record.id)"
                  >
                    <a-button type="text" size="small"> 删除 </a-button>
                  </a-popconfirm>
                  <a-button
                    type="text"
                    size="small"
                    @click="editRole(record.id)"
                  >
                    编辑
                  </a-button>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { PolicyRecord, PolicyParams } from '@/api/list';
import { Pagination, Options } from '@/types/global';
import {
  getRoleList,
  postAddRole,
  getRoleRights,
  getRoleDetailed,
  getDeleteRole,
} from '@/api/form';
import { Message } from '@arco-design/web-vue';

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
  setup() {
    const { loading } = useLoading(true);
    const treeData: any = ref([]);
    const renderData: any = ref([]);
    const roleList = async () => {
      const res = await getRoleRights();
      treeData.value = res.data;
      renderData.value = (await getRoleList()).data;
      console.log(renderData);
      loading.value = false;
    };
    const newdata = {
      key: 'id',
      title: 'label',
      children: 'children',
    };
    roleList();
    const deleteRole = async (id: any) => {
      try {
        await getDeleteRole({ roleId: id });
        Message.success('删除成功！');
        roleList();
      } catch (error: any) {
        Message.error(error);
      }
    };
    const addForm = reactive({ ruleName: '', rights: [], roleDesc: '' });
    // const { t } = useI18n();
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
    const visible = ref(false);
    const handleOk = async () => {
      if (addForm.ruleName && addForm.rights.length > 0) {
        await postAddRole(addForm);
        addForm.ruleName = '';
        addForm.rights = [];
        addForm.roleDesc = '';
        Message.success('添加完成！');
        roleList();
        visible.value = false;
      } else {
        Message.error('请检查表单是否填写完整');
      }
    };
    const editRole = async (id: any) => {
      const roleId = { roleId: id };
      const res = await getRoleDetailed(roleId);
      console.log(res);
      visible.value = true;
    };
    return {
      visible,
      handleOk,
      loading,
      renderData,
      pagination,
      formModel,
      reset,
      addForm,
      treeData,
      newdata,
      editRole,
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
.card {
  width: 100%;
  display: flex;
  &__left {
    width: 30%;
    padding: 10px;
  }
  &__right {
    width: 70%;
    padding: 10px;
  }
}
</style>
