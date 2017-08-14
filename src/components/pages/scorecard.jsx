import React, {Component} from 'react';
import {Page, Navbar, NavRight, Link, NavLeft, Popup, Card, CardHeader, CardContent, ContentBlockTitle, FormSwitch, List, ListItem, FormLabel, FormInput, Button, GridCol, GridRow, ContentBlock, ButtonsSegmented} from 'framework7-react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {playerInfo} from '../../utils';
import {updateHole, nextHole, updatePartners, selectHole, pageChange, changeDollars,
  updateExtraPoints, shareGame, loadShared } from '../../action_creators';
import Select from '../select';
import Switch from '../switch';

const firebase = window.firebase;

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}


class Scorecard extends Component {
  constructor(props) {
    super(props);

    this.handleShare = () => {
      if (!this.props.game.share && confirm('Do you want to share this game? It will be public to anyone with a link.')) {
        this.props.onShareGame({
          oldId: this.props.game.id,
          newId: uuidv4()
        });
      } else if(this.props.game.share) {
        prompt('Copy the following and text/email to other players.',  `http://wolf.golf?game=${this.props.game.id}`);
      }

    };
    this.handlePigChange = (checked) => {

      this.props.onPartnersChange({
        id: this.props.game.id,
        hole: this.props.selectedHole,
        wolf: this.props.scoreInfo[0].player.order,
        selectedPartner: (this.props.game.partnerDetails[this.props.selectedHole] ?
          +this.props.game.partnerDetails[this.props.selectedHole].selectedPartner : -2),
        pig: checked
      });
    };
   this.handlePartnerChange = (event) => {
      this.props.onPartnersChange({
        id: this.props.game.id,
        hole: this.props.selectedHole,
        wolf: this.props.scoreInfo[0].player.order,
        selectedPartner: +event.target.value,
        pig: !!(this.props.game.partnerDetails[this.props.selectedHole] && this.props.game.partnerDetails[this.props.selectedHole].pig)
      });
    };

   this.handleHoldChange = (event) => {
      this.props.onSelectHole(+event.target.dataset.index)
   };

   this.handleChangeDollars = (checked) => this.props.onChangeDollars(checked);

   this.handleBack = () => this.props.pageChange('main')
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.game.share && this.props.game.share) {
      prompt('Copy the following url and text/email.',  `http://wolf.golf?game=${this.props.game.id}`);
    }
  }
  componentDidMount() {
    if (this.props.game.readOnly) {
      firebase.database().ref(`/games/${this.props.game.id}`).on('value', (snapshot) => {
        this.props.loadShared({...JSON.parse(snapshot.val()), readOnly: true});
      });
    }
  }
  componentWillUnmount() {
    if (this.props.game.readOnly) {
      firebase.database().ref(`/games/${this.props.game.id}`).off();
    }
  }

  getPartnerName() {
    const partnerDetails = this.props.game.partnerDetails[this.props.selectedHole];
    if (partnerDetails) {
      if (partnerDetails.selectedPartner === -1) {
        return 'Lone Wolf';
      }


      return this.props.game.players[partnerDetails.selectedPartner].name + (partnerDetails.pig ? ' (PIG)' : '');
    }

    return 'No partner selected';
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
    let items;
    if (this.props.game.readOnly) {
      items = this.props.scoreInfo.map((info, index) => {
        return (
          <ListItem key={info.player.order}>
            <FormLabel><span>{info.player.name}: {this.props.useDollars ? '$' : ''}{info.score}{index == 0 ? ' (Wolf)': ''}</span></FormLabel>
            <FormLabel><div style={{textAlign: 'right'}}>{info.player.scores[this.props.selectedHole] || 'No score yet'}</div></FormLabel>
          </ListItem>
        )
      });
    } else {
      items = this.props.scoreInfo.map((info, index) => {
        return (
          <ListItem key={info.player.order}>
            <FormLabel><span>{info.player.name}: {this.props.useDollars ? '$' : ''}{info.score}{index == 0 ? ' (Wolf)': ''}</span></FormLabel>
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
    }


    return (
      <List>
        {items}
      </List>
    )
  }

  renderSelectPartners() {
    if (this.props.game.readOnly) {
      return (<FormLabel><div>{this.getPartnerName()}</div></FormLabel>)
    }

    return (
      <Select value={this.props.game.partnerDetails[this.props.selectedHole] ? this.props.game.partnerDetails[this.props.selectedHole].selectedPartner : '-2'}
              onChange={this.handlePartnerChange}>
        <option value="-2" key="-2">Select Partner</option>
        {this.renderPartners()}
        <option value="-1" key="-1">Lone Wolf</option>
      </Select>
    )
  }

  renderPartners() {
    return this.props.scoreInfo.slice(1).map((scoreInfo) => (
      <option key={scoreInfo.player.order} value={scoreInfo.player.order}>{scoreInfo.player.name}</option>
    ));
  }

  renderPig() {
    if (this.props.game.readOnly) {
      return null;
    }

    return (
      <ListItem>
        <FormLabel>Pig</FormLabel>
        <Switch
          onChange={this.handlePigChange}
          checked={this.props.game.partnerDetails[this.props.selectedHole] ? this.props.game.partnerDetails[this.props.selectedHole].pig : false}/>
      </ListItem>
    );
  }

  renderExtraPoints() {
    if (this.props.game.readOnly) {
      return <FormLabel><span>{this.props.game.extraPoints[this.props.selectedHole] || '0'}</span></FormLabel>
    }
    return (
      <FormInput type="number" pattern="[0-9]*" onChange={(event) => this.props.onExtraPointsChange({
        id: this.props.game.id,
        hole: this.props.selectedHole,
        extraPoints: +event.target.value || undefined,
      })}
                 placeholder="0" value={this.props.game.extraPoints[this.props.selectedHole]}
      />
    )
  }

  render() {
    return (
      <Page>
        <Navbar sliding>
          <NavLeft>
            <a className="back link" href="#" onClick={this.handleBack}>
              <i className="icon-back icon" /><span>Back</span>
            </a>
          </NavLeft>
          <NavRight>
            <i className="f7-icons" style={{marginRight: 50}} onClick={this.handleShare}>share</i>
            $&nbsp;<Switch onChange={this.handleChangeDollars} checked={this.props.useDollars} />
          </NavRight>
        </Navbar>
        <div className="data-table">
          {this.renderScoreCard()}
        </div>
        <ContentBlockTitle><span>Hole {this.props.selectedHole + 1} Order: <strong>{this.props.points} Point{this.props.points > 1 ? 's' : ''}</strong></span></ContentBlockTitle>
        {this.renderScoreInputs()}
        <List>
          <ListItem>
            <FormLabel>Wolf Partner</FormLabel>
            {this.renderSelectPartners()}
          </ListItem>
          {this.renderPig()}
          <ListItem >
            <FormLabel><span>Extra points to winning team</span></FormLabel>
            {this.renderExtraPoints()}
          </ListItem>
        </List>
        <ContentBlock inner>
          <Button big fill onClick={this.props.onNextHole}>Next Hole</Button>
        </ContentBlock>
      </Page>
    );
  }
};


const mapStateToProps = (state) => {
  const game = state.games[state.selectedGame];
  const matchInfo = playerInfo(game, state.selectedHole, state.useDollars)
  return {
    game,
    selectedHole: state.selectedHole,
    scoreInfo: matchInfo.scoreList,
    points: matchInfo.pointsByHole[state.selectedHole],
    useDollars: state.useDollars
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onHoleChange: updateHole,
    onSelectHole: selectHole,
    onNextHole: nextHole,
    onPartnersChange: updatePartners,
    onChangeDollars: changeDollars,
    onExtraPointsChange: updateExtraPoints,
    onShareGame: shareGame,
    loadShared,
    pageChange,

  }, dispatch);
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scorecard)
