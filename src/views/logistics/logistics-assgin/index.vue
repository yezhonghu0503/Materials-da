<template>
  <div>
    <!-- <div>
      <el-autocomplete
        v-model="address"
        :fetch-suggestions="querySearch"
        placeholder="请输入详细地址"
        :trigger-on-focus="false"
      />
      <el-button type="primary" @click="getLocations"> 搜索 </el-button>
    </div> -->
    <div id="amp-container" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, inject } from 'vue';

export default defineComponent({
  setup() {
    //   const $api: any = inject('$api');
    //   const dataMap = reactive({
    //     map: '',
    //     markerLayer: '',
    //     latitude: '', // 纬度
    //     lngitude: '', // 经度
    //   });
    //   const { TMap } = window as any;
    //   onMounted(() => {
    //     // eslint-disable-next-line no-use-before-define
    //     init();
    //     // eslint-disable-next-line no-use-before-define
    //     // getLocation();
    //   });
    //   const init = () => {
    //     const center = new TMap.LatLng(dataMap.latitude, dataMap.lngitude);
    //     dataMap.map = new TMap.Map(document.getElementById('amp-container'), {
    //       center, // 设置地图中心点坐标
    //       zoom: 11, // 设置地图缩放级别
    //       viewMode: '2D',
    //     });
    //     // eslint-disable-next-line no-use-before-define
    //     // (dataMap.map as any).on('click', clickHandler); // 绑定点击地图获取地理位置的事件
    //     // eslint-disable-next-line no-use-before-define
    //     // markerLayer(); // 标记地图
    //   };
    //   // 重载地图
    //   return {
    //     ...toRefs(dataMap),
    //     // address,
    //     // getLocations,
    //     // querySearch,
    //   };
  },
});
</script>
