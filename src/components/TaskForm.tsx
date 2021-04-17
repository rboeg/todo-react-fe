import React, { useState, useEffect } from 'react'
import SelectedContext from './SelectedContext';

type Props = {
  saveTask: (taskData: ITask | any) => void;
  setActive: (index: number) => void;
}

const TaskForm: React.FC<Props> = ({ saveTask, setActive }) => {

  //const [formData, setFormData] = useState<ITask | {}>();
  const [enteredText, setEnteredText] = useState('');
  const [addText, setAddText] = useState('Add task');
  const [displayCancel, setDisplayCancel] = useState(false);

  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    setEnteredText(e.currentTarget.value);
    /*setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value
    });*/
  }

  const handleSubmit = (submitedTask: ITask) => {
    if (submitedTask !== undefined && submitedTask.text !== undefined && enteredText !== '' && displayCancel) {
      // editing the task
      submitedTask.text = enteredText;
      saveTask(submitedTask);
    } else if (enteredText !== '') {
      // adding a task
      const newTask = { text: enteredText, id: -1 } as ITask;
      saveTask(newTask);
    }
    setEnteredText('');
    //setFormData(undefined);
  }

  const contextTask = React.useContext(SelectedContext);

  useEffect(() => {
    if (contextTask.text) {  
      setEnteredText(contextTask.text);
      setDisplayCancel(true);
      setAddText('Edit task');
    } else {  
      setEnteredText('');
      setDisplayCancel(false);
      setAddText('Add task');
    }
  }, [contextTask])

  return (

    <form onSubmit={() => { handleSubmit(contextTask) }} id='add_form'>
      <div>
        <input onChange={handleForm} type='text' id='text' className='form-control ' placeholder="Enter text" value={enteredText} />
      </div>
      <div>
        <div className="text-right">
          <button type='button' className='btn btn-secondary mt-2' 
          onClick={() => { setAddText('Add task'); setDisplayCancel(false); setEnteredText(''); setActive(-1);}} 
          style={{ visibility: displayCancel ? "visible" : "hidden" }}>Cancel</button>
          <button type='submit' className={`btn mt-2 ml-2 ${addText === 'Add task' ? 'btn-success' : 'btn-primary'}`}>{addText}</button>
        </div>
      </div>
    </form>

  )
}

export default TaskForm;
