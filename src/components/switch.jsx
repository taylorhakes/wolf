import React, {Component} from 'react';

export default class Switch extends Component {
  constructor(props) {
    super(props);
    this.els = {};

    this.handleClick = (e) => {
      setTimeout(() => {
        this.props.onChange(this.els.checkbox.checked);
      }, 100);
    };
    this.getCheckbox = (el) => {
      this.els.checkbox = el;
    };
    this.handleChange = () => {};
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