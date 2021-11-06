<template>
  <Box
    :size="0.8"
    :scale="{ x: 1.1, y: 1, z: 1.1 }"
    :position="{ x: -2.05, y: 0.4 }"
    cast-shadow
    receive-shadow
  >
    <PhongMaterial>
      <Texture :src="ColorMap" />
    </PhongMaterial>
  </Box>
</template>

<script>
import ColorMap from '@/assets/imgs/marble.png';

export default {
  name: 'MarbleStandModel',
  data() {
    return {
      ColorMap,
    };
  },
};
</script>
