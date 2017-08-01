export default function(state={}, action) {
  switch (action.type) {
    case 'NEW_GAME':
      return {
        ...state,
        [Date.now()]: action.payload
      };
    case 'UPDATE_GAME':
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case 'UPDATE_HOLE':
      const newHoles = state[action.payload.id].holes.slice();
      newHoles[action.payload.hole] = action.payload.data;
      return {
        ...state,
        [action.payload.id]: {...state[action.payload.id], holes: [...newHoles]}
      };
    default:
      return state;
  }
};