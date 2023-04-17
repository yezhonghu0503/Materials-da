<template>
  <div ref="lavContainer" :style="style"></div>
</template>

<script>
import lottie from 'lottie-web';
import { ref } from 'vue';

export default {
  setup() {
    const lavContainer = ref();
    lottie.loadAnimation({
      container: lavContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://blog.al2p.xyz/upload/welcome.json',
      // rendererSettings: this.options.rendererSettings,
    });
  },
};
</script>
