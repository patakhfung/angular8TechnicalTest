import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ITask} from '../models/task';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiEndpoint = `${ environment.apiGateway }/tasks/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  getTasks() {
    return this.httpClient.get<ITask[]>(this.apiEndpoint)
      .pipe(catchError(this.handleError));
  }

  createTask(task: ITask): Observable<any> {
    return this.httpClient.post(this.apiEndpoint, JSON.stringify(task), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateTask(task: ITask): Observable<any> {
    return this.httpClient.patch(`${this.apiEndpoint}${task.id.toString()}`, JSON.stringify(task), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteTask(taskId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiEndpoint}${taskId.toString()}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
