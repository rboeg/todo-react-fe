interface ITask {
  id: number;
  order: number;
  text: string;
  done: boolean;
  folder: number;
}

type TaskProps = {
  task: ITask
}
