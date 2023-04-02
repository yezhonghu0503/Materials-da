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
            <a-button style="margin-right: 10px" type="primary" @click="search">
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
            @ok="handleOk"
          >
            <userAddVue></userAddVue>
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
        @page-change="onPageChange"
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
          >
            <template #cell>
              <a-button type="text" size="small"> 编辑 </a-button>
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
import { PolicyRecord, PolicyParams } from '@/api/list';
import { Pagination } from '@/types/global';
import { getUserList } from '@/api/user';
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
    const { loading, setLoading } = useLoading(true);
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
    const fetchData = async (
      params: PolicyParams = { current: 1, pageSize: 20 }
    ) => {
      setLoading(true);
      try {
        // const { data } = await queryPolicyList(params);
        // renderData.value = data.list;
        // pagination.current = params.current;
        // pagination.total = data.total;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };

    const search = () => {
      fetchData({
        ...basePagination,
        ...formModel.value,
      } as unknown as PolicyParams);
    };
    const onPageChange = (current: number) => {
      fetchData({ ...basePagination, current });
    };

    fetchData();
    const reset = () => {
      formModel.value = generateFormModel();
    };
    const userList = async () => {
      const data = { page: 1, limit: 10 };
      const res = await getUserList(data);
      renderData.value = res.data;
    };
    userList();
    const visible = ref(false);
    const handleOk = () => {
      visible.value = false;
    };
    return {
      loading,
      search,
      onPageChange,
      renderData,
      pagination,
      formModel,
      reset,
      visible,
      handleOk,
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
