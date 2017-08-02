export default ({
  userNames,
  startingPoints,
  dollarsPerPoint,
  carryOvers,
  pointsPerHole,
  doublesOnWolf,
  staysUpOnCarryOver
}) => ({
    type: 'NEW_GAME',
    payload: {
      users: [
        {
          name: '',
          scores: []
        }
      ],
      startingPoints,
      dollarsPerPoint,
      carryOvers,
      pointsPerHole,
      doublesOnWolf,
      staysUpOnCarryOver
    }
});
