import {of} from 'rxjs';
import {ITask} from '../models/task';

export class TaskServiceMock {
  getTasks() {
    return of(
      TASK_MOCK
      );
  }

  updateTask(task: ITask) {
    return;
  }

  deleteTask(task: ITask) {
    return;
  }

  createTask(task: ITask) {
    return;
  }
}
export const TASK_MOCK = [
  {
    id: 1,
    label: 'label1',
    description: 'description1',
    category: 'category1',
    done: false
  },
  {
    id: 2,
    label: 'label2',
    description: 'description2',
    category: 'category1',
    done: false
  },
  {
    id: 3,
    label: 'label3',
    description: 'description3',
    category: 'category1',
    done: false
  },
  {
    id: 4,
    label: 'label4',
    description: 'description4',
    category: 'category2',
    done: '2021-10-18T21:41:00.376Z'
  },
  {
    id: 5,
    label: 'label5',
    description: 'description5',
    category: 'category2',
    done: '2021-10-18T21:41:00.376Z'
  },
  {
    id: 6,
    label: 'label6',
    description: 'description6',
    category: 'category3',
    done: '2021-10-18T21:41:00.376Z'
  }
];
