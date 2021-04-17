import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, /*useReducer,*/ useState } from 'react';
import { addTask, deleteTask, getTasks, updateTask } from '../api/api';
import TaskForm from './TaskForm';
import SelectedContext from './SelectedContext';

const App: React.FC = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [activeIndex, setActive] = useState(-1);
  const [selectedTask, setSelectedTask] = useState({} as ITask);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async (): Promise<void> => {
    try {
      const response = getTasks();
      setTasks((await response).data);
    } catch (err) {
      console.log(err);
    }
  }

  const resetStates = (): void => {
    setTasks(tasks);
    setActive(-1);
    fetchTasks();
    setSelectedTask({} as ITask);
  }

  const handleSaveTask = (taskData: ITask): void => {
    if (taskData !== undefined) {
      if (taskData.id === undefined || taskData.id < 1) {
        addTask(taskData)
          .then(({ status, data }) => {
            if (status !== 200) {
              throw new Error('The task could not be saved')
            }
            resetStates();
          })
          .catch((err) => console.log(err));
      } else {
        updateTask(taskData)
          .then(({ status, data }) => {
            if (status !== 200) {
              throw new Error('The task could not be saved')
            }
            resetStates();
          })
          .catch((err) => console.log(err));
      }
    }
  }

  const handleDeleteTask = (selectedTask: ITask): void => {
    if (activeIndex < 0) {
      deleteTask(selectedTask.id)
        .then(({ status, data }) => {
          if (status !== 200) {
            throw new Error('The task could not be deleted')
          }
          setTasks(tasks);
          setActive(-1);
          fetchTasks();
          setSelectedTask({} as ITask);
        })
        .catch((err) => console.log(err));
    }
  }

  const toggleDone = (selectedTask: ITask): void => {

    const newTasks = tasks.map(task => {
      if (task === selectedTask) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });

    selectedTask.done = !selectedTask.done;
    updateTask(selectedTask)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Task not updated')
        }
      })
      .catch((err) => console.log(err));

    setTasks(newTasks);
  };

  return (

    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/names" className="navbar-brand">
          To-dolizer
        </a>
        <div className="navbar-nav mr-auto">
        </div>
      </nav>
      <div className="col-sm-0 offset-md-1 offset-lg-2 offset-xl-2">
        <div className="container mt-3">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 col-xl-6"><h4>To-do list</h4></div>
          </div>
          <div className="list row">
            <div className="col-xs-12  col-sm-12 col-md-10 col-lg-8 col-xl-6">
              <ul className="list-group">
                {tasks.map((task, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === activeIndex ? "active" : "")
                    }
                    key={index}
                  ><div className="form-check">
                      <div className="row">
                        <div className="col-8">
                          <label className={task.done ? "done form-check-label" : "form-check-label"} style={{ textDecoration: task.done ? 'line-through' : undefined }}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              onChange={() => toggleDone(task)}
                              checked={task.done}
                            />
                            {task.text}
                          </label>
                        </div>
                        <div className="col-2">
                          <button type="button" onClick={() => handleDeleteTask(task)} className="btn btn-link p-0">Delete</button>
                        </div>
                        <div className="col-2">
                          <button type="button" onClick={() => { setSelectedTask({ ...task }); setActive(index); }} className="btn btn-link p-0">Edit</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row mt-3"></div>
          <div className="list row">
            <div className="col-md-6 pt-8">
              <SelectedContext.Provider value={selectedTask}>
                <TaskForm saveTask={handleSaveTask} setActive={setActive} />
              </SelectedContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </div >

  );
}

export default App;
