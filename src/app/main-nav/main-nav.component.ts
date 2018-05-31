import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MenuOption } from './menu-option';
import { Observable, from } from 'rxjs';
import { MainNavService } from './main-nav.service';
import { concatMap, debounceTime, filter, first, concatAll, map, startWith } from 'rxjs/operators';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  menus: Array<MenuOption>;
  searchControl = new FormControl('');

  constructor(private breakpointObserver: BreakpointObserver, private mainNavService: MainNavService) {
    // For any seach control value changes, filter the menu options
    this.searchControl.valueChanges
      .pipe(
        startWith('')
        ,debounceTime(250)
        ,map(query => {
          this.menus = [];
          return query;
        })
        ,map(query => {
          // Filter the menu and set the menu to equal it
          this.mainNavService.getNavigation(query).subscribe(res => this.menus.push(res))
          return query;
        })
      ).subscribe();
  }
}
