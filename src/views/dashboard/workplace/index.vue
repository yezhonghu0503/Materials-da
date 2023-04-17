<template>
  <div v-if="!isWelcome" class="welcome">
    <img style="width: 520px; height: 500px" src="@/assets/images/home.gif" />
    <!-- <welcome style="width: 520px; height: 500px" /> -->

    <div style="margin-top: 50px">
      <a-typography-title style="color: black">
        装得快供应链整合平台
      </a-typography-title>
      <a-typography-paragraph style="color: black">
        Materials da Chain Integration Platform
      </a-typography-paragraph>
      <a-typography-paragraph style="color: black">
        装得快整合平台全称装得快供应链整合平台，是一个集供应商、仓库管理、家具销售、家具配送、
      </a-typography-paragraph>
      <a-typography-paragraph style="color: black">
        家具安装、测量设计等全方面多方位服务的家具整合平台，平台为普通家装客户提供常用家装服
      </a-typography-paragraph>
      <a-typography-paragraph style="color: black">
        务，为供应商提供快捷订单操作方式，为设计师、安装师傅、配送师傅提供信息化订单模式
      </a-typography-paragraph>
      <a-button style="margin-top: 100px" type="primary" @click="quickStart"
        >快速开始</a-button
      >
    </div>
  </div>
  <div v-if="isWelcome" class="container">
    <div class="left-side">
      <div class="panel">
        <Banner />
        <DataPanel />
        <ContentChart />
      </div>
      <a-row style="margin-top: 16px">
        <a-col :flex="1" class="panel" style="margin-right: 16px">
          <PopularContent />
        </a-col>
        <a-col :flex="1" class="panel">
          <CateforiesPercent />
        </a-col>
      </a-row>
    </div>
    <div class="right-side">
      <div class="panel moduler-wrap">
        <QuickOperation />
        <RecentlyVisited />
      </div>
      <div class="panel" style="margin-top: 16px">
        <Carousel />
      </div>
      <div class="panel" style="margin-top: 16px">
        <Announcement />
      </div>
      <div class="panel" style="margin-top: 16px">
        <Docs />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { roleList } from '@/api/user';
import { useRouter } from 'vue-router';
import Banner from './components/banner.vue';
import DataPanel from './components/data-panel.vue';
import ContentChart from './components/content-chart.vue';
import PopularContent from './components/popular-content.vue';
import CateforiesPercent from './components/categories-percent.vue';
import RecentlyVisited from './components/recently-visited.vue';
import QuickOperation from './components/quick-operation.vue';
import Announcement from './components/announcement.vue';
import Carousel from './components/carousel.vue';
import Docs from './components/docs.vue';
// import welcome from './components/welcome.vue';

export default defineComponent({
  components: {
    Banner,
    DataPanel,
    ContentChart,
    PopularContent,
    CateforiesPercent,
    RecentlyVisited,
    QuickOperation,
    Announcement,
    Carousel,
    Docs,
    // welcome,
  },
  setup() {
    const userinfo = JSON.parse(localStorage.getItem('userInfo') as any);
    const isWelcome = ref(false);
    if (userinfo.role.roleName === '普通用户') {
      isWelcome.value = true;
    }
    const router = useRouter();
    const quickStart = () => {
      router.push({ name: 'success' });
    };
    const role = async () => {
      const res = await roleList();
      console.log(res);
    };
    role();
    return {
      quickStart,
      isWelcome,
    };
  },
});
</script>

<style lang="less" scoped>
.welcome {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 50px 100px;
  background-color: white;
  height: 100%;
}
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  padding-bottom: 0;
  display: flex;
}

.left-side {
  flex: 1;
  overflow: auto;
}

.right-side {
  width: 280px;
  margin-left: 16px;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}
:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}
.moduler-wrap {
  border-radius: 4px;
  background-color: var(--color-bg-2);
  :deep(.text) {
    font-size: 12px;
    text-align: center;
    color: rgb(var(--gray-8));
  }

  :deep(.wrapper) {
    margin-bottom: 8px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      .text {
        margin-bottom: 0;
      }
    }
    &:hover {
      .icon {
        color: rgb(var(--arcoblue-6));
        background-color: #e8f3ff;
      }
      .text {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  :deep(.icon) {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
    color: rgb(var(--dark-gray-1));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    background-color: rgb(var(--gray-1));
    border-radius: 4px;
  }
}
</style>
