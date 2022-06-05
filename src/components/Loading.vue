<template>
  <div :class="className">
    <div class="loading__text">
      ＬＯＡＤＩＮＧ
    </div>
  </div>
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

  display: flex;
  align-items: center;
  justify-content: center;

  &--visible {
    opacity: 1;
  }

  &--hidden {
    opacity: 0;
    pointer-events: none;
  }

  &__text {
    font-family: sans-serif;
    font-weight: bold;
    font-size: 32px;
    color: #63ffac;
    text-shadow: 2px 2px black;
    padding: 16px 32px;
    background: white;
    border-radius: 8px;
    border: 2px solid gray;
  }
}
</style>
