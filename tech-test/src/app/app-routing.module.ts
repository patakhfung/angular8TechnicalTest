import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListPageComponent} from './pages/todo-list-page/todo-list-page.component';


const routes: Routes = [
  {path: '', component: TodoListPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
