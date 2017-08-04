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
		const Page = this.pages[this.props.page]
		return (<Page />);
	}

	render() {
    return (
			<Views>
				<View url="/" id="main-view" dom navbarThrough dynamicNavbar={true}>
          {/* Navbar */}
          {this.context.framework7AppContext.theme.ios ? (
						<Navbar>
							<NavCenter sliding>Wolf</NavCenter>
						</Navbar>
          ) : null}
          {/* Pages */}
					<Pages>
						{this.renderPage()}
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
