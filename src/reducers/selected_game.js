export default function(state={}, action) {
  switch (action.type) {
    case 'SHARE_GAME':
      return action.payload.newId;
    case 'SELECT_GAME':
      return action.payload;
    case 'NEW_GAME':
      return action.payload.id;
    default:
      return state;
  }
};