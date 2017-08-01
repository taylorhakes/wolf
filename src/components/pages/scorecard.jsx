import React, {Component} from 'react';
import {Page, Navbar, NavRight, Card, CardHeader, CardContent, ContentBlockTitle, FormSwitch, List, ListItem, FormLabel, FormInput, Button, GridCol, GridRow, ContentBlock, ButtonsSegmented} from 'framework7-react';

const onChangeHandler = (event) => {
  console.log('change');
};

const pStyle = {margin: '1em'};

export default class Scorecard extends Component {

  render() {
    return (
      <Page>
        <Navbar backLink="Back" title="Scorecard" sliding>
          <NavRight>
            <FormSwitch/>
          </NavRight>
        </Navbar>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
                <th>13</th>
                <th>14</th>
                <th>15</th>
                <th>16</th>
                <th>17</th>
                <th>18</th>
                <th>Tot</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <th>Taylor</th>
              <th style={{backgroundColor: '#AAAAAA', color: '#fff'}}>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
              <th>11</th>
              <th>12</th>
              <th>13</th>
              <th>14</th>
              <th>15</th>
              <th>16</th>
              <th>17</th>
              <th>18</th>
            </tr>
            <tr>
              <th>Ben</th>
              <th style={{backgroundColor: '#2ECC40', color: '#fff'}}>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
              <th>11</th>
              <th>12</th>
              <th>13</th>
              <th>14</th>
              <th>15</th>
              <th>16</th>
              <th>17</th>
              <th>18</th>
            </tr>
            <tr>
              <th>Kevin</th>
              <th style={{backgroundColor: '#AAAAAA', color: '#fff'}}>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
              <th>11</th>
              <th>12</th>
              <th>13</th>
              <th>14</th>
              <th>15</th>
              <th>16</th>
              <th>17</th>
              <th>18</th>
            </tr>
            <tr>
              <th>Kevin</th>
              <th style={{backgroundColor: '#2ECC40', color: '#fff'}}>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10 <small>(50)</small></th>
              <th>11</th>
              <th>12</th>
              <th>13</th>
              <th>14</th>
              <th>15</th>
              <th>16</th>
              <th>17</th>
              <th>18</th>
            </tr>
            </tbody>
          </table>
        </div>
        <ContentBlockTitle>Tee Off Order: 1 Point</ContentBlockTitle>
        <List>
          <ListItem>
            <FormLabel>Item 1 (Wolf)</FormLabel>
            <FormInput type="select" defaultValue="4">
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
            </FormInput>
          </ListItem>
          <ListItem>
            <FormLabel>Item 2</FormLabel>
            <FormInput type="number" placeholder="Score" />
          </ListItem>
          <ListItem>
            <FormLabel>Item 3</FormLabel>
            <FormInput type="number" placeholder="Score" />
          </ListItem>
          <ListItem>
            <FormLabel>Item 3</FormLabel>
            <FormInput type="number" placeholder="Score" />
          </ListItem>
        </List>
        <List>
          <ListItem>
            <FormLabel>Partner</FormLabel>
            <FormInput type="select">
              <option value="1">Male</option>
              <option value="1">Female</option>
            </FormInput>
          </ListItem>
          <ListItem>
            <FormLabel>Pig</FormLabel>
            <FormSwitch/>
          </ListItem>
          <ListItem>
            <FormLabel>Winning Team</FormLabel>
            <FormInput type="select">
              <option value="1">Male</option>
              <option value="1">Female</option>
            </FormInput>
          </ListItem>
        </List>
      </Page>
    );
  }
};
