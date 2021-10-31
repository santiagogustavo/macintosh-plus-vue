<template>
  <FbxModel
    :src="Alex"
    :scale="{ x: 0.01, y: 0.01, z: 0.01 }"
    :position="{ x: -2 }"
    :rotation="{ y: Math.PI / 6 }"
    @load="onLoad"
  />
</template>

<script>
import Alex from '@/assets/models/alexander.fbx';

export default {
  name: 'AlexModel',
  data() {
    return {
      Alex,
    };
  },
  methods: {
    onLoad(object) {
      object.traverse(function (child) {
        if (child.isMesh) {
          child.material.transparent = false;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }
};
</script>
