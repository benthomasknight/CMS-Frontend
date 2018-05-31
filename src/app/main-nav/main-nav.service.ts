import { Injectable } from '@angular/core';
import { MenuOption } from './menu-option';
import { Observable, from } from 'rxjs';
import { filter, concatAll, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainNavService {
  constructor() {}

  getNavigation(query = ''): Observable<MenuOption> {
    return from([{
        title: 'Test One',
        url: 'test.url'
      } as MenuOption,{
        title: 'Test Two',
        url: 'test.url'
      } as MenuOption,{
        title: 'Test Longer Three',
        url: 'test.url'
      } as MenuOption,{
        title: 'Test Longer Four',
        url: 'test.url'
      } as MenuOption,{
        title: 'Test Longer Five',
        url: 'test.url'
      } as MenuOption]
    )
    .pipe(
      filter(v => this.stringMatchFilter(v, query))
    );
  }

  stringMatchFilter(item: MenuOption, query: string): boolean {
    if(query.length == 0) {
      return true;
    }

    // Each unique part of the search string
    var queries = query.toLowerCase().split(' ');

    // All the items that may match
    var items = item.title.toLowerCase().split(' ');

    // Chack that all the query words are contained in one of the menus words
    return queries.every(v => {
      return items.some(v2 => v2.indexOf(v) != -1);
    });
  }
}
