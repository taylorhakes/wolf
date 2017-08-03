function newFilledArray(len, val) {
  const rv = new Array(len);
  while (--len >= 0) {
    if (typeof val === 'function') {
      rv[len] = val(len);
    } else {
      rv[len] = val;
    }

  }
  return rv;
}

export function playerInfo(game, hole) {
  const players = game.players;
  const partners = game.partners;

  let points = game.startingPoints;
  const scores = newFilledArray(players.length, 0);
  const scoresByHole = newFilledArray(players.length, () => []);
  for (let i = 0; i < hole; i++) {
    let lowestScorers = [];
    let bestScore = null;
    for (let j = 0; j < players.length; j++) {
      const holeScore = players[j].scores[i];
      if (holeScore && (!bestScore ||  holeScore <= bestScore)) {
        if (!bestScore || holeScore < bestScore) {
          bestScore = holeScore;
          lowestScorers = [];
        }
        lowestScorers.push(j);
      }
    }

    let allInTeam = null;
    let winner = true;
    for (let j = 0; j < lowestScorers.length; j++) {
      if (!partners[i] || !partners[i].length) {
        winner = false;
        break;
      }

      const inTeam = partners[i].indexOf(lowestScorers[j]) >= 0;

      if (allInTeam === null) {
        allInTeam = inTeam;
      }


      if (inTeam !== allInTeam) {
        winner = false;
        break;
      }
    }

    if (winner && allInTeam !== null) {
      const winners = players.map((player, index) => index).filter((index) => {
        const isWolfPartner = partners[i].indexOf(index) >= 0;
        return allInTeam === isWolfPartner;
      });


      if (winners.length) {
        for (let j = 0; j < winners.length; j++) {
          const holeScore = partners[i].length == 1 && game.doublesOnWolf ? 2 * points: points;
          scoresByHole[winners[j]][i] = holeScore;
          scores[winners[j]] += holeScore;
        }
      }
    }

    if (!winner && game.carryOvers) {
      points += game.pointsPerHole;
    } else if (!game.staysUpOnCarryOver) {
      points = game.startingPoints;
    }
  }


  let scoreList;
  if (hole + players.length <= 18) {
    const firstPlayer = (hole) % players.length;
    scoreList = [];
    for (let j = 0; j < players.length; j++) {
      const pointer = (j + firstPlayer) % players.length;
      scoreList.push({
        player: players[pointer],
        score: scores[pointer],
        scoresByHole: scoresByHole[pointer]
      });
    }
  } else {
    scoreList = players.sort().sort((a,b) => {
      if (a == b) {
        return 0;
      }

      return a < b ? -1 : 1;
    }).map((player, index) => ({
      player,
      score: scores[index],
      scoresByHole: scoresByHole[index]
    }));
  }

  return scoreList;
}



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
