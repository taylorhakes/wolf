export default function(state={}, action) {
  let game;
  switch (action.type) {
    case 'NEW_GAME':
      game = {...action.payload, partners: []};
      game.players =  game.playerNames.map((name, index) => ({
        name,
        order: index,
        scores: []
      }));
      return {
        ...state,
        [game.id]: game
      };
    case 'UPDATE_GAME':
      return {
        ...state,
        [action.payload.id]: {...state[action.payload.id], ...action.payload.id}
      };
    case 'UPDATE_HOLE':
      game = {...state[action.payload.id]};
      game.players = game.players.map((player, index) => {
        if (action.payload.order === index) {
          const scores = player.scores.slice();
          scores[action.payload.hole] = action.payload.score;
          return {...player, scores};
        }


       return player;
      });

      return {...state, [game.id]: game};

    case 'UPDATE_PARTNERS':
      game = {...state[action.payload.id]};
      game.partners = game.partners.slice();
      const partner = +action.payload.selectedPartner;
      if (partner === -1) {
        game.partners[action.payload.hole] = [action.payload.wolf];
      } else if (partner == -2) {
        game.partners[action.payload.hole] = [];
      } else {
        if (action.payload.pig) {
          game.partners[action.payload.hole] = [partner];
        } else {
          game.partners[action.payload.hole] = [action.payload.wolf, partner];
        }
      }
      game.partners[action.payload.hole].selectedPartner = action.payload.selectedPartner;
      game.partners[action.payload.hole].pig = action.payload.pig;

      return {...state, [game.id]: game};
    default:
      return state;
  }
};