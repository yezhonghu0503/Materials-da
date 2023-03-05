<template>
  <div class="container">
    <Breadcrumb :items="['menu.result', 'menu.anomalous-reminder.title']" />
    <a-divider orientation="left">测量设计部门</a-divider>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap">
      <a-card
        v-for="item in 5"
        :key="item"
        hoverable
        :style="{ width: '360px', marginBottom: '20px', marginRight: '20px' }"
      >
        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }"
        >
          <span
            :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
          >
            <a-avatar
              :style="{ marginRight: '8px', backgroundColor: '#165DFF' }"
              :size="28"
            >
              叶
            </a-avatar>
            <a-typography-text>叶忠湖</a-typography-text>
          </span>
          <a-link>
            <a-popover title="正常">
              <icon-check-circle-fill style="font-size: 25px" />
              <template #content>
                <p>该员工没有收到过投诉</p>
              </template>
            </a-popover>
          </a-link>
        </div>
      </a-card>
    </div>
    <a-divider orientation="left">安装部门</a-divider>
    <a-card hoverable :style="{ width: '360px', marginBottom: '20px' }">
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
      >
        <span
          :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
        >
          <a-avatar
            :style="{ marginRight: '8px', backgroundColor: '#FF9A2E' }"
            :size="28"
          >
            叶
          </a-avatar>
          <a-typography-text>叶忠湖</a-typography-text>
        </span>
        <a-link>
          <a-popover title="异常">
            <icon-exclamation-circle-fill
              style="font-size: 25px; color: #ff9a2e"
            />
            <template #content>
              <p>该员工近期收到过投诉</p>
            </template>
          </a-popover>
        </a-link>
      </div>
    </a-card>
    <a-divider orientation="left">配送部门</a-divider>
    <a-card hoverable :style="{ width: '360px', marginBottom: '20px' }">
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
      >
        <span
          :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
        >
          <a-avatar
            :style="{ marginRight: '8px', backgroundColor: '#F76560' }"
            :size="28"
          >
            叶
          </a-avatar>
          <a-typography-text>叶忠湖</a-typography-text>
        </span>
        <a-link>
          <a-popover title="异常">
            <icon-exclamation-circle-fill
              style="font-size: 25px; color: #f76560"
            />
            <template #content>
              <p>该员工近期多次收到过投诉</p>
            </template>
          </a-popover>
        </a-link>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped></style>
