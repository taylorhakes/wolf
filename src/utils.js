export function lossEstimate({ staysOnCarryOver, startingPoints, carryOvers, carryOverPoints, dollarsPerPoint }) {
  if (staysOnCarryOver) {
    return ((startingPoints + ((carryOvers ? carryOverPoints : 0) * 9)) * 6) * 2 * dollarsPerPoint;
  } else {
    return (startingPoints + 17) * 2 * dollarsPerPoint;
  }
}
