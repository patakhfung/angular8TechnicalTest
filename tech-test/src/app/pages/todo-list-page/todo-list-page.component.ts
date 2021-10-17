import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {ITask} from '../../models/task';
import {MatDialog} from '@angular/material/dialog';
import {TaskEditModalComponent} from '../../components/task-edit-modal/task-edit-modal.component';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit {
  taskList: ITask[] = [];
  searchInput: string;

  constructor(
    private taskService: TaskService,
    public modal: MatDialog
  ) {
  }

  ngOnInit() {
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.getTasks().subscribe(data => this.taskList = data);
  }

  onAddOrEditClicked(task?: ITask) {
    const dialogRef = this.modal.open(TaskEditModalComponent, {
      width: '500px',
      data: {title: task ? 'Update Task' : 'New Task', data: task ? task : null}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getTaskList();
    });
  }

}
