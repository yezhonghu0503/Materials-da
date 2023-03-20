<template>
  <div class="container">
    <Breadcrumb :items="['menu.result', 'menu.result.title']" />
    <a-card class="general-card" :title="$t('menu.list.classify')">
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
                <a-form-item field="name" :label="$t('searchTable.form.name')">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('searchTable.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="contentType"
                  :label="$t('menu.list.form.contentType')"
                >
                  <a-select
                    v-model="formModel.contentType"
                    :options="contentTypeOptions"
                    :placeholder="$t('searchTable.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="filterType"
                  :label="$t('searchTable.form.filterType')"
                >
                  <a-select
                    v-model="formModel.filterType"
                    :options="filterTypeOptions"
                    :placeholder="$t('searchTable.form.selectDefault')"
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
                  :label="$t('searchTable.form.status')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    :placeholder="$t('searchTable.form.selectDefault')"
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
              ok-text="提交"
              @ok="handleOk"
              @cancel="handleCancel"
            >
              <template #title> 新建订单 </template>
              <div class="neworder">
                <NewOrder style="width: 900px"></NewOrder>
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
            data-index="number"
          />
          <a-table-column
            :title="$t('menu.result.clientName')"
            data-index="clientName"
          />
          <a-table-column :title="$t('menu.result.phone')" data-index="phone">
            <!-- <template #cell="{ record }">
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
          </template> -->
          </a-table-column>
          <a-table-column
            :title="$t('menu.result.address')"
            data-index="address"
          >
          </a-table-column>
          <a-table-column :title="$t('menu.result.time')" data-index="time" />
          <a-table-column :title="$t('menu.result.type')" data-index="type" />
          <a-table-column
            :title="$t('menu.result.orderstatus')"
            data-index="orderstatus"
          >
            <template #cell="{ record }">
              <span v-if="record.status === 'offline'" class="circle"></span>
              <span v-else class="circle pass"></span>
              {{ record.orderstatus }}
            </template>
          </a-table-column>
          <!-- <a-table-column :title="$t('menu.result.area')" data-index="area">
          </a-table-column> -->
          <a-table-column :title="$t('menu.result.op')" data-index="op">
            <template #cell>
              <a-button
                v-permission="['admin', 'cuscer']"
                type="text"
                size="small"
                @click="visible = true"
              >
                核验
              </a-button>
              <a-button
                v-permission="['customer']"
                type="text"
                size="small"
                @click="visible = true"
              >
                查看
              </a-button>
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
import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
import { Pagination, Options } from '@/types/global';
import { Message } from '@arco-design/web-vue';
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
    const renderData: any = ref<PolicyRecord[]>([]);
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

    // 创建订单
    const isNewOrder = ref(false);
    const handleOk = () => {
      if (
        (window.localStorage.getItem('customer') &&
          window.localStorage.getItem('supplier')) ||
        window.localStorage.getItem('measuring') ||
        window.localStorage.getItem('assemble')
      ) {
        isNewOrder.value = false;
        const clinent = JSON.parse(
          window.localStorage.getItem('customer') as any
        );
        const measuring = JSON.parse(
          window.localStorage.getItem('measuring') as any
        );
        const assemble = JSON.parse(
          window.localStorage.getItem('assemble') as any
        );
        if (!window.localStorage.getItem('orderStatus')) {
          window.localStorage.setItem('orderStatus', '待处理');
        }
        if (!window.localStorage.getItem('assembleStatus')) {
          window.localStorage.setItem('assembleStatus', '待处理');
        }
        if (!window.localStorage.getItem('designStatus')) {
          window.localStorage.setItem('designStatus', '待处理');
        }
        const order: any = [
          {
            number: 1,
            clientName: clinent.name,
            phone: clinent.number,
            address: `上海市/${clinent.region}`,
            time: measuring ? measuring.time : assemble.time,
            type: measuring ? '测量设计' : '安装服务',
            orderstatus: window.localStorage.getItem('orderStatus'),
          },
        ];
        window.localStorage.setItem('order', JSON.stringify(order));
      } else {
        Message.error('您尚有未填写完的信息或未选择服务！');
      }
    };
    renderData.value = JSON.parse(window.localStorage.getItem('order') as any);
    const handleCancel = () => {
      isNewOrder.value = false;
    };
    const handleOpenNewOrder = () => {
      isNewOrder.value = true;
    };
    const visible = ref(false);
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
