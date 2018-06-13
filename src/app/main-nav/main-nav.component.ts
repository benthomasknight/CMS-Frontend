import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MenuOption } from './menu-option';
import { Observable, from } from 'rxjs';
import { MainNavService } from './main-nav.service';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

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
        startWith('') // No query at the beginning
        ,debounceTime(250) // Only search after 250ms of no typing
        ,map(query => { // Clear the menu
          this.menus = [];
          return query;
        })
        ,map(query => {
          // Filter the full menu with the new search string
          this.mainNavService.getNavigation(query)
          .subscribe(res => this.menus.push(res)) // Push each result that passed to the array
          return query;
        })
      ).subscribe();
  }
}
