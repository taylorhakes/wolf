export default ({ id, order, hole, score }) => ({
  type: 'UPDATE_HOLE',
  payload: {
    id,
    order,
    hole,
    score
  }
});
