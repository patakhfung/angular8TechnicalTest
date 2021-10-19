import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoListPageComponent} from './todo-list-page.component';
import {MaterialModule} from '../../material.module';
import {FormsModule} from '@angular/forms';
import {TaskService} from '../../services/task.service';
import {ContentFilterPipe} from '../../pipes/content-filter.pipe';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActiveTaskPipe} from '../../pipes/active-task.pipe';
import {TaskListComponent} from '../../components/task-list/task-list.component';
import {CompletedTaskPipe} from '../../pipes/completed-task.pipe';
import {TaskServiceMock} from '../../services/task.service.mock';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TaskEditModalComponent} from '../../components/task-edit-modal/task-edit-modal.component';

describe('TodoListPageComponent', () => {
  let component: TodoListPageComponent;
  let taskService: TaskService;
  let fixture: ComponentFixture<TodoListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:
        [TodoListPageComponent,
          TaskListComponent,
          CompletedTaskPipe,
          ActiveTaskPipe,
          ContentFilterPipe
        ],
      imports: [
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule],
      providers: [
        {provide: TaskService, useClass: TaskServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListPageComponent);
    taskService = TestBed.get(TaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should showing task labels', () => {
    const labels = fixture.debugElement.nativeElement.querySelectorAll('.mat-body-2');
    expect(labels.length).toBe(6);
    labels.forEach(label => {
      expect(label.innerHTML.length).not.toEqual(0);
    });
  });

  it('should show todo tasks', () => {
    const btnDone = [...fixture.debugElement.nativeElement.querySelectorAll('.mat-icon')].filter(i => i.innerText === 'done');
    expect(btnDone.length).toBeGreaterThan(0);
  });

  it('should show completed tasks', () => {
    const btnDone = [...fixture.debugElement.nativeElement.querySelectorAll('.mat-icon')].filter(i => i.innerText === 'unarchive');
    expect(btnDone.length).toBeGreaterThan(0);
  });

  it('should complete the task when done button is clicked', () => {
    const serviceSpy = spyOn(taskService, 'updateTask');
    const btnDone = [...fixture.debugElement.nativeElement.querySelectorAll('[automation-id="btn-done"]')];

    btnDone[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('should remove the task when remove button is clicked', () => {
    const serviceSpy = spyOn(taskService, 'deleteTask');
    const btnDelete = [...fixture.debugElement.nativeElement.querySelectorAll('[automation-id="btn-delete"]')];

    btnDelete[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('should filter tasks only matching category', async () => {
    const filterInput = fixture.debugElement.nativeElement.querySelector('#input-filter');
    filterInput.value = 'category1';
    filterInput.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    await fixture.whenStable();
    const tags = [...fixture.debugElement.nativeElement.querySelectorAll('.mat-chip')].filter(i => i.innerText === 'category1');
    expect(tags.length).toBe(3);
  });

  it('should filter task matching label', async () => {
    const filterInput = fixture.debugElement.nativeElement.querySelector('#input-filter');
    filterInput.value = 'label1';
    filterInput.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    await fixture.whenStable();
    const labels = [...fixture.debugElement.nativeElement.querySelectorAll('.mat-body-2')].filter(i => i.innerText === 'label1');
    expect(labels.length).toBe(1);
  });

  it('should filter task matching description', async () => {
    const filterInput = fixture.debugElement.nativeElement.querySelector('#input-filter');
    filterInput.value = 'description';
    filterInput.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    await fixture.whenStable();
    const descriptions = [...fixture.debugElement.nativeElement.querySelectorAll('.mat-body-1')]
      .filter(i => i.innerText.includes('description'));
    expect(descriptions.length).toBe(6);
  });
});
