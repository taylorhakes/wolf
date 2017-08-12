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

export function playerInfo(game, hole, useDollars) {
  const players = game.players;
  const partners = game.partners;

  let points = game.startingPoints;
  const scores = newFilledArray(players.length, 0);
  const scoresByHole = newFilledArray(players.length, () => []);
  const pointsByHole = [];
  for (let i = 0; i < hole + 1; i++) {
    pointsByHole[i] = points;

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
        const holeScore = ((partners[i].length == 1 && game.doublesOnWolf) ? 2 * points: points) + (game.extraPoints[i] || 0);
        const totalPoints = holeScore * winners.length;
        for (let j = 0; j < winners.length; j++) {
          scoresByHole[winners[j]][i] = holeScore;
        }

        if (useDollars) {
          for (let j = 0; j < players.length; j++) {
            const dollars = ((scoresByHole[j][i] || 0) - (totalPoints / game.players.length)) * game.players.length * game.dollarsPerPoint;
            scoresByHole[j][i] = dollars;
          }
        }
      }
    }

    if (!winner && game.carryOvers) {
      points += game.pointsPerHole;
    } else if (!game.staysUpOnCarryOver) {
      points = game.startingPoints;
    }
  }

  const sum = (arr) => arr.reduce((prev, current) => prev + current, 0);
  for (let j = 0; j < players.length; j++) {
    scores[j] = sum(scoresByHole[j]);
  }

  let scoreList;
  if (4 - (hole % players.length) + hole <= 17) {
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
    scoreList = players.slice()
      .map((player, index) => {
        let total = 0;
        for (let k = 0; k < hole; k++) {
          const holeScore = scoresByHole[index][k];
          if (holeScore) {
            total += holeScore
          }
        }

        return {
          player,
          previousScore: total,
          score: scores[index],
          index
        };
      })
      .sort((a,b) => {
        if (a.previousScore == b.previousScore) {
          return 0;
        }

        return a.previousScore < b.previousScore ? -1 : 1;
      }).map((info, index) => ({
        player: info.player,
        score: info.score,
        scoresByHole: scoresByHole[info.index]
      }));
  }

  return {
    scoreList,
    pointsByHole
  };
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
