<template>
  <div class="container">
    <Breadcrumb :items="['menu.design', 'menu.logistics-order.title']" />
    <a-card class="general-card" :title="$t('menu.logistics-order.title')">
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
                  :label="$t('menu.logistics-order.number')"
                >
                  <a-input
                    v-model="formModel.number"
                    :placeholder="$t('searchTable.form.number.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="name"
                  :label="$t('menu.logistics-order.clientName')"
                >
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('searchTable.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="contentType"
                  :label="$t('menu.logistics-order.car')"
                >
                  <a-select
                    v-model="formModel.contentType"
                    :options="contentTypeOptions"
                    :placeholder="$t('menu.logistics-order.car')"
                  />
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  :label="$t('menu.surveyo-order.time')"
                >
                  <a-range-picker
                    v-model="formModel.createdTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
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
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
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
            :title="$t('menu.logistics-order.number')"
            data-index="number"
          />
          <a-table-column
            :title="$t('menu.logistics-order.clientName')"
            data-index="clientName"
          />
          <a-table-column
            :title="$t('menu.logistics-order.phone')"
            data-index="phone"
          >
          </a-table-column>
          <a-table-column
            :title="$t('menu.logistics-order.address')"
            data-index="address"
          >
          </a-table-column>
          <a-table-column
            :title="$t('menu.logistics-order.time')"
            data-index="time"
          />
          <a-table-column
            :title="$t('menu.logistics-order.car')"
            data-index="car"
          />
          <a-table-column
            :title="$t('menu.logistics-order.status')"
            data-index="status"
          >
            <template #cell="{ record }">
              <span v-if="record.status === 'offline'" class="circle"></span>
              <span v-else class="circle pass"></span>
              {{ record.status }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('menu.surveyo-order.op')"
            data-index="area"
          >
            <template #cell>
              <a-button
                v-permission="['admin']"
                type="text"
                size="small"
                @click="visible = true"
              >
                核验
              </a-button>
            </template>
          </a-table-column>
          <a-modal
            v-model:visible="visible"
            width="auto"
            ok-text="核验完成"
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <template #title> 核验订单 </template>
            <div
              style="display: flex; align-items: center; flex-direction: column"
            >
              <orderDetail style="width: 900px"></orderDetail>
            </div>
          </a-modal>
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
import components from '@/components';
import orderDetail from './components/order-detail.vue';

const generateFormModel: any = () => {
  return {
    number: '',
    clientName: '',
    phone: '',
    address: '',
    time: '',
    type: '',
    status: '',
    area: '',
  };
};
export default defineComponent({
  components: { orderDetail },
  setup() {
    const { loading, setLoading } = useLoading(true);
    const { t } = useI18n();
    const renderData: any = ref<PolicyRecord[]>([]);
    const formModel = ref(generateFormModel());
    const basePagination: Pagination = {
      current: 1,
      pageSize: 20,
    };
    const pagination = reactive({
      ...basePagination,
    });
    renderData.value = [
      {
        number: 1,
        clientName: '叶先生',
        phone: '13018242023',
        address: '贵阳市',
        time: '2023年3月16日',
        car: '<50m',
        status: '待指派',
        area: '200平',
      },
    ];
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
        label: t('searchTable.form.contentType.verticalVideo'),
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
    const visible = ref(false);

    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
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
      contentTypeOptions,
      filterTypeOptions,
      statusOptions,
      visible,
      handleClick,
      handleOk,
      handleCancel,
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
