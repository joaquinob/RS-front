import { Pipe, PipeTransform } from '@angular/core';
import { Tweet } from '../interfaces/tweet';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: Tweet[], filtro: string): Tweet[] {
    return value.filter(x => x.text.toLowerCase().includes(filtro) || x.user.username.toLowerCase().includes(filtro));
  }
}
