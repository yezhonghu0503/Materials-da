<template>
  <div class="supplier">
    <customerDetails :user-id="userId"></customerDetails>
    <supplierDetails v-if="false"></supplierDetails>
    <!-- <supplierDetails v-if="isSupplier"></supplierDetails> -->
    <ServiceDeliveryserviceOpe
      v-if="isDelivery"
      :user-id="userId"
    ></ServiceDeliveryserviceOpe>
    <ServiceAssembleserviceOpe
      v-if="isAssemble"
      :user-id="userId"
    ></ServiceAssembleserviceOpe>
    <ServiceMeasuringserviceOpe
      v-if="isMeasuring"
      :user-id="userId"
    ></ServiceMeasuringserviceOpe>
  </div>
</template>

<script lang="ts">
import { toRefs, watch, ref } from 'vue';
import customerDetails from './appointmentDetails/customerDetails.vue';
import supplierDetails from './appointmentDetails/supplierDetails.vue';
import ServiceDeliveryserviceOpe from './appointmentDetails/ServiceDeliveryserviceOpe.vue';
import ServiceAssembleserviceOpe from './appointmentDetails/ServiceAssembleserviceOpe.vue';
import ServiceMeasuringserviceOpe from './appointmentDetails/ServiceMeasuringserviceOpe.vue';

export default {
  components: {
    customerDetails,
    supplierDetails,
    ServiceDeliveryserviceOpe,
    ServiceAssembleserviceOpe,
    ServiceMeasuringserviceOpe,
  },
  props: { orderType: Number, orderId: String },
  setup(props) {
    const { orderType, orderId } = toRefs(props);
    const userId: any = ref(orderId);
    watch(orderId, async (newVal) => {
      userId.value = newVal;
    });
    const isSupplier = ref(false);
    const isDelivery = ref(false);
    const isAssemble = ref(false);
    const isMeasuring = ref(false);
    watch(orderType, (newVal) => {
      console.log(newVal);
      isSupplier.value = newVal === 2;
      isDelivery.value = newVal === 2;
      isAssemble.value = newVal === 3;
      isMeasuring.value = newVal === 1;
    });
    // console.log(cusMsg);
    return {
      userId,
      isSupplier,
      isDelivery,
      isAssemble,
      isMeasuring,
    };
  },
};
</script>

<style lang="less" scoped>
.supplier {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
