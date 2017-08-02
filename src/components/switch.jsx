import React, {Component} from 'react';

export default class Switch extends Component {
  render() {
    return (
      <label className="label-switch">
        <input type="checkbox" value="on" checked={this.props.checked} onChange={this.props.onChange} />
        <div className="checkbox"></div>
      </label>
    )
  }
}