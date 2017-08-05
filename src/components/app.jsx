import React, {PropTypes, Component} from 'react';

import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle, 
	List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
	LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput
} from 'framework7-react';
import Main from './pages/main';
import Game from './pages/game'
import Scorecard from './pages/scorecard';

import {routes} from '../routes';
import {connect} from 'react-redux';
import ReactCSSTransitionReplace from 'react-addons-css-transition-group';



class App extends Component {
	constructor(props) {
		super(props);
		this.pages = {
			'game': Game,
			'main': Main,
			'scorecard': Scorecard
		}
	}
	renderPage() {
		const Page = this.pages[this.props.page];
		return (<Page key={this.props.page} />);
	}

	render() {
    return (
			<Views>
				<View url="/" id="main-view">
					<Pages>
						<ReactCSSTransitionReplace
							transitionName={this.props.page === 'main' ? 'back': 'forward'}
							transitionEnterTimeout={300}
							transitionLeaveTimeout={300}
						>
              {this.renderPage()}
						</ReactCSSTransitionReplace>

					</Pages>
				</View>
			</Views>
    );
	}
}
App.contextTypes = {
	framework7AppContext: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    page: state.page
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const AppConnnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


export default () => (
	//Change themeType to "material" to use the Material theme
	<Framework7App themeType="ios" routes={routes}>
		<AppConnnect />
	</Framework7App>  
);
