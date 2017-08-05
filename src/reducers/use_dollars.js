export default function(state=false, action) {
  switch (action.type) {
    case 'CHANGE_DOLLARS':
      return action.payload;
    default:
      return state;
  }
};
