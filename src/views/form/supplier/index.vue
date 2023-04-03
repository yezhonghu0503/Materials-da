<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.form.supplier']" />
    <a-card class="general-card" :title="$t('menu.form.supplier')">
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
                  :label="$t('menu.form.supplier.number')"
                >
                  <a-input
                    v-model="formModel.number"
                    :placeholder="$t('menu.form.supplier.number.placeholder')"
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
            <a-button type="primary" status="danger">
              <template #icon>
                <icon-delete />
              </template>
              批量删除
            </a-button>
          </a-space>
          <a-modal
            width="auto"
            :visible="visible"
            :hide-cancel="true"
            :ok-text="`取消`"
            @cancel="visible = false"
            @ok="handleOk"
          >
            <template #title> 新增供应商 </template>
            <supplierMsg @handle="createOk"></supplierMsg>
          </a-modal>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :data="renderData"
        :bordered="false"
      >
        <template #columns>
          <a-table-column title="供应商编号" data-index="id" />
          <a-table-column title="供应商名称" data-index="supplierName" />
          <a-table-column title="品牌名称" data-index="brandName" />
          <a-table-column title="公司名称" data-index="companyName" />
          <a-table-column title="创建时间" data-index="createTime">
          </a-table-column>

          <a-table-column
            :title="$t('searchTable.columns.operations')"
            data-index="operations"
          >
            <template #cell="{ record }">
              <a-popconfirm
                content="删除后不可恢复，是否确定删除该角色?"
                @ok="deleteRole(record.id)"
              >
                <a-button type="text" size="small"> 删除 </a-button>
              </a-popconfirm>
              <!-- <a-button v-permission="['admin']" type="text" size="small"> -->
              <a-button
                type="text"
                size="small"
                @click="editSupplier(record.id)"
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

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { PolicyRecord } from '@/api/list';
import { getSupplier, getDeleteSupplier, getSupplierInfo } from '@/api/form';
import { Message } from '@arco-design/web-vue';
import supplierMsg from './components/supplier-msg.vue';

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

const { loading } = useLoading(false);
const { t } = useI18n();
const renderData = ref<PolicyRecord[]>([]);
const formModel = ref(generateFormModel());

const reset = () => {
  formModel.value = generateFormModel();
};
const supplierList = async () => {
  const res = await getSupplier();
  renderData.value = res.data;
};
const visible = ref(false);
const handleOk = () => {
  visible.value = false;
};
const createOk = () => {
  visible.value = false;
  supplierList();
};
const deleteRole = async (ids: any) => {
  await getDeleteSupplier({ id: ids });
  Message.success('删除成功');
  supplierList();
};
const editSupplier = async (ids: any) => {
  const res = await getSupplierInfo({ id: ids });
  console.log(res);
};
supplierList();
</script>

<style scoped lang="less">
::v-deep .arco-modal-footer {
  display: none !important;
}
:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
</style>
