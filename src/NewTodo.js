import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {value: ''};
  // }

  render() {
    return (
        <div id = "adding">
          <form onSubmit={this.props.addTodo}>
            <input type="text" id="task" placeholder="Add task here..." value={this.props.input} onChange={this.props.onChange}/>
            <div></div>
            <button type="submit" id="add" onSubmit={this.props.addTodo}>Add to List!</button>
          </form>
        
        </div>
        
    );
  }
}

export default NewTodo;
