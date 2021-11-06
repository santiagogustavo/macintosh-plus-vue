<template>
  <FbxModel
    :src="Alex"
    :scale="{ x: 0.005, y: 0.005, z: 0.005 }"
    :position="{ x: -2, y: 0.8 }"
    :rotation="{ y: Math.PI / 6 }"
    @load="onLoad"
  />
</template>

<script>
import Alex from '@/assets/models/alexander.fbx';

export default {
  name: 'AlexModel',
  emits: ['load'],
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
      this.$emit('load');
    }
  }
};
</script>
