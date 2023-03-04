<template>
  <div class="container">
    <Breadcrumb :items="['menu.result', 'menu.anomalous-reminder.title']" />
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
            :style="{ marginRight: '8px', backgroundColor: '#165DFF' }"
            :size="28"
          >
            A
          </a-avatar>
          <a-typography-text>Username</a-typography-text>
        </span>
        <a-link>More</a-link>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped></style>
