import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../services/task.service';
import {ITask} from '../../models/task';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  data: ITask;
}

@Component({
  selector: 'app-task-edit-modal',
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.scss']
})
export class TaskEditModalComponent implements OnInit {
  @Input() task: ITask;

  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: DialogData,
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
    this.populateFormByModalData();
  }

  onSaveClick() {
    const taskObj = this.populateTaskByFormData();
    if (this.modalData.data) {
      taskObj.id = this.modalData.data.id;
      taskObj.done = this.modalData.data.done;
      this.taskService.updateTask(taskObj).subscribe(() => this.dialogRef.close());
    } else {
      this.taskService.createTask(taskObj).subscribe(() => this.dialogRef.close());
    }
  }

  populateFormByModalData() {
      this.taskForm = new FormGroup({
        id: new FormControl(this.modalData.data && this.modalData.data.id),
        label: new FormControl(this.modalData.data && this.modalData.data.label, Validators.required),
        description: new FormControl(this.modalData.data && this.modalData.data.description),
        category: new FormControl(this.modalData.data && this.modalData.data.category)
      });
  }

  populateTaskByFormData(): ITask {
    return {
      label: this.taskForm.get('label').value,
      description: this.taskForm.get('description').value,
      category: this.taskForm.get('category').value,
    } as ITask;
  }


}
