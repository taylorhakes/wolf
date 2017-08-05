import React, {Component} from 'react';
import {
  List,
  ListItem,
  FormLabel,
  FormInput,
  Button,
  GridCol,
  GridRow,
  ContentBlockTitle,
  ContentBlock
} from 'framework7-react';

export default class PlayerList extends Component {
  constructor(props) {
    super(props);

    this.renderPlayers = () => {
      return this.props.players.map((player, index) => (
        <ListItem key={index}>
          <FormLabel><span>Player {index + 1}</span></FormLabel>
          <FormInput type="text" placeholder="Name" value={player} onChange={(event) =>this.props.onChange(index, event.target.value)}/>
        </ListItem>
      ));
    };

    this.renderPlus = () => {
      if (this.props.players.length == 5) {
        return null;
      }

      return (
        <GridCol><Button color="green" onClick={this.props.onAdd}>+</Button></GridCol>
      );
    };

    this.renderMinus = () => {
      if (this.props.players.length == 3) {
        return null;
      }

      return (
        <GridCol><Button  color="red" onClick={this.props.onRemove}>-</Button></GridCol>
      );
    };
  }

  render() {
    return (
      <div>
        <ContentBlockTitle>Player Names</ContentBlockTitle>
        <List form style={{marginBottom: 5}}>
          {this.renderPlayers()}
        </List>
        <ContentBlock style={{marginTop: 0}}>
          <GridRow>
            {this.renderPlus()}
            {this.renderMinus()}
            <GridCol><Button  onClick={this.props.onRandom}>Random</Button></GridCol>
          </GridRow>
        </ContentBlock>
      </div>
    );
  }
}



