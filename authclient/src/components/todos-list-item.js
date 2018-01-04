import React from 'react';

class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderTaskSection() {
        const {name, isCompleted, onSaveClick} = this.props;
        console.log(this.props);
        console.log(name);

        const taskStyle = {
            color: isCompleted ? 'green' : 'red',
            cursor: 'pointer'
        }

        if(this.state.isEditing) {
            return( 
                <td>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" defaultValue={name} ref="editInput" className="form-control"/>
                    </form>
                </td>
            );
        }
        return(
            <td style={taskStyle} className="task-desc"
                onClick={this.props.toggleTask.bind(this, name)}>
                {name}
            </td>
        );
    }

    renderActionsSection() {
        if(this.state.isEditing) {
            return (
                <td className="action-btn">
                    <button onClick={this.onSaveClick.bind(this)} className="btn btn-success btn-sm">Save</button>
                    <button onClick={this.onCancelClick.bind(this)} className="btn btn-danger btn-sm">Cancel</button>
                </td>
            );
        }
        return(
            <td>
                <button onClick={this.onEditClick.bind(this)} className="btn btn-primary btn-sm">Edit</button>
                <button onClick={this.props.deleteTask.bind(this, this.props.name)} className="btn btn-danger btn-sm">Delete</button>
            </td>
        );
    }

    render() {
        return(
            <table className="table">
                <thread>
                    <tr>
                        {this.renderTaskSection()}
                        {this.renderActionsSection()}
                    </tr>
                </thread>
            </table>
        );
    }

    onEditClick() {
        this.setState({isEditing: true});
    }

    onCancelClick() {
        this.setState({isEditing: false})
    }

    onSaveClick(event) {
        event.preventDefault();
        const oldTask = this.props.name;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({isEditing: false});
    }
}

export default TodosListItem;