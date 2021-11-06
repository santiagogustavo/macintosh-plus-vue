<template>
  <Plane
    :width="2"
    :height="1"
    :position="{ x: 0, y: 2, z: -0.8 }"
  >
    <BasicMaterial color="#cccccc" :props="{ transparent: true, side: 2 }">
      <Texture :src="ColorMap" />
    </BasicMaterial>
  </Plane>
</template>

<script>
import ColorMap from '@/assets/imgs/macplus.png';

export default {
  name: 'MacPlusModel',
  data() {
    return {
      ColorMap,
    };
  },
};
</script>
