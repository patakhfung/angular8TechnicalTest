import {Pipe, PipeTransform} from '@angular/core';
import {ITask} from '../models/task';

@Pipe({
  name: 'contentFilter'
})
export class ContentFilterPipe implements PipeTransform {

  transform(values: ITask[], searchInput: string): any {
    const search = searchInput ? searchInput.trim().toLocaleLowerCase() : null;
    return !searchInput ? values : Object.values(values).filter(
      value => value.label.trim().toLocaleLowerCase().includes(search) ||
        (value.description && value.description.trim().toLocaleLowerCase().includes(search)) ||
        (value.category && value.category.trim().toLocaleLowerCase().includes(search))
    );
  }

}
