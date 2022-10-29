import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  //state (todo list _)
  const [toDo, setToDo] = useState([
    { id: 1, title: "Todos 1", status: false },
    { id: 3, title: "Todos 3", status: true },
    { id: 2, title: "Todos 2", status: false },
  ]);

  //temp this.state.
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  //add newTask
  /////////////////////////////
  const addTask = () => {
    if (!newTask) {
      alert("Field is required");
    } else {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  //delete newTask
  ///////////////////////////////
  const deleteTask = (id) => {
    let newTaskDelete = toDo.filter((task) => task.id !== id);
    setToDo(newTaskDelete);
  };

  //Mark newTask as done or completed
  //M/////////////////////////////
  const markDone = (id) => {
    let newTaskMark = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTaskMark);
  };

  //cansel update
  ///////////////////////////////
  const canselUpdate = () => {
    setUpdateData("");
  };

  //change task for update
  ///////////////////////////////
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  //update Task
  ///////////////////////////////
  const updateTask = () => {
    let filterRecord = [...toDo].filter((task) => task.id !== updateData.id);
    let updateObject = [...filterRecord, updateData];
    setToDo(updateObject);
    setUpdateData("");
  };

  return (
    <div className="container App">
      <br />
      <br />
      <h2 className="mijnH2">To Do list App (React.js)</h2>
      <br />
      <br />
      <h4 className="mijnH2">Web style nZoump</h4>
      <br />
      <br />
      {/* UPDATE TASK INPUT*/}
      <div className="row">
        <div className="col">
          <input
            className="form-control form-control-lg"
            placeholder="Update Fields.."
            value={updateData && updateData.title}
            onChange={(e) => changeTask(e)}
          />
        </div>
        <div className="col-auto">
          <button
            className="btn btn-lg btn-outline-success mr-20"
            onClick={updateTask}
          >
            Update
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            onClick={() => canselUpdate()}
          >
            Cancel
          </button>
        </div>
      </div>
      <br />
      <br />
      {/* ADD TASK INPUT*/}
      <div className="row">
        <div className="col">
          <input
            className="form-control form-control-lg"
            placeholder="Add Something.."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            required
          />
        </div>
        <div className="col-auto">
          <button onClick={addTask} className="btn btn-lg btn-outline-primary">
            Add Task
          </button>
        </div>
      </div>
      <br />
      <br />
      {/*display todo list */}
      {toDo && toDo.length ? (
        ""
      ) : (
        <div className="alert alert-secondary role=" alert>
          No Tasks
        </div>
      )}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.status ? "done" : ""}>
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{task.title}</span>
                  </div>
                  <div className="iconsWrap">
                    <span title="Completed" onClick={(e) => markDone(task.id)}>
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    {task.status ? null : (
                      <span
                        title="Edit"
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            status: task.status ? true : false,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}
                    <span title="Delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default App;
