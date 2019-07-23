import { Component, DebugElement, Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { advanceActivatedRoute } from '@angular/router/src/router_state';

@Injectable()
class NavConfigService {
  menu = [
      { label: 'Home', path: '/target/12' }
    ];
}

@Component({
    selector: 'app-navigation-menu',
    template: `<div><a *ngFor="let item of menu" [id]="item.label"
    [routerLink]="item.path">{{ item.label }}</a></div>`
})
class NavigationMenu implements OnInit {
    menu: any;

    constructor(
        private navConfig: NavConfigService
        ) { }

    ngOnInit() {
    this.menu = this.navConfig.menu;
    }
}

@Component({ // #A
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
  })
class AppComponent { }

@Component({ // #B
    selector: `app-simple-component`, // #B
    template: `simple` // #B
  }) // #B
class SimpleComponent { } // #B

describe('Testing routes', () => {
  let router: Router;
  let location: Location;
  let fixture;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [RouterTestingModule.withRoutes([
              { path: '', component: NavigationMenu },
              { path: 'target/:id', component: SimpleComponent }
          ])],
          providers: [{
              provide: NavConfigService,
              useValue: {
                  menu: [{ label: 'Home', path: '/target/fakeId' }]
              }
          }],
          declarations: [NavigationMenu, SimpleComponent, AppComponent],
      });
  });

  beforeEach(fakeAsync(() => {
      router = TestBed.get(Router);
      location = TestBed.get(Location);
      fixture = TestBed.createComponent(AppComponent);
      router.navigateByUrl('/');
      advance();
  }));

  function advance(): void {
      flush();
      fixture.detectChanges();
  }

  /**
    * The component under test generates navigation links.
    * The setup creates two mock components to facilitate the test, one for the app fixture and one for the target.
    * The TestBed configuration uses RouterTestingModule with fake route information. Before each test, the RouterTestingModule
    * loads the default route and updates the test fixture.
   */

   it('ries to route to a page', fakeAsync(() => {
       const menu = fixture.debugElement.query(By.css('a'));
       menu.triggerEventHandler('click', { button: 0 });
       advance();
       expect(location.path()).toEqual('/target/fakeId');
   }));

});
