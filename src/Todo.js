import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.completed
    }
    this.completeTodo = this.completeTodo.bind(this);
  }

  completeTodo(event) {
    // event.preventDefault();
    var self = this;
    var checked = event.target.parentNode.id;
    var data  = {
      completed: true
    }
    var createRequest3 = new XMLHttpRequest();

    createRequest3.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        //   document.getElementById(complete_id).style.textDecoration = "line-through";
        self.setState (
          {
            completed: true
          }
        )
        console.log("success");
        } 
        else if (this.readyState == 4) {
          console.log(this.responseText);
        }
      }

    createRequest3.open("PUT", "https://cse204.work/todos/" + checked, true);
    createRequest3.setRequestHeader("Content-type", "application/json");
    createRequest3.setRequestHeader("x-api-key", "7d5d3e-7dd4c6-2603c1-6fd303-e4ae19");
    createRequest3.send(JSON.stringify(data));
    
  }
  
  render() {
    var className = "todo";
  if (this.state.completed) {
    className = "todo finished";
  }
    return (
      <div className="things" id ={this.props.id}>
        <input className="checkbox" type="checkbox" onClick={this.completeTodo} id="checked"></input>
        <p className={className}>{this.props.text}</p>
        <button className="button" onClick={this.props.removeDeletedTodo} id="delete">Delete</button>
      </div>
    );
  }
}

export default Todo;
