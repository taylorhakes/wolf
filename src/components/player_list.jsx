import React, {Component} from 'react';
import {
  List,
  ListItem,
  FormLabel,
  FormInput,
  Button,
  GridCol,
  GridRow
} from 'framework7-react';

export default class PlayerList extends Component {
  constructor(props) {
    super(props);

    this.renderPlayers = () => {
      return this.props.players.map((player, index) => (
        <ListItem key={`${player}-${index}`}>
          <FormLabel>Player 1</FormLabel>
          <FormInput type="text" placeholder="Name" value={player}/>
        </ListItem>
      ));
    };

    this.renderPlus = () => {
      if (this.props.players.length == 5) {
        return null;
      }

      return (
        <GridCol><Button big fill color="green" onClick={this.props.onRemove}>+</Button></GridCol>
      );
    };

    this.renderMinus = () => {
      if (this.props.players.length == 3) {
        return null;
      }

      return (
        <GridCol><Button big fill color="red" onClick={this.props.onRemove}>-</Button></GridCol>
      );
    };
  }

  render() {
    return (
      <div>
        <List form>
          {this.renderPlayers()}
        </List>
        <GridRow>
          {this.renderPlus()}
          {this.renderMinus()}
        </GridRow>
      </div>
    );
  }
}



