import { combineReducers } from 'redux';
import games from './games';
import selectedGame from './selected_game';
import selectedHole from './selected_hole';

const reducer = combineReducers({
  games,
  selectedGame,
  selectedHole
});

export default reducer;