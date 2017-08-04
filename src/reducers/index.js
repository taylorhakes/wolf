import { combineReducers } from 'redux';
import games from './games';
import selectedGame from './selected_game';
import selectedHole from './selected_hole';
import tempSettings from './temp_settings';
import page from './page';

export default combineReducers({
  games,
  selectedGame,
  selectedHole,
  tempSettings,
  page
});