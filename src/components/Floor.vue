<template>
  <Plane
    :width="10"
    :height="10"
    :position="{ x: 0, y: 0, z: 0 }"
    :rotation="{ x: -Math.PI / 2, y: 0, z: 0 }"
    receive-shadow
  >
    <PhongMaterial color="#ffffff">
      <Texture :src="ColorMap" />
    </PhongMaterial>
  </Plane>
</template>

<script>
import ColorMap from '@/assets/imgs/checker.png';

export default {
  name: 'FloorModel',
  data() {
    return {
      ColorMap,
    };
  },
};
</script>
