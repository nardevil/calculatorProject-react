import React, { Component } from 'react'
class Result extends Component {
  render() {
    const string = this.props.data.join('')
    return <div className="result"> {string} </div>
  }
}
export default Result
