import React, {Component} from 'react';

export default class Switch extends Component {
  constructor(props) {
    super(props);
    this.els = {};
    this.lastChange = 0;

    this.handleClick = (e) => {
      if (Date.now() - this.lastChange > 100) {
        setTimeout(() => {
          this.props.onChange(this.els.checkbox.checked);
        }, 50);
      }
    };
    this.getCheckbox = (el) => {
      this.els.checkbox = el;
    };
    this.handleChange = (e) => {
      this.lastChange = Date.now();
      this.props.onChange(e.target.checked);
    };
  }


  render() {
    return (
      <label className="label-switch" onClick={this.handleClick}>
        <input type="checkbox" value="on" checked={this.props.checked} ref={this.getCheckbox} onChange={this.handleChange}  />
        <div className="checkbox"></div>
      </label>
    )
  }
}