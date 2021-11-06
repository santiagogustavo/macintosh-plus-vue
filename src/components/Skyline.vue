<template>
  <Plane
    :width="2.5"
    :height="1.5"
    :position="{ x: 0, y: 0.75, z: -1 }"
  >
    <BasicMaterial color="#cccccc" :props="{ side: 2 }">
      <Texture :src="ColorMap" />
    </BasicMaterial>
  </Plane>
</template>

<script>
import ColorMap from '@/assets/imgs/skyline.png';

export default {
  name: 'SkylineModel',
  data() {
    return {
      ColorMap,
    };
  },
};
</script>
