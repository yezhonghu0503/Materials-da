<template>
  <a-card
    class="general-card"
    :title="$t('workplace.quick.operation')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '24px 20px 0 20px' }"
  >
    <template #extra>
      <!-- <a-link>{{ $t('workplace.quickOperation.setup') }}</a-link> -->
    </template>
    <a-row :gutter="8">
      <a-col
        v-for="link in links"
        :key="link as unknown as string"
        :span="8"
        class="wrapper"
        @click="openMenu(link)"
      >
        <div class="icon">
          <component :is="link.icon" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t(link.text) }}
        </a-typography-paragraph>
      </a-col>
    </a-row>
    <a-divider class="split-line" style="margin: 0" />
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

const links = [
  {
    name: 'searchTable',
    text: 'workplace.contentManagement',
    icon: 'icon-file',
  },
  {
    name: 'success',
    text: 'workplace.contentStatistical',
    icon: 'icon-storage',
  },
  { name: 'measure', text: 'workplace.advanced', icon: 'icon-settings' },
  {
    name: 'LogisticsOrder',
    text: 'workplace.onlinePromotion',
    icon: 'icon-mobile',
  },
  {
    name: 'SurveyoOrder',
    text: '测量设计',
    icon: 'icon-mobile',
  },
  {
    name: 'LogisticsOrder',
    text: 'workplace.onlinePromotion',
    icon: 'icon-mobile',
  },
];

export default defineComponent({
  setup() {
    const router = useRouter();
    const openMenu = (value: any) => {
      router.push({ name: value.name });
    };
    return {
      links,
      openMenu,
    };
  },
});
</script>

<style scoped lang="less"></style>
