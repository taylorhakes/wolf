import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {initNewGame, pageChange, selectGame, deleteGame} from '../../action_creators';
import moment from 'moment';

import {
  Page,
  Navbar,
  Card,
  CardHeader,
  CardContent,
  ContentBlockTitle,
  List,
  ListItem,
  ListButton,
  ContentBlock,
  FormLabel,
  FormInput,
  Button,
  GridCol,
  GridRow,
  ListItemSwipeoutButton,
  ListItemSwipeoutActions
} from 'framework7-react';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = (id) => {
      if (confirm('Are you sure you would like to delete this game?')) {
        this.props.onDeleteGame(id)
      }
    };
  }

  renderGames() {
    return this.props.games.map((game) => (
      <ListItem swipeout key={game.id} onClick={this.props.onSelectGame.bind(null, game.id)}
                title={moment(+game.date).format("MMM Do, YYYY") +  (game.readOnly ? ' (View only)' : '')}>
        <ListItemSwipeoutActions>
          {/*<ListItemSwipeoutButton close color="blue">Edit</ListItemSwipeoutButton>*/}
          <ListItemSwipeoutButton color="red" onClick={this.handleDelete.bind(null, game.id)}>Delete</ListItemSwipeoutButton>
        </ListItemSwipeoutActions>
      </ListItem>
    ));
  }

  render() {
    return (
      <Page>
        <Navbar title="Wolf"/>
        <ContentBlockTitle>Welcome to Wolf</ContentBlockTitle>
        <ContentBlock inner>
          <Button className="button button-big button-fill" onClick={this.props.onNewGame}>Create New Game</Button>
        </ContentBlock>
        {this.props.games.length ? <ContentBlockTitle>View Existing Games</ContentBlockTitle> : null}
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
    onNewGame: initNewGame,
    onPageChange: pageChange,
    onSelectGame: selectGame,
    onDeleteGame: deleteGame
  }, dispatch);
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);



