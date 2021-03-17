import React from "react";
import "./Task.css"

function Task(props) {

  return (
    <div className={props.className} >
      <p onClick={() => { props.onClick(props.id) }}> 
        {props.title}
      </p>
      <button
        name="deleteButton"
        className="far fa-trash-alt button"
        aria-hidden="true"
        onClick={() => { props.onDelete(props.id) }}
      ></button>
    </div>);;
}
export default Task;