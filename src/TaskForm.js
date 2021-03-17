import React from "react";
import Task from "./Task"
import TaskClass from "./taskModel"

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

    componentDidUpdate(prevState) {
        if (this.state.tasks !== prevState.tasks && this.state.inputValue === "") {
            localStorage.setItem("state", JSON.stringify(this.state))
        }
    }

    addTask = () => {
        let value = this.state.inputValue;
        let newTask = new TaskClass(value);

        this.setState({
            inputValue: "",
            tasks: [...this.state.tasks, newTask]
        })
    };

    handleDoneTask = (id) => {
        let myState = this.state.tasks;

        if (myState && myState[id].className === "taskToDo") {
            let myTasks = this.state.tasks
            let taskToChange = myTasks[id]
            taskToChange.className = "taskToDo doneTask"

            console.log(id, taskToChange, myTasks);
            this.setState({
                ...this.state,
                tasks: myTasks
            })
        } else if (myState) {
            console.log("ill goback");
            let myTasks = this.state.tasks
            let taskToChange = myTasks[id]
            taskToChange.className = "taskToDo"

            console.log(id, taskToChange, myTasks);
            this.setState({
                ...this.state,
                tasks: myTasks
            })
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

                        <button type="reset" className="button" onClick={() => {
                            this.setState({
                                ...this.state, inputValue: ""
                            })
                        }}>
                            <i className="far fa-trash-alt"></i>
                        </button>

                        <button type="submit" className="button" id="addNew">
                            <i className="fas fa-plus"></i>
                        </button>
                    </form>
                </div>
                <main id="main">
                    {this.state.tasks.map((task, index) => (
                        <Task
                            title={task.title}
                            className={task.className}
                            id={index}
                            key={task.title}
                            onDelete={this.handleDeleteTask}
                            onClick={this.handleDoneTask} />
                    ))}
                </main>

            </div>

        )
    }
}
export default TaskForm;