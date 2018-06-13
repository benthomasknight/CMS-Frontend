
import { fakeAsync, ComponentFixture, TestBed,  } from '@angular/core/testing';

import { MainNavComponent } from './main-nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatSidenavModule } from '@angular/material';
import { PageComponent } from '../page/page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { defer } from 'rxjs';


export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const menuServiceStub = {
  get() {
    return fakeAsyncResponse([{id: 1}]);
  }
};


describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNavComponent, PageComponent ],
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RouterTestingModule
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(MainNavComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should compile', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));
});
