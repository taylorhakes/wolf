export default function(state={}, action) {
  switch (action.type) {
    case 'SELECT_GAME':
      return 0;
    case 'SELECT_HOLE':
      return action.payload;
    default:
      return state;
  }
};
