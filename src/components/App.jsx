import React, {PropTypes, Component} from 'react';

import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle, 
	List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
	LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput
} from 'framework7-react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import Main from './pages/main';
import Game from './pages/game'

import {routes} from '../routes';
import {initNewGame} from '../action_creators';



class Container extends Component {
	constructor(props) {
		super(props);
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
						<Main/>
					</Pages>
				</View>
			</Views>
    );
	}
}
Container.contextTypes = {
	framework7AppContext: PropTypes.object
};

export const App = () => (	
	//Change themeType to "material" to use the Material theme
	<Framework7App themeType="ios" routes={routes}>		
		<Statusbar />
		<Container />
	</Framework7App>  
);
