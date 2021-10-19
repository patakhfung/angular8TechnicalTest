import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditModalComponent } from './task-edit-modal.component';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TaskServiceMock} from '../../services/task.service.mock';

describe('TaskEditModalComponent', () => {
  let component: TaskEditModalComponent;
  let fixture: ComponentFixture<TaskEditModalComponent>;
  let taskService: TaskService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEditModalComponent ],
      imports: [
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: TaskService, useClass: TaskServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditModalComponent);
    taskService = TestBed.get(TaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable save button when task title is not empty', () => {
    const labelInput = fixture.debugElement.nativeElement.querySelector('[automation-id="form-label"]');
    const saveBtn = fixture.debugElement.nativeElement.querySelectorAll('mat-dialog-actions .mat-button')[1];

    labelInput.value = 'test title';
    labelInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(saveBtn.disabled).toBe(false);
  });

  it('should disable save button when task title is empty', () => {
    const labelInput = fixture.debugElement.nativeElement.querySelector('[automation-id="form-label"]');
    const saveBtn = fixture.debugElement.nativeElement.querySelectorAll('mat-dialog-actions .mat-button')[1];

    labelInput.value = '';
    labelInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(saveBtn.disabled).toBe(true);
  });

  it('should save task if modal data is null', () => {
    const serviceSpy = spyOn(taskService, 'createTask');
    const labelInput = fixture.debugElement.nativeElement.querySelector('[automation-id="form-label"]');
    const saveBtn = fixture.debugElement.nativeElement.querySelectorAll('mat-dialog-actions .mat-button')[1];

    labelInput.value = 'test task';
    labelInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    saveBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('should populate form if task object is supplied', () => {
    const labelInput = fixture.debugElement.nativeElement.querySelector('[automation-id="form-label"]');
    const descriptionInput = fixture.debugElement.nativeElement.querySelector('[automation-id="form-description"]');
    const categoryInput = fixture.debugElement.nativeElement.querySelector('[automation-id="form-category"]');

    component.modalData.data = {
      id: 1,
      label: 'test label',
      description: 'test description',
      category: 'testing',
      done: false
    };
    component.ngOnInit();
    fixture.detectChanges();

    expect(labelInput.value).toBe('test label');
    expect(descriptionInput.value).toBe('test description');
    expect(categoryInput.value).toBe('testing');
  });

  it('should update task if task object is supplied', () => {
    const serviceSpy = spyOn(taskService, 'updateTask');
    const saveBtn = fixture.debugElement.nativeElement.querySelectorAll('mat-dialog-actions .mat-button')[1];

    component.modalData.data = {
      id: 1,
      label: 'test label',
      description: 'test description',
      category: 'testing',
      done: false
    };
    component.ngOnInit();
    fixture.detectChanges();
    saveBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
});
