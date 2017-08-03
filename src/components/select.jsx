import React, {Component} from 'react';

export default class Select extends Component {
  render() {
    return (
      <div className="item-input">
        <select value={this.props.value} onChange={this.props.onChange} type="select">
          {this.props.children}
        </select>
      </div>

    )
  }
}


