import { Pipe, PipeTransform } from '@angular/core';
import {ITask} from '../models/task';

@Pipe({
  name: 'completedTask'
})
export class CompletedTaskPipe implements PipeTransform {

  transform(values: ITask[]): ITask[] {
    return Object.values(values).filter(value => value.done);
  }

}
