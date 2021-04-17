import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'http://localhost:8181/api'

export const getTasks = async () => {
  try {
    const response = await axios.get<ITask[]>(
      baseUrl + '/tasks'
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export const addTask = async (formData: ITask) => {
  try {
    const task: Omit<ITask, 'id'> = {
      text: formData.text,
      order: 0,
      done: false,
      folder: 1
    }; 
    const saveTask = await axios.post(
      baseUrl + '/tasks',
      task
    );
    return saveTask;
  } catch (error) {
    throw new Error(error)
  }
}

export const updateTask = async (taskUpdate: ITask) => {
  try {
    //const taskUpdate: Omit<ITask, 'id' | 'order' | 'done' | 'fol_id'> = {
    //  text: task.text
    //};
    const updatedTask = await axios.put(
      `${baseUrl}/tasks/${taskUpdate.id}/edit`,
      taskUpdate
    )
    return updatedTask;
  } catch (error) {
    throw new Error(error)
  }
}
/*
export const updateTaskDone = async (task: ITask) => {
  try {
    const taskUpdate: Pick<ITask, 'done'> = {
      done: true
    };
    const updatedTask = await axios.put(
      `${baseUrl}/${task.id}/edit`,
      taskUpdate
    )
    return updatedTask;
  } catch (error) {
    throw new Error(error)
  }
}
*/
export const deleteTask = async (id: number) => {
  try {
    const deletedTask = await axios.delete(
      `${baseUrl}/tasks/${id}/delete`,
    )
    return deletedTask
  } catch (error) {
    throw new Error(error)
  }
}

