import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useReducer, useState } from 'react';
import { addTask, deleteTask, getTasks, updateTask } from './api/api';
import AddTask from './components/AddTask';
import SelectedContext from './components/SelectedContext';

const App: React.FC = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [activeIndex, setActive] = useState(-1);
  const [selectedTask, setSelectedTask] = useState({} as ITask);

  useEffect(() => { fetchTasks() }, []);

  const fetchTasks = async (): Promise<void> => {
    try {
      const response = getTasks();
      setTasks((await response).data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSaveTask = (formData: ITask): void => {
    if (formData) {  
      if (formData.id === undefined || formData.id < 1) {
        addTask(formData)
          .then(({ status, data }) => {
            if (status !== 200) {
              throw new Error('Error! Task not saved')
            }
            setTasks(tasks);
            setActive(-1);
            fetchTasks();
            setSelectedTask({} as ITask);
          })
          .catch((err) => console.log(err));
      } else {
        updateTask(formData)
          .then(({ status, data }) => {
            if (status !== 200) {
              throw new Error('Error! Task not saved')
            }
            setTasks(tasks);
            setActive(-1);
            fetchTasks();
            setSelectedTask({} as ITask);
          })
          .catch((err) => console.log(err));
      }
    }
  }

  const handleDeleteTask = (selectedTask: ITask): void => {
    deleteTask(selectedTask.id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Task not deleted')
        }
        setTasks(tasks);
        setActive(-1);
        fetchTasks();
        setSelectedTask({} as ITask);
      })
      .catch((err) => console.log(err));
  }

  const handleUpdateTask = (selectedTask: ITask, newText: string): void => {
    const newTasks = tasks.map(task => {
      if (task === selectedTask) {
        return {
          ...task,
          text: newText,
        };
      }
      return task;
    });

    selectedTask.text = newText;
    updateTask(selectedTask)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Task not updated')
        }
      })
      .catch((err) => console.log(err));

    setTasks(newTasks);
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

      <div className="container mt-3">
        <div className="list row">
          <div className="col-md-6">
            <ul className="list-group">
              {/* tasks && */ 
                tasks.map((task, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === activeIndex ? "active" : "")
                    }
                    key={index}
                  ><div className="form-check">
                      <div className="row">
                        <div className="col-md-8">
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
                        <div className="col-md-2">
                          <a href="#" onClick={() => handleDeleteTask(task)}>Delete</a>
                        </div>
                        <div className="col-md-2">
                          <a href="#" onClick={() => {setSelectedTask({ ...task});}}>Edit</a>
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
              <AddTask saveTask={handleSaveTask} />
            </SelectedContext.Provider>
          </div>
        </div>
      </div>
    </div >

  );
}

export default App;
