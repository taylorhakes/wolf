import React, {Component} from 'react';
import {Page, Navbar, NavRight, Card, CardHeader, CardContent, ContentBlockTitle, FormSwitch, List, ListItem, FormLabel, FormInput, Button, GridCol, GridRow, ContentBlock, ButtonsSegmented} from 'framework7-react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {playerInfo} from '../../utils';
import {updateHole, nextHole, updatePartners} from '../../action_creators';
import Select from '../select';
import Switch from '../switch';

class Scorecard extends Component {
  constructor(props) {
    super(props);

    this.handlePigChange = (event) => {
      const scoreInfo = playerInfo(this.props.game, this.props.selectedHole);
      this.props.onPartnersChange({
        id: this.props.game.id,
        hole: this.props.selectedHole,
        wolf: scoreInfo[0].player.order,
        selectedPartner: (this.props.game.partners[this.props.selectedHole] ?
          this.props.game.partners[this.props.selectedHole].selectedPartner : -2),
        pig: event.target.checked
      });
    };
   this.handlePartnerChange = (event) => {
      const scoreInfo = playerInfo(this.props.game, this.props.selectedHole);
      this.props.onPartnersChange({
        id: this.props.game.id,
        hole: this.props.selectedHole,
        wolf: scoreInfo[0].player.order,
        selectedPartner: event.target.value,
        pig: !!(this.props.game.partners[this.props.selectedHole] && this.props.game.partners[this.props.selectedHole].pig)
      });
    };
  }
  renderScoreCard() {
    const headers = [];

    for (let i = 0; i < 9; i++) {
      headers.push(
        <th key={i}>{i + 1}</th>
      )
    }
    headers.push(
      <th key="in">IN</th>
    );
    for (let i = 9; i < 18; i++) {
      headers.push(
        <th key={i}>{i + 1}</th>
      )
    }

    const playerRows = this.props.game.players.map((player, index) => {
      const scores = [];
      let total = 0;
      for (let i = 0; i < 9; i++) {
        scores.push(
          <td key={i}>{player.scores[i]}</td>
        );
        total += player.scores[i]
      }

      scores.push(
        <td key="in">{total}</td>
      );

      for (let i = 9; i < 18; i++) {
        scores.push(
          <td key={i}>{player.scores[i]}</td>
        );
        total += player.scores[i];
      }
      scores.push(
        <td key="total">{total}</td>
      );


      return (
        <tr key={player.order}>
          <th key="name">{player.name}</th>
          {scores}
        </tr>
      )
    });



    return (
      <table>
        <thead>
        <tr>
          <th key="empty"></th>
          {headers}
          <th key="total">TOT</th>
        </tr>
        </thead>
        <tbody>
          {playerRows}
        </tbody>
      </table>
    )
  }
  renderScoreInputs() {
    const scoreInfo = playerInfo(this.props.game, this.props.selectedHole);
    const items = scoreInfo.map((info, index) => {
      return (
        <ListItem key={info.player.order}>
          <FormLabel><span>{info.player.name}: {info.score}{index == 0 ? ' (Wolf)': ''}</span></FormLabel>
          <Select
                     value={info.player.scores[this.props.selectedHole] || '-1'}
                     onChange={(event) => this.props.onHoleChange({
                       id: this.props.game.id,
                       hole: this.props.selectedHole,
                       score: +event.target.value,
                       order: info.player.order
                   })}>
            <option value="-1">Select a score</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="8">9</option>
            <option value="8">10</option>
          </Select>
        </ListItem>
      )
    });

    return (
      <List>
        {items}
      </List>
    )
  }

  renderPartners() {
    const scoreInfo = playerInfo(this.props.game, this.props.selectedHole);
    return scoreInfo.slice(1).map((scoreInfo) => (
      <option key={scoreInfo.player.order} value={scoreInfo.player.order}>{scoreInfo.player.name}</option>
    ));
  }

  render() {
    return (
      <Page>
        <Navbar backLink="Back" title="Scorecard" sliding>
          <NavRight>
            <FormSwitch/>
          </NavRight>
        </Navbar>
        <div className="data-table">
          {this.renderScoreCard()}
        </div>
        <ContentBlockTitle>Tee Off Order: 1 Point</ContentBlockTitle>
        {this.renderScoreInputs()}
        <List>
          <ListItem>
            <FormLabel>Partner</FormLabel>
            <Select value={this.props.game.partners[this.props.selectedHole] ? this.props.game.partners[this.props.selectedHole].selectedPartner : -2}
                    onChange={this.handlePartnerChange}>
              <option value="-2" key="-2">Select Partner</option>
              {this.renderPartners()}
              <option value="-1" key="-1">Lone Wolf</option>
            </Select>
          </ListItem>
          <ListItem>
            <FormLabel>Pig</FormLabel>
            <Switch
              onChange={this.handlePigChange}
              checked={this.props.game.partners[this.props.selectedHole] ? this.props.game.partners[this.props.selectedHole].pig : false}/>
          </ListItem>
        </List>
        <GridRow>
          <GridCol><Button big fill onClick={this.props.onNextHole}>Next Hole</Button></GridCol>
        </GridRow>
      </Page>
    );
  }
};


const mapStateToProps = (state) => {
  return {
    game: state.games[state.selectedGame],
    selectedHole: state.selectedHole
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onHoleChange: updateHole,
    onNextHole: nextHole,
    onPartnersChange: updatePartners
  }, dispatch);
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scorecard)
