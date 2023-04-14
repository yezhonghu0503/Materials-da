<template>
  <div class="service__list">
    <ServiceMeasuringDesign ref="designRef"></ServiceMeasuringDesign>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import ServiceMeasuringDesign from './service-measuring-design.vue';

export default {
  components: { ServiceMeasuringDesign },
  setup() {
    const position: any = 'top';
    const ordinaryUser = ref(false);
    const userinfo = JSON.parse(localStorage.getItem('userInfo') as any);
    if (userinfo.role.roleName !== '普通用户') {
      ordinaryUser.value = true;
    }
    const designRef = ref();
    const deliveryRef = ref();
    const assembleRef = ref();
    const baseform = reactive({ appointmentTime: '' });
    function onSelect(dateString: any, date: any) {
      console.log('onSelect', dateString, date);
    }

    function onChange(dateString: any, date: any) {
      console.log('onChange: ', dateString, date);
    }

    function onOk(dateString: any, date: any) {
      console.log('onOk: ', dateString, date);
    }
    return {
      position,
      ordinaryUser,
      designRef,
      deliveryRef,
      assembleRef,
      baseform,
      onSelect,
      onChange,
      onOk,
    };
  },
};
</script>

<style lang="less" scoped>
.service__list {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
