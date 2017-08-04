import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {initNewGame, pageChange} from '../../action_creators';

import {
  Page,
  Navbar,
  Card,
  CardHeader,
  CardContent,
  ContentBlockTitle,
  List,
  ListItem,
  ContentBlock,
  FormLabel,
  FormInput,
  Button,
  GridCol,
  GridRow
} from 'framework7-react';

class Main extends Component {
  renderGames() {
    return this.props.games.map((game) => (
      <ListItem key={game.id} link="/scorecard/" title={game.id} />
    ));
  }

  render() {
    return (
      <Page>
        <Navbar title="Wolf"/>
        <ContentBlockTitle>Welcome to Wolf</ContentBlockTitle>
        <ContentBlock inner>
          <Button onClick={this.props.onNewGame}>Create New Game</Button>
        </ContentBlock>
        <ContentBlockTitle>View Existing Games</ContentBlockTitle>
        <List>
          {this.renderGames()}
        </List>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: Object.keys(state.games).sort((a, b) => {
      if (a.id === b.id) {
        return 0;
      }

      return a.id < b.id ? -1 : 1;
    }).map((key) => state.games[key])
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onNewGame: initNewGame
  }, dispatch);
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);



