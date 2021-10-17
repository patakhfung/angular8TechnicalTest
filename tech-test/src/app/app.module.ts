import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {TaskListComponent} from './components/task-list/task-list.component';
import {TodoListPageComponent} from './pages/todo-list-page/todo-list-page.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ActiveTaskPipe} from './pipes/active-task.pipe';
import {CompletedTaskPipe} from './pipes/completed-task.pipe';
import {TaskEditModalComponent} from './components/task-edit-modal/task-edit-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ContentFilterPipe} from './pipes/content-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskEditModalComponent,
    TodoListPageComponent,
    ActiveTaskPipe,
    CompletedTaskPipe,
    ContentFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    TaskEditModalComponent
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
