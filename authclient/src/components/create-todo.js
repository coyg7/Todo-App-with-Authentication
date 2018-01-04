import React from 'react';
import axios from 'axios';

class CreateTodo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        }
    }

    render() {
        console.log(this.props.todos);
        return(
            <form onSubmit={this.handleCreate.bind(this)} className="createTodoInput form-group">
                <input type="text" placeholder="What do you want to do?" ref="createInput" className="form-control"/>
                <button className="btn btn-primary">Create Todo</button>
            </form>
        );
    }

    handleCreate(event) {
        console.log('event', this.refs.createInput.value);
        event.preventDefault();
        this.props.createTask(this.refs.createInput.value);
        this.refs.createInput.value = '';
    }
}

export default CreateTodo;