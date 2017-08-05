import React, {Component} from 'react';
import {Page, Navbar, NavRight, Link, NavLeft, Card, CardHeader, CardContent, ContentBlockTitle, FormSwitch, List, ListItem, FormLabel, FormInput, Button, GridCol, GridRow, ContentBlock, ButtonsSegmented} from 'framework7-react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {playerInfo} from '../../utils';
import {updateHole, nextHole, updatePartners, selectHole, pageChange} from '../../action_creators';
import Select from '../select';
import Switch from '../switch';

class Scorecard extends Component {
  constructor(props) {
    super(props);

    this.handlePigChange = (event) => {

      this.props.onPartnersChange({
        id: this.props.game.id,
        hole: this.props.selectedHole,
        wolf: this.props.scoreInfo[0].player.order,
        selectedPartner: (this.props.game.partners[this.props.selectedHole] ?
          this.props.game.partners[this.props.selectedHole].selectedPartner : -2),
        pig: event.target.checked
      });
    };
   this.handlePartnerChange = (event) => {
      this.props.onPartnersChange({
        id: this.props.game.id,
        hole: this.props.selectedHole,
        wolf: this.props.scoreInfo[0].player.order,
        selectedPartner: event.target.value,
        pig: !!(this.props.game.partners[this.props.selectedHole] && this.props.game.partners[this.props.selectedHole].pig)
      });
    };

   this.handleHoldChange = (event) => {
      this.props.onSelectHole(+event.target.dataset.index)
   };

   this.handleBack = () => this.props.pageChange('main')
  }
  renderScoreCard() {
    const headers = [];

    for (let i = 0; i < 9; i++) {
      const selected = this.props.selectedHole === i;
      headers.push(
        <th key={i} data-index={i} onClick={this.handleHoldChange} style={{backgroundColor: selected ? '#f7f7f8' : ''}}>{i + 1}</th>
      )
    }
    headers.push(
      <th key="in">IN</th>
    );
    for (let i = 9; i < 18; i++) {
      const selected = this.props.selectedHole === i;
      headers.push(
        <th key={i} data-index={i} onClick={this.handleHoldChange} style={{backgroundColor: selected ? '#f7f7f8' : ''}}>{i + 1}</th>
      );
    }

    const scoreInfoByOriginalOrder = this.props.scoreInfo.reduce((prev, info) => {
      prev[info.player.order] = info;
      return prev;
    }, {});
    const playerRows = this.props.game.players.map((player, index) => {
      const scores = [];
      let total = 0;
      let pointsTotal = 0;
      for (let i = 0; i < 9; i++) {
        const inPartners = this.props.game.partners[i] && this.props.game.partners[i].indexOf(index) >= 0;
        let color = 'inherit';

        const selected = this.props.selectedHole === i;
        let backgroundColor = 'inherit';
        if (inPartners === true) {
          backgroundColor = '#AAAAAA';
          color = '#fff';
        } else if (selected) {
          backgroundColor ='#f7f7f8';
        }

        const holePoints = scoreInfoByOriginalOrder[index].scoresByHole[i];
        scores.push(
          <td key={i} data-index={i}  onClick={this.handleHoldChange} style={{color, backgroundColor}}>{player.scores[i]} {holePoints ? `(${holePoints})` : ''}</td>
        );
        pointsTotal += holePoints || 0;
        total += player.scores[i] || 0;
      }

      scores.push(
        <td key="in">{total} ({pointsTotal})</td>
      );

      for (let i = 9; i < 18; i++) {
        const inPartners = this.props.game.partners[i] && this.props.game.partners[i].indexOf(index) >= 0;
        let color = 'inherit';

        const selected = this.props.selectedHole === i;
        let backgroundColor = 'inherit';
        if (inPartners === true) {
          backgroundColor = '#AAAAAA';
          color = '#fff';
        } else if (selected) {
          backgroundColor ='#f7f7f8';
        }

        const holePoints = scoreInfoByOriginalOrder[index].scoresByHole[i];
        scores.push(
          <td key={i}  data-index={i}  onClick={this.handleHoldChange} style={{color, backgroundColor}}>{player.scores[i]} {holePoints ? `(${holePoints})` : ''}</td>
        );
        pointsTotal += holePoints || 0;
        total += player.scores[i] || 0;
      }
      scores.push(
        <td key="total">{total} ({pointsTotal})</td>
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
          <th key="empty" />
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
    const items = this.props.scoreInfo.map((info, index) => {
      return (
        <ListItem key={info.player.order}>
          <FormLabel><span>{info.player.name}: {info.score}{index == 0 ? ' (Wolf)': ''}</span></FormLabel>
          <FormInput type="number" pattern="[0-9]*"
                     value={info.player.scores[this.props.selectedHole] || ''}
                     onChange={(event) => this.props.onHoleChange({
                       id: this.props.game.id,
                       hole: this.props.selectedHole,
                       score: +event.target.value,
                       order: info.player.order
                   })}
                     placeholder="Enter score"
          />
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
    return this.props.scoreInfo.slice(1).map((scoreInfo) => (
      <option key={scoreInfo.player.order} value={scoreInfo.player.order}>{scoreInfo.player.name}</option>
    ));
  }

  render() {
    return (
      <Page>
        <Navbar sliding>
          <NavLeft>
            <Link onClick={this.handleBack()}>Back</Link>
          </NavLeft>
          <NavRight>
            <FormSwitch/>
          </NavRight>
        </Navbar>
        <div className="data-table">
          {this.renderScoreCard()}
        </div>
        <ContentBlockTitle><span>Tee Off Order Hole {this.props.selectedHole + 1}:  Point</span></ContentBlockTitle>
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
  const game = state.games[state.selectedGame];
  return {
    game,
    selectedHole: state.selectedHole,
    scoreInfo: playerInfo(game, state.selectedHole)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onHoleChange: updateHole,
    onSelectHole: selectHole,
    onNextHole: nextHole,
    onPartnersChange: updatePartners,
    pageChange
  }, dispatch);
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scorecard)
