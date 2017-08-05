import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import {newGame, updateTempGame, pageChange} from '../../action_creators';
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
  GridRow,
  NavLeft,
  NavCenter
} from 'framework7-react';
import Switch from '../switch';
import { lossEstimate } from '../../utils';

const pStyle = {margin: '1em'};

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class GameSettings extends Component {
  constructor(props) {
    super(props);

    this.handleSettingChange = (field, value) => {
      this.props.onGameChange({
        [field]: value
      });
    };
    this.handleCreateGame = () => {
      this.props.onSaveGame({...this.props.settings, id: Date.now()});
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

    this.handleRandom = () => {
      const newArr = shuffle(this.props.settings.playerNames.slice());
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
            <FormLabel>Carry overs</FormLabel>
            <Switch checked={settings.carryOvers}
                        onChange={(checked) => this.handleSettingChange('carryOvers', checked)}/>
          </ListItem>
        )
      ];

      if (settings.carryOvers) {
        items.push(
          (<ListItem key="pointsPerHole">
            <FormLabel>&nbsp;&nbsp;Points per hole</FormLabel>
            <FormInput type="number" pattern="[0-9]*" value={settings.pointsPerHole}
                       onChange={(event) => this.handleSettingChange('pointsPerHole', event.target.value)}/>
          </ListItem>),
          (<ListItem key="staysUpOnCarryOver">
            <FormLabel>&nbsp;&nbsp;Reset after win</FormLabel>
            <Switch checked={!settings.staysUpOnCarryOver}
                        onChange={(checked) => this.handleSettingChange('staysUpOnCarryOver', !checked)}/>
          </ListItem>)
        );
      }

      return items;
    };

    this.handleBack = () => this.props.pageChange('main')
  }

  render() {
    const {settings} = this.props;
    const estimated = lossEstimate(settings);

    return (
      <Page hideBarsOnScroll>
        <Navbar>
          <NavLeft>
            <a className="back link" href="#" onClick={this.handleBack}>
              <i className="icon-back icon" /><span>Back</span>
            </a>
          </NavLeft>
          <NavCenter>
            Game Settings
          </NavCenter>
        </Navbar>
        <PlayerList
          players={settings.playerNames}
          onChange={this.handlePlayerChange}
          onRemove={this.handlePlayerRemove}
          onAdd={this.handlePlayerAdd}
          onRandom={this.handleRandom}
        />

        <ContentBlockTitle>Game Rules</ContentBlockTitle>
        <List form>
          <ListItem key="startingPoints">
            <FormLabel>Starting points</FormLabel>
            <FormInput type="number" pattern="[0-9]*" value={settings.startingPoints}
                       onChange={(event) => this.handleSettingChange('startingPoints', event.target.value)}/>
          </ListItem>
          <ListItem key="dollarsPerPoint">
            <FormLabel>Dollars per point</FormLabel>
            <FormInput type="number" pattern="[0-9]\." value={settings.dollarsPerPoint}
                       onChange={(event) => this.handleSettingChange('dollarsPerPoint', event.target.value)}/>
          </ListItem>
          <ListItem key="doublesOnWolf">
            <FormLabel>Doubles on wolf/pig</FormLabel>
            <Switch checked={settings.doublesOnWolf}
                        onChange={(checked) => this.handleSettingChange('doublesOnWolf', checked)}/>
          </ListItem>
          {this.renderCarryOvers()}
        </List>
        <ContentBlockTitle>Estimate Bad Loss</ContentBlockTitle>
        <Card>
          <CardContent><span>${estimated}</span></CardContent>
        </Card>
        <GridRow style={pStyle}>
          <GridCol><Button big fill onClick={this.handleCreateGame}>Create Game</Button></GridCol>
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
    onGameChange: updateTempGame,
    pageChange
  }, dispatch);
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSettings)
