export default function(state=null, action) {
  switch (action.type) {
    case 'INIT_NEW_GAME':
      return {
        playerNames: ['', '', ''],
        startingPoints: 1,
        dollarsPerPoint: 1,
        doublesOnWolf: true,
        carryOvers: false,
        pointsPerHole: 0,
        staysUpOnCarryOver: true
      };
    case 'UPDATE_TEMP_GAME':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};