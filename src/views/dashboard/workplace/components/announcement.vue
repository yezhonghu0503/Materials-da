<template>
  <a-card
    class="general-card"
    :title="$t('workplace.announcement')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '15px 20px 13px 20px' }"
  >
    <template #extra>
      <a-link>{{ $t('workplace.viewMore') }}</a-link>
    </template>
    <div>
      <div v-for="(item, idx) in list" :key="idx" class="item">
        <a-tag :color="item.type" size="small">{{ item.label }}</a-tag>
        <span class="item-content">
          {{ item.content }}
        </span>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    //
    const list = [
      {
        type: 'orangered',
        label: '活动',
        content: '内容最新优惠活动',
      },
      {
        type: 'cyan',
        label: '消息',
        content: '当前有264件商品正在派单，详情请点击查看。',
      },
      {
        type: 'blue',
        label: '通知',
        content: '当前有26个安装服务需要审核，详情请点击查看。',
      },
      {
        type: 'blue',
        label: '通知',
        content: '当前有18个测量需要审核，详情请点击查看。',
      },
      {
        type: 'cyan',
        label: '消息',
        content: '当前有10个交付订单需要审核，详情请点击查看。',
      },
    ];
    return {
      list,
    };
  },
});
</script>

<style scoped lang="less">
.item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  margin-bottom: 4px;
  .item-content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 4px;
    color: var(--color-text-2);
    text-decoration: none;
    font-size: 13px;
    cursor: pointer;
  }
}
</style>
