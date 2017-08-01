import React, {PropTypes, Component} from 'react';

import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle, 
	List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
	LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput
} from 'framework7-react';

import {routes} from '../routes';



export class MainViews extends Component {
	constructor(props) {
		super(props);

		this.state = {
			games: [],
			editingGame: null,
			currentGame: null
		}
	}

	handleCreateGame() {
		this.setState({
			createGame: {
				players: [],
				isNew: true
			}
		});
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
								<Button onClick={this.handleCreateGame}>Create New Game</Button>
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

MainViews.contextTypes = {
	framework7AppContext: PropTypes.object
};

export const App = () => (	
	//Change themeType to "material" to use the Material theme
	<Framework7App themeType="ios" routes={routes}>		
		<Statusbar />
		<MainViews />
	</Framework7App>  
);
