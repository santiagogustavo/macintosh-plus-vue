<template>
  <Renderer
    ref="renderer"
    antialias
    resize="window"
    :orbit-ctrl="{ enableDamping: true }"
    shadow
  >
    <Camera :position="{ y: 1.8, z: 5 }" :aspect="aspect" :fov="90" />
    <Scene background="#ff8fa7">
      <AmbientLight :position="{ y: 20 }" :intensity="0.4" />
      <PointLight
        :intensity="0.7"
        :position="{ x: 2, y: 10, z: 5 }"
        :shadow-map-size="{ width: 1024, height: 1024 }"
        cast-shadow
      />
      <Alex />
      <Box ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
        <LambertMaterial />
      </Box>
      <Floor />
    </Scene>
  </Renderer>
</template>

<script>
import Alex from '@/components/Alex.vue';
import Floor from '@/components/Floor.vue';

export default {
  components: {
    Alex,
    Floor,
  },
  data() {
    return {
      aspect: window.innerWidth / window.innerHeight,
    };
  },
  mounted() {
    const renderer = this.$refs.renderer;
    const box = this.$refs.box.mesh;
    renderer.onBeforeRender(() => {
      box.rotation.x += 0.01;
    });
  },
};
</script>

<style>
body {
  margin: 0;
}
canvas {
  display: block;
}
</style>
