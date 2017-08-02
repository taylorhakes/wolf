import React, {PropTypes, Component} from 'react';

import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle, 
	List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
	LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput
} from 'framework7-react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'

import {routes} from '../routes';
import {initNewGame} from '../action_creators';



class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			games: [],
			editingGame: null,
			currentGame: null
		}
	}

	render() {
    return (
			<Views>
				<View id="main-view" navbarThrough dynamicNavbar={true} main url="/">
          {/* Navbar */}
          {this.context.framework7AppContext.theme.ios ? (
						<Navbar>
							<NavCenter sliding>Wolf</NavCenter>
						</Navbar>
          ) : null}
          {/* Pages */}
					<Pages>
						<Page>
							<ContentBlockTitle>Welcome to Wolf</ContentBlockTitle>
							<ContentBlock inner>
								<a href="/form/" onClick={this.props.onNewGame}>Create New Game</a>
							</ContentBlock>
							<ContentBlockTitle>View Existing Games</ContentBlockTitle>
							<List>
								<ListItem link="/about/" title="About"></ListItem>
								<ListItem link="/form/" title="Form"></ListItem>
								<ListItem link="/hole/" title="Hole"></ListItem>
								<ListItem link="/scorecard/" title="Scorecard"></ListItem>
							</List>
						</Page>
					</Pages>
				</View>
			</Views>
    );
	}
}
Main.contextTypes = {
	framework7AppContext: PropTypes.object
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onNewGame: initNewGame
  }, dispatch);
};


const MainConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export const App = () => (	
	//Change themeType to "material" to use the Material theme
	<Framework7App themeType="ios" routes={routes}>		
		<Statusbar />
		<MainConnect />
	</Framework7App>  
);
