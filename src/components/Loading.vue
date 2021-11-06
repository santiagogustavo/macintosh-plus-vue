<template>
  <div :class="className" />
</template>

<script>
import classNames from 'classnames';

export default {
  name: 'LoadingModal',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className() {
      return classNames('loading', {
        'loading--visible': this.isLoading,
        'loading--hidden': !this.isLoading,
      });
    },
  },
};
</script>

<style lang="scss">
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ff8fa7;
  transition: opacity 250ms ease;

  &--visible {
    opacity: 1;
  }

  &--hidden {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
