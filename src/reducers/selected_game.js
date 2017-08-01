export default function(state={}, action) {
  switch (action.type) {
    case 'SELECT_GAME':
      return action.payload;
    default:
      return state;
  }
};