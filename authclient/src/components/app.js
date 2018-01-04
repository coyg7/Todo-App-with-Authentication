import React from 'react';
import _ from 'lodash';
import Search from './search';
import TodoList from './todos-list';
import CreateTodo from './create-todo';
import AxiosService from '../services/axiosService';
import '../css/app.css';

let todos = [];

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.fetchTodos();
    };

    fetchTodos() {
        AxiosService.get('todos')
            .then(
            (value) => {
                this.setState({
                    todos: value.data.data
                }
                );
            });
    }

    toggleTask(name) {
        const foundTodo = _.find(this.state.todos, todo => todo.name === name);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
    }

    createTask(name) {
        this.state.todos.push({
            name,
            isCompleted: false
        });

        this.setState({
            todos: this.state.todos
        });


        AxiosService.post('todos', {
            name: name
        }).then((res) => {
            console.log('this', res.data.data);
            this.setState({
                todos: res.data.data
            });
        }).then(() => {
            this.fetchTodos();
        });
    }


    saveTask(oldTask, newTask) {

        const foundId = _.find(this.state.todos, todo => todo.name === oldTask);
        console.log('Found Id=====', foundId);

        AxiosService.put('todos/' + foundId.id, {
            name: newTask
        }).then((res) => {
            this.setState({
                todos: res
            });
        }).then(() => {
            this.fetchTodos();
        });
    }

    deleteTask(taskToDelete) {
        const foundId = _.find(this.state.todos, todo => todo.name === taskToDelete);

        AxiosService.delete('todos/' + foundId.id, {
            todos: { name: taskToDelete }
        })
            .then(
            (res) => {
                this.setState({
                    todos: res
                }
                );
            })
            .then(
            () => {
                this.fetchTodos();
            }
            )
    }

    handleSearch(key) {
        AxiosService.get('todos/search', {
            params: {
                key: key
            }
        }).then((value) => {
            this.setState({
                todos: value.data.data
            })
        });

    }


    render() {
        return (
            <div className="main-container col-md-4 col-md-offset-4">
                <h1>React Todo App</h1>

                <Search search={this.handleSearch} />

                <TodoList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />

                <CreateTodo createTask={this.createTask.bind(this)} />
            </div>
        );
    }
}

export default App;