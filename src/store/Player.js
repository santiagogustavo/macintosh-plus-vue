export default {
  namespaced: true,
  state: () => ({
    height: 1.8,
    speed: {
      walk: 30,
      sprint: 70,
      look: 1,
    },
  }),
  getters: {
    getHeight: (state) => state.height,
  },
};
