import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITask} from '../../models/task';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() public canEdit = false;
  @Input() public taskList: ITask[] = [];
  @Output() dataChanged: EventEmitter<any> = new EventEmitter();
  @Output() editClicked: EventEmitter<any> = new EventEmitter();

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onDeleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe( () => this.dataChanged.emit());
  }

  onCompleteTask(task: ITask) {
    task.done = new Date();
    this.taskService.updateTask(task).subscribe(() => this.dataChanged.emit());
  }

  onRedoTask(task: ITask) {
    task.done = false;
    this.taskService.updateTask(task).subscribe(() => this.dataChanged.emit());
  }

  onEditTask(task: ITask) {
    this.editClicked.emit(task);
  }

}
