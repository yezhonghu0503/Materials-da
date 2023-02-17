<template>
  <div class="container">
    <Breadcrumb :items="['menu.profile', 'menu.profile.basic']" />
    <a-card class="general-card" :title="$t('menu.profile.basic')">
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('menu.profile.create') }}
            </a-button>
          </a-space>
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
          <a-table-column
            :title="$t('searchTable.columns.number')"
            data-index="number"
          />
          <a-table-column
            :title="$t('searchTable.columns.name')"
            data-index="name"
          />
          <a-table-column
            :title="$t('searchTable.columns.contentType')"
            data-index="contentType"
          >
            <template #cell="{ record }">
              <a-space>
                <a-avatar
                  v-if="record.contentType === 'img'"
                  :size="16"
                  shape="square"
                >
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-avatar
                  v-else-if="record.contentType === 'horizontalVideo'"
                  :size="16"
                  shape="square"
                >
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-avatar v-else :size="16" shape="square">
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                {{ $t(`menu.list.form.contentType.${record.contentType}`) }}
              </a-space>
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('searchTable.columns.filterType')"
            data-index="filterType"
          >
            <template #cell="{ record }">
              {{ $t(`searchTable.form.filterType.${record.filterType}`) }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('searchTable.columns.count')"
            data-index="count"
          />
          <a-table-column
            :title="$t('searchTable.columns.createdTime')"
            data-index="createdTime"
          />
          <a-table-column
            :title="$t('searchTable.columns.status')"
            data-index="status"
          >
            <template #cell="{ record }">
              <span v-if="record.status === 'offline'" class="circle"></span>
              <span v-else class="circle pass"></span>
              {{ $t(`searchTable.form.status.${record.status}`) }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('searchTable.columns.operations')"
            data-index="operations"
          >
            <template #cell>
              <a-button v-permission="['admin']" type="text" size="small">
                {{ $t('searchTable.columns.operations.view') }}
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
import { Pagination, Options } from '@/types/global';

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
    const contentTypeOptions: any = computed<Options[]>(() => [
      {
        label: t('menu.list.form.contentType.img'),
        value: 'img',
      },
      {
        label: t('menu.list.form.contentType.horizontalVideo'),
        value: 'horizontalVideo',
      },
      {
        label: t('menu.list.form.contentType.verticalVideo'),
        value: 'verticalVideo',
      },
    ]);
    const filterTypeOptions: any = computed<Options[]>(() => [
      {
        label: t('searchTable.form.filterType.artificial'),
        value: 'artificial',
      },
      {
        label: t('searchTable.form.filterType.rules'),
        value: 'rules',
      },
    ]);
    const statusOptions: any = computed<Options[]>(() => [
      {
        label: t('searchTable.form.status.online'),
        value: 'online',
      },
      {
        label: t('searchTable.form.status.offline'),
        value: 'offline',
      },
    ]);
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
    return {
      loading,
      search,
      onPageChange,
      renderData,
      pagination,
      formModel,
      reset,
      contentTypeOptions,
      filterTypeOptions,
      statusOptions,
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
