export default function(state={}, action) {
  switch (action.type) {
    case 'NEW_GAME':
      return 0;
    case 'SELECT_GAME':
      return 0;
    case 'SELECT_HOLE':
      return action.payload;
    case 'NEXT_HOLE':
      return state === 17 ? 17 : state + 1;
    default:
      return state;
  }
};
