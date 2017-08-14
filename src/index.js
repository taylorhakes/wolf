import 'framework7/dist/css/framework7.ios.min.css';
import 'framework7/dist/css/framework7.ios.colors.min.css';

const firebase = window.firebase;

/* OR for Material Theme:
import 'framework7/dist/css/framework7.material.min.css'
import 'framework7/dist/css/framework7.material.colors.min.css'
*/

import './css/app.css';

import React from 'react';
import debounce from 'lodash.debounce';
import ReactDOM from 'react-dom';
import App from './components/app';
import reducer from './reducers'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage'
import queryString from 'query-string';
import loadShared from './action_creators/load_shared';
import selectGame from './action_creators/select_game';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  persistState(/*paths, config*/),
);
const store = createStore(reducer, {}, enhancer);
const saveSate = debounce(() => {
  const state = store.getState();
  Object.keys(state.games).forEach((key) => {
    const game = state.games[key];
    if (game.share && !game.readOnly) {
      firebase.database().ref(`games/${game.id}`).set(JSON.stringify(game));
    }
  })
}, 10000);

store.subscribe(saveSate);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

const parsed = queryString.parse(location.search);
if (parsed.game) {
  const newGame = parsed.game;
  firebase.database().ref(`/games/${newGame}`).once('value').then(function(snapshot) {
    const gameJson = snapshot.val();
    history.replaceState(null, null, '/');
    if (gameJson) {
      const game = JSON.parse(gameJson);
      store.dispatch(loadShared({...game, readOnly: true}));
      store.dispatch(selectGame(game.id));
    } else {
      alert('Could not load shared games. Please check the link and try again.')
    }
  });
}



