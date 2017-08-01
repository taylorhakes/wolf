import React, {Component} from 'react';
import {Page, Navbar, Card, CardHeader, CardContent, ContentBlockTitle, FormSwitch, List, ListItem, FormLabel, FormInput, Button, GridCol, GridRow, ContentBlock, ButtonsSegmented} from 'framework7-react';

const pStyle = {margin: '1em'};

export default class Game extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            birthDate: '2014-04-30',
            radioSelected: 1
        };        
    }

    render() {
        return (
            <Page>
                <Navbar backLink="Back" title="Forms" sliding />
                <ContentBlockTitle>Player Names</ContentBlockTitle>
                <List form>
                    <ListItem>
                        <FormLabel>Player 1</FormLabel>
                        <FormInput type="text" placeholder="Name" />   
                    </ListItem>
                    <ListItem>
                        <FormLabel>Player 2</FormLabel>
                        <FormInput type="text" placeholder="Name" />
                    </ListItem>
                    <ListItem>
                        <FormLabel>Player 3</FormLabel>
                        <FormInput type="text" placeholder="Name" />
                    </ListItem>
                    <ListItem>
                        <FormLabel>Player 4</FormLabel>
                        <FormInput type="text" placeholder="Name" />
                    </ListItem>
                </List>
                <GridRow style={pStyle}>
                    <GridCol><Button big fill color="green">+</Button></GridCol>
                    <GridCol><Button big fill color="red">-</Button></GridCol>
                </GridRow>

                <ContentBlockTitle>Game Rules</ContentBlockTitle>
                <List form>
                    <ListItem>
                        <FormLabel>Starting points</FormLabel>
                        <FormInput type="text" placeholder="1" />
                    </ListItem>
                    <ListItem>
                        <FormLabel>Dollars per point</FormLabel>
                        <FormInput type="text" placeholder="1" />
                    </ListItem>
                    <ListItem>
                        <FormLabel>Carry Overs</FormLabel>
                        <FormSwitch/>
                    </ListItem>
                    <ListItem>
                        <FormLabel>Points per hole</FormLabel>
                        <FormInput type="text" placeholder="1" />
                    </ListItem>
                    <ListItem>
                        <FormLabel>Doubles on wolf/pig</FormLabel>
                        <FormSwitch/>
                    </ListItem>
                    <ListItem>
                        <FormLabel>Stays up on carry over</FormLabel>
                        <FormSwitch/>
                    </ListItem>
                </List>
                <Card>
                    <CardHeader>Estimated Bad Loss</CardHeader>
                    <CardContent>$100</CardContent>
                </Card>
                <GridRow style={pStyle}>
                    <GridCol><Button big fill color="green">Create Game</Button></GridCol>
                </GridRow>
            </Page>
        );
    }
};
