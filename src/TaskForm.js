import React from "react";
import Task from "./Task"

class TaskForm extends React.Component {
    state = (() => {
        if (localStorage.getItem("state")) {
            return JSON.parse(localStorage.getItem("state"))
        }
        return ({
            inputValue: "",
            tasks: []
        })
    })();

    addTask = () => {
        let value = this.state.inputValue;

        this.setState({
            inputValue: "",
            tasks: [...this.state.tasks, value]
        })
    };

    componentDidUpdate(prevState) {
        if (this.state.tasks !== prevState.tasks && !this.state.inputValue ) {
            localStorage.setItem("state", JSON.stringify(this.state))
        }
    }

    onInput = (ev) => {
        this.setState({
            inputValue: ev.target.value
        })
        
    };

    onSubmit = (ev) => {
        ev.preventDefault();
        this.addTask();
    };

    handleDeleteTask = (id) => {

        let arr = this.state.tasks
        arr.splice(id, 1)
        this.setState({
            ...this.state,
            tasks: arr
        })
    };

    render() {
        return (
            <div>
                <div className="box" id="addTaskForm">

                    <form action="" id="form" onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            id="input"
                            placeholder="Type Here"
                            autoComplete="off"
                            value={this.state.inputValue}
                            onInput={this.onInput}
                        />

                        <button type="reset" className="button">
                            <i className="far fa-trash-alt"></i>
                        </button>

                        <button type="submit" className="button" id="addNew">
                            <i className="fas fa-plus"></i>
                        </button>
                    </form>
                </div>
                <main id="main">
                    {this.state.tasks.map((task, index) => (
                        <Task title={task} id={index} key={task} onDelete={this.handleDeleteTask} />
                    ))}
                </main>

            </div>

        )
    }
}
export default TaskForm;