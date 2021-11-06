<template>
  <Renderer
    ref="renderer"
    antialias
    resize="window"
    :orbit-ctrl="{ enableDamping: true }"
    shadow
  >
    <Loading :is-loading="isLoading" />
    <Camera :position="{ y: playerHeight, z: 5 }" :aspect="aspect" :fov="90" />
    <Scene background="#b26474">
      <AmbientLight :position="{ y: 20 }" :intensity="0.2" />
      <PointLight
        :intensity="0.7"
        :position="{ x: 2, y: 10, z: 5 }"
        :shadow-map-size="{ width: 1024, height: 1024 }"
        cast-shadow
      />
      <Alex @load="toggleIsLoading" />
      <Marble />
      <MacPlus />
      <Skyline />
      <Floor />
      <EffectComposer>
        <RenderPass />
        <UnrealBloomPass :strength="0.15" />
      </EffectComposer>
    </Scene>
  </Renderer>
</template>

<script>
import { mapGetters } from 'vuex';

import Alex from '@/components/Alex.vue';
import Floor from '@/components/Floor.vue';
import Loading from '@/components/Loading.vue';
import MacPlus from '@/components/MacPlus.vue';
import Marble from '@/components/MarbleStand.vue';
import Skyline from '@/components/Skyline.vue';

export default {
  components: {
    Alex,
    Floor,
    Loading,
    MacPlus,
    Marble,
    Skyline,
  },
  data() {
    return {
      aspect: window.innerWidth / window.innerHeight,
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters({
      playerHeight: 'Player/getHeight',
    }),
  },
  created() {
    window.addEventListener('resize', this.updateAspectRatio);
  },
  unmounted() {
    window.removeEventListener('resize', this.updateAspectRatio);
  },
  methods: {
    updateAspectRatio() {
      this.aspect = window.innerWidth / window.innerHeight;
    },
    toggleIsLoading() {
      this.isLoading = !this.isLoading;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
canvas {
  display: block;
  width: 100vw;
  height: 100vh;
}
#app {
  display: relative;
}
</style>
