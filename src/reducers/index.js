import { combineReducers } from 'redux';
import games from './games';
import selectedGame from './selected_game';
import selectedHole from './selected_hole';
import tempSettings from './temp_settings';

export default combineReducers({
  games,
  selectedGame,
  selectedHole,
  tempSettings
});