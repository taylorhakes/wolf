export default function(state='main', action) {
  switch (action.type) {
    case 'PAGE_CHANGE':
      return action.payload;
    case 'INIT_NEW_GAME':
      return 'game';
    case 'NEW_GAME':
      return 'scorecard';
    case 'SELECT_GAME':
      return 'scorecard';
    default:
      return state;
  }
};
