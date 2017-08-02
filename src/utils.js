export function lossEstimate({ staysUpOnCarryOver, startingPoints, carryOvers, doublesOnWolf, pointsPerHole,
  dollarsPerPoint, playerNames }) {
  return lossEstimateHoles({
    expectedHolesLost: 5,
    expectedWolfsLost: 1,
    staysUpOnCarryOver, startingPoints, carryOvers, doublesOnWolf, pointsPerHole,
    dollarsPerPoint,
    playerNumber: playerNames.length
  })
}


function lossEstimateHoles({ staysUpOnCarryOver, startingPoints, carryOvers, doublesOnWolf, pointsPerHole, dollarsPerPoint, expectedHolesLost, expectedWolfsLost, playerNumber }) {
  const pointsLossHole = (expectedHolesLost - expectedWolfsLost) * 2  + expectedWolfsLost * (doublesOnWolf ? 2 : 1) * (playerNumber - 1);

  if (carryOvers && staysUpOnCarryOver) {
    return (+startingPoints + ((carryOvers ? +pointsPerHole : 0) * 9)) *  pointsLossHole * dollarsPerPoint;
  } else if (carryOvers) {
    return (+startingPoints + 17) * 3 * + dollarsPerPoint;
  } else {
    return (+startingPoints) * pointsLossHole * +dollarsPerPoint;
  }
}
