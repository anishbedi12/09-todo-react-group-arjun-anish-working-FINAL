import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      input: ''
    }
    this.addTodo = this.addTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.completeTodo = this.completeTodo.bind(this);
    this.removeDeletedTodo = this.removeDeletedTodo.bind(this);
    this.sortThis = this.sortThis.bind(this);
    
  }

  addTodo(event) {
    var self = this;
    event.preventDefault();
    const newTodoText = this.state.input;
    var data = {
        text: newTodoText
    };

    var createRequest2 = new XMLHttpRequest();

    createRequest2.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            self.setState(
              {
                todos: [...self.state.todos, JSON.parse((this.responseText))]
              }
            )
            // this.state.input = '';
            // }
        } else if (this.readyState === 4) {
            console.log(this.responseText);
          }
        }
        createRequest2.open("POST", "https://cse204.work/todos", true);
          createRequest2.setRequestHeader("Content-type", "application/json");
          createRequest2.setRequestHeader("x-api-key", "7d5d3e-7dd4c6-2603c1-6fd303-e4ae19");
          createRequest2.send(JSON.stringify(data));
          // document.getElementById("task").value = "";
          this.setState({
            input: ''
          })
  }

  onChange(event) {
    var self = this;
    // Set the state to the value of the input
    self.setState({
      input: event.target.value
    });
  }
 
  render() {
    return (
      <div id="container">
        <h1 id = "head">To-Do List:</h1>

<div id = "everything">

    <div id="list">

       <NewTodo addTodo={this.addTodo} onChange={this.onChange} input={this.state.input} />
       <button className="sortingbutton" onClick={this.sortThis}>Sort Alphabetically</button>
        {this.state.todos.map((todo) =>
        <Todo key={todo.id} id={todo.id} completeTodo={todo.completeTodo} completed={todo.completed}
        text={todo.text} removeDeletedTodo={this.removeDeletedTodo} />
        )}
    </div>
</div>

      </div>
    );
  }

  removeDeletedTodo(event) {
    event.preventDefault();
    var self = this;
    var remove = event.target.parentNode.id;
    
    var createRequest4 = new XMLHttpRequest();

    createRequest4.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const remainingTodos = self.state.todos.filter((todo) => {
          // Looping through all todos, if the id of the current todo DOES NOT equal the id of the todo we want to delete, keep it
          if (todo.id !== remove) {
            return todo;
          }
        });
        self.setState (
          {
            todos: remainingTodos
          }
        )
          // document.getElementById(remove_id).remove();

      } else if (this.readyState == 4) {

          console.log(this.responseText);
      }
  };
  createRequest4.open("DELETE", "https://cse204.work/todos/" + remove, true);
  
  createRequest4.setRequestHeader("Content-type", "application/json");
  createRequest4.setRequestHeader("x-api-key","7d5d3e-7dd4c6-2603c1-6fd303-e4ae19");
  createRequest4.send();
   }

   sortThis(event) {
     event.preventDefault();
     var self = this;
     var todos = self.state.todos;
     todos.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    })
    self.setState({
      todos: todos
    })
   }

  componentDidMount() {
    var self = this;
    var createRequest = new XMLHttpRequest();

    createRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // save new Todo to state
        var todo = JSON.parse(this.responseText);
        self.setState({
          todos: todo
        });
        console.log(todo);
      }
  };
    createRequest.open("GET", "https://cse204.work/todos", true);
    createRequest.setRequestHeader("x-api-key", "7d5d3e-7dd4c6-2603c1-6fd303-e4ae19");
    createRequest.send();
}
}

export default App;
