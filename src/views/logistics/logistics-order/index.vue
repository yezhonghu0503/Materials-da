<template>
  <div class="container">
    <Breadcrumb :items="['menu.result', 'menu.logistics-order.title']" />
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
                <a-form-item field="number" :label="$t('menu.result.number')">
                  <a-input
                    v-model="formModel.number"
                    :placeholder="$t('searchTable.form.number.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('menu.result.name')">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('menu.result.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="contentType"
                  :label="$t('menu.result.status')"
                >
                  <a-select
                    v-model="formModel.contentType"
                    :options="productType"
                    :placeholder="$t('menu.result.status.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="filterType"
                  :label="$t('menu.result.time.type')"
                >
                  <a-select
                    v-model="formModel.filterType"
                    :options="filterTypeOptions"
                    :placeholder="$t('menu.result.time.type.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  :label="$t('searchTable.form.createdTime')"
                >
                  <a-range-picker
                    v-model="formModel.createdTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('menu.result.time.reservation')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    :placeholder="
                      $t('menu.result.time.reservation.placeholder')
                    "
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
            <a-button type="primary" @click="handleOpenNewOrder">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-modal
              :visible="isNewOrder"
              width="auto"
              ok-text="取消"
              :hide-cancel="true"
              @ok="handleOk"
              @cancel="isNewOrder = false"
            >
              <template #title> 新建订单 </template>
              <div class="neworder">
                <NewOrder style="width: 900px" @handle="isComplete"></NewOrder>
              </div>
            </a-modal>
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
            :title="$t('menu.result.number')"
            data-index="orderNo"
            :width="200"
          />
          <a-table-column
            :title="$t('menu.result.clientName')"
            data-index="customer.realName"
          />
          <a-table-column
            :title="$t('menu.result.phone')"
            data-index="customer.phoneNum"
          >
          </a-table-column>
          <a-table-column
            :title="$t('menu.result.address')"
            data-index="customer.address"
          >
          </a-table-column>
          <a-table-column
            :title="$t('menu.result.time')"
            data-index="createTime"
          />
          <a-table-column title="备注" data-index="remark" />
          <a-table-column
            :title="$t('menu.result.orderstatus')"
            data-index="state"
          >
            <template #cell="{ record }">
              <span v-if="record.status === 'offline'" class="circle"></span>
              <span v-else class="circle pass"></span>
              {{ record.state === 0 ? '待指派' : '进行中' }}
            </template>
          </a-table-column>
          <!-- <a-table-column :title="$t('menu.result.area')" data-index="area">
          </a-table-column> -->
          <a-table-column
            align="center"
            :title="$t('menu.result.op')"
            data-index="op"
          >
            <template #cell>
              <!-- <a-button type="text" size="small" @click="visible = true"> -->
              <a-button type="text" size="small"> 核验 </a-button>
              <!-- <a-button type="text" size="small" @click="visible = true">
                查看
              </a-button> -->
            </template>
            <a-modal
              v-model:visible="visible"
              width="auto"
              ok-text="确认"
              @ok="handleOk"
              @cancel="handleCancel"
            >
              <template #title> 订单详情 </template>
              <div class="order__detail">
                <orderDetail style="width: 900px"></orderDetail>
              </div>
            </a-modal>
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
import { PolicyRecord, PolicyParams } from '@/api/list';
import { Pagination, Options } from '@/types/global';
import { Message } from '@arco-design/web-vue';
import {
  getMeasurementList,
  getInstallList,
  getDeliveryList,
} from '@/api/appointment';
import orderDetail from './components/order-detail.vue';
import NewOrder from './components/new-order.vue';

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
  components: { NewOrder, orderDetail },
  setup() {
    const userType = window.localStorage.getItem('userRole');
    const { loading, setLoading } = useLoading(true);
    const { t } = useI18n();
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
        label: t('searchTable.form.contentType.verticalVideo'),
        value: 'verticalVideo',
      },
    ]);
    const filterTypeOptions: any = ref(['测量设计', '安装服务', '配送服务']);
    const statusOptions: any = ref([
      '待处理',
      '待指派',
      '待指派',
      '进行中',
      '已完成',
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

    const appointmentState = ref([
      '待处理',
      '待指派',
      '待指派',
      '进行中',
      '已完成',
    ]);
    // 创建订单
    const isNewOrder = ref(false);
    const handleOk = () => {
      isNewOrder.value = false;
    };
    const handleCancel = () => {
      isNewOrder.value = false;
    };
    const handleOpenNewOrder = () => {
      isNewOrder.value = true;
    };
    const visible = ref(false);
    const productType = ref([
      '橱柜',
      '人造石台面',
      '全屋定制',
      '床垫',
      '沙发',
      '成品家具（桌几柜）',
      '五金配件',
      '工具',
      '成品家具（床）',
      '其他',
    ]);
    const renderData: any = ref([]);
    const getDesignList = async () => {
      const res = await getDeliveryList({ pageNum: 1, pageSize: 10 });
      renderData.value = res.data.records;
      console.log(renderData);
    };
    getDesignList();
    const isComplete = () => {
      isNewOrder.value = false;
      getDesignList();
    };
    return {
      visible,
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
      isNewOrder,
      handleOk,
      handleCancel,
      handleOpenNewOrder,
      userType,
      isComplete,
      productType,
      appointmentState,
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
.neworder {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.order__detail {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
