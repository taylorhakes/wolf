import Game from './components/pages/game';
import Scorecard from './components/pages/scorecard';
import Main from './components/pages/main';


export const routes = [{
    path: '/form/',
    component: Game
}, {
  path: '/scorecard/',
  component: Scorecard
}];
