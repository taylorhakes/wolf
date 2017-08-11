export default ({ id, hole, extraPoints }) => ({
  type: 'UPDATE_EXTRA_POINTS',
  payload: {
    id,
    hole,
    extraPoints
  }
});
