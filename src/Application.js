import React, { Component } from 'react'
import update from 'immutability-helper'
import $ from 'jquery'; 
import './Application.css'
import Result from './Result'
import Field from './Field'

class Application extends Component {
  constructor() {
    super()
    this.state = { 
      validInput: true,
      clearResult: false,
      operations: []
     }
  }

    calculateOperations = () => {
      let operations = this.state.operations.join('');
      let that = this;
      if (operations) {
        $.ajax({
          type: "POST",
          dataType: "json",           
          crossDomain: true,
          crossOrigin: true,          
          url: "https://calculator9000.herokuapp.com/calculate",
          data: {operations}         
        }).done(function (response) {
          if(response.message === "success") {
            that.setState({
              operations: [response.operations],
            })
          }
          else{
            that.setState({
              clearResult: true,
              operations: [response.operations],
            })
          }
        }).fail(function (response) {
          that.setState({
            clearResult: true,
            operations: ["Error - wrong input"],
          })
        });
      }
    }
  
  
  handleInput = e => {
    let result = this.state.operations.join('');
    const value = e.target.getAttribute('data-input')
    switch (value) {
      case 'clear':
        this.setState({
          clearResult: false,
          operations: []
        })
        break
      case 'equal':
        if(result === "Error - wrong input"){
          this.setState({
            clearResult: false,
            operations: []
          })
        }
        else{
          this.calculateOperations();
        }        
        break
      default:
      if(result === "Error - wrong input"){
        this.setState({
          clearResult: false,
          operations: []
        })
      }
      else{
        const newOperations = update(this.state.operations, {
        $push: [value],
      })
      this.setState({
        operations: newOperations,
      })

      }
        
        break
    }
  }
  render() {
    return (
      <div className="application container-fluid">
        <div id="1-1" className="row col-sm-12">
          <Result data={this.state.operations} />
        </div>
        <div className="row">
          <div id="2-1" className="row col-sm-12 align-self-center">
            <Field onClick={this.handleInput} label="7" input="7" />
            <Field onClick={this.handleInput} label="8" input="8" />
            <Field onClick={this.handleInput} label="9" input="9" />
            <Field onClick={this.handleInput} label="C" width="6" input="clear" />
          </div>
          <div id="2-2" className="row col-sm-12 align-self-center">
            <Field onClick={this.handleInput} label="4" input="4" />
            <Field onClick={this.handleInput} label="5" input="5" />
            <Field onClick={this.handleInput} label="6" input="6" />
            <Field onClick={this.handleInput} label="/" width="3" input="/" />
            <Field onClick={this.handleInput} label="x" width="3" input="*" />
          </div>
          <div id="2-3" className="row col-sm-12 align-self-center">
            <Field onClick={this.handleInput} label="1" input="1" />
            <Field onClick={this.handleInput} label="2" input="2" />
            <Field onClick={this.handleInput} label="3" input="3" />
            <Field onClick={this.handleInput} label="+" width="3" input="+" />
            <Field onClick={this.handleInput} label="-" width="3" input="-" />
          </div>
          <div id="2-4" className="row col-sm-12 align-self-center">
            <Field onClick={this.handleInput} label="0" width="4" input="0" />
            <Field onClick={this.handleInput} label="." input="." />
            <Field onClick={this.handleInput} label="=" width="6" input="equal" />
          </div>
        </div>
      </div>
    )
  }
}

export default Application
