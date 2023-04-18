<template>
  <div class="container">
    <Breadcrumb :items="['menu.result', 'menu.complex-query.title']" />
    <a-card class="general-card" :title="$t('menu.complex-query.title')">
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
                  :label="$t('menu.complex-query.number')"
                >
                  <a-input
                    v-model="formModel.number"
                    :placeholder="$t('menu.complex-query.number.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="name"
                  :label="$t('menu.complex-query.name')"
                >
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('menu.complex-query.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="name"
                  :label="$t('menu.complex-query.phone')"
                >
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('menu.complex-query.phone.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="contentType"
                  :label="$t('menu.complex-query.status')"
                >
                  <a-select
                    v-model="formModel.contentType"
                    :options="productType"
                    :placeholder="$t('menu.complex-query.status.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="filterType"
                  :label="$t('menu.complex-query.type')"
                >
                  <a-select
                    v-model="formModel.filterType"
                    :options="filterTypeOptions"
                    :placeholder="$t('menu.complex-query.type.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  :label="$t('menu.complex-query.time')"
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
                  :label="$t('menu.complex-query.time.type')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="appointmentType"
                    :placeholder="
                      $t('menu.complex-query.time.type.placeholder')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('menu.complex-query.time.reservation')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="appointmentState"
                    :placeholder="
                      $t('menu.complex-query.time.reservation.placeholder')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('menu.complex-query.time.dewellType')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="dewellType"
                    :placeholder="
                      $t('menu.complex-query.time.dewellType.placeholder')
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
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column :title="$t('menu.result.number')" data-index="id" />
          <a-table-column
            :title="$t('menu.result.clientName')"
            data-index="realName"
          />
          <a-table-column
            :title="$t('menu.result.phone')"
            data-index="phoneNum"
          >
          </a-table-column>
          <a-table-column
            :title="$t('menu.result.address')"
            data-index="address"
          >
          </a-table-column>
          <a-table-column title="创建时间" data-index="createTime" />
          <a-table-column :title="$t('menu.result.type')" data-index="type">
            <template #cell="{ record }">
              {{
                record.type === 1
                  ? '测量设计'
                  : record.type === 2
                  ? '配送服务'
                  : '安装服务'
              }}
            </template>
          </a-table-column>
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
              <!-- <a-button type="text" size="small" @click="visible = true">
                核验
              </a-button> -->
              <a-button type="text" size="small" @click="visible = true">
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
import { getAllList } from '@/api/appointment';

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
        label: t('searchTable.form.contentType.verticalVideo'),
        value: 'verticalVideo',
      },
    ]);
    const filterTypeOptions: any = ref(['测量设计', '安装服务', '配送服务']);
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
      isNewOrder.value = false;
    };
    const handleCancel = () => {
      isNewOrder.value = false;
    };
    const handleOpenNewOrder = () => {
      isNewOrder.value = true;
    };
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
    const appointmentType = ref([]);
    const appointmentState = ref([
      '待处理',
      '待指派',
      '待指派',
      '进行中',
      '已完成',
    ]);
    const dewellType = ref([
      {
        value: 'duoceng',
        label: '多层',
      },
      {
        value: 'gaoceng',
        label: '高层',
      },
      {
        value: 'bieshu',
        label: '别墅',
      },
      // 标准商办物业
      {
        value: 'biaozhun',
        label: '标准商办物业',
      },
      {
        value: 'shangpu',
        label: '临街商铺',
      },
      {
        value: 'danwei',
        label: '特殊单位',
      },
    ]);
    const visible = ref(false);
    const allList = async () => {
      const res = await getAllList({ pageNum: 1, pageSize: 10 });
      renderData.value = res.data.records;
    };
    allList();
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
      isNewOrder,
      handleOk,
      handleCancel,
      handleOpenNewOrder,
      productType,
      appointmentType,
      appointmentState,
      dewellType,
      visible,
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
