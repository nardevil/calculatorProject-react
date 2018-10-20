import React, { Component } from 'react'
class Field extends Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className="field col-sm-2"
        data-width={this.props.width}
        data-input={this.props.input}
      >
        {this.props.label}
      </div>
    )
  }
}

export default Field
