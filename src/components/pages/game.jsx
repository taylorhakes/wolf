import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import {newGame, updateTempGame} from '../../action_creators';
import PlayerList from '../player_list';
import {
  Page,
  Navbar,
  Card,
  CardHeader,
  CardContent,
  ContentBlockTitle,
  List,
  ListItem,
  FormLabel,
  FormInput,
  Button,
  GridCol,
  GridRow
} from 'framework7-react';
import Switch from '../switch';
import { lossEstimate } from '../../utils';

const pStyle = {margin: '1em'};

class GameSettings extends Component {
  constructor(props) {
    super(props);

    this.handleSettingChange = (field, value) => {
      this.props.onGameChange({
        [field]: value
      });
    };
    this.handleCreateGame = () => {
      this.props.newGame(this.props.settings);
    };

    this.handlePlayerRemove = () => {
      const lastIndex = this.props.settings.playerNames.length - 1;
      this.props.onGameChange({
        playerNames: this.props.settings.playerNames.filter((val, index) => index !== lastIndex)
      });
    };

    this.handlePlayerAdd = () => {
      const newArr = this.props.settings.playerNames.slice();
      newArr.push('');
      this.props.onGameChange({
        playerNames: newArr
      });
    };

    this.handlePlayerChange = (changeIndex, value) => {
      this.props.onGameChange({
        playerNames: this.props.settings.playerNames.map((val, index) => {
          if (index === changeIndex) {
            return value;
          }

          return val;
        })
      });
    };

    this.renderCarryOvers = () => {
      const { settings } = this.props;

      const items = [
        (
          <ListItem key="carryOvers">
            <FormLabel>Carry Overs</FormLabel>
            <Switch checked={settings.carryOvers} value={settings.carryOvers}
                        onChange={(event) => this.handleSettingChange('carryOvers', event.target.checked)}/>
          </ListItem>
        )
      ];

      if (settings.carryOvers) {
        items.push(
          (<ListItem key="pointsPerHole">
            <FormLabel>Points per hole</FormLabel>
            <FormInput type="text" value={settings.pointsPerHole}
                       onChange={(event) => this.handleSettingChange('pointsPerHole', event.target.value)}/>
          </ListItem>),
          (<ListItem key="staysUpOnCarryOver">
            <FormLabel>Stays up on carry over</FormLabel>
            <Switch checked={settings.staysUpOnCarryOver}
                        onChange={(event) => this.handleSettingChange('staysUpOnCarryOver', event.target.checked)}/>
          </ListItem>)
        );
      }

      return items;
    };
  }

  render() {
    const {settings} = this.props;
    const estimated = lossEstimate(settings);

    return (
      <Page>
        <Navbar backLink="Back" title="Forms" sliding/>
        <ContentBlockTitle>Player Names</ContentBlockTitle>
        <PlayerList
          players={settings.playerNames}
          onChange={this.handlePlayerChange}
          onRemove={this.handlePlayerRemove}
          onAdd={this.handlePlayerAdd}/>

        <ContentBlockTitle>Game Rules</ContentBlockTitle>
        <List form>
          <ListItem key="startingPoints">
            <FormLabel>Starting points</FormLabel>
            <FormInput type="text" value={settings.startingPoints}
                       onChange={(event) => this.handleSettingChange('startingPoints', event.target.value)}/>
          </ListItem>
          <ListItem key="dollarsPerPoint">
            <FormLabel>Dollars per point</FormLabel>
            <FormInput type="text" value={settings.dollarsPerPoint}
                       onChange={(event) => this.handleSettingChange('dollarsPerPoint', event.target.value)}/>
          </ListItem>
          <ListItem key="doublesOnWolf">
            <FormLabel>Doubles on wolf/pig</FormLabel>
            <Switch checked={settings.doublesOnWolf}
                        onChange={(event) => this.handleSettingChange('doublesOnWolf', event.target.checked)}/>
          </ListItem>
          {this.renderCarryOvers()}
        </List>
        <Card>
          <CardHeader>Estimated Bad Loss</CardHeader>
          <CardContent><span>${estimated}</span></CardContent>
        </Card>
        <GridRow style={pStyle}>
          <GridCol><Button big fill color="green" onClick={this.handleCreateGame}>Create Game</Button></GridCol>
        </GridRow>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.tempSettings
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onSaveGame: newGame,
    onGameChange: updateTempGame
  }, dispatch);
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSettings)
