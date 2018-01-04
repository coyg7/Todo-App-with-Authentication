import _ from 'lodash';
import React from 'react';
import TodoListHeader from './todos-list-header';
import TodosListItem from './todos-list-item';

class TodoList extends React.Component {
    constructor(props){
        super(props);

        this.renderItems = this.renderItems.bind(this);
    }
    
    renderItems() {
        const props = _.omit(this.props, 'todos');
        return _.map(this.props.todos, (todo, index) => <TodosListItem key={index} {...todo} {...props}/>);
    }

    render() {
        return(
            <table>
                <TodoListHeader />
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        );
    }
}

export default TodoList;