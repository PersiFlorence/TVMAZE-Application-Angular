import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { RouterModule, Routes } from '@angular/router';
import { TvmazeDashboardComponent } from './dashboard/tvmaze-dashboard/tvmaze-dashboard.component';
import { TvmazeShowDetailsComponent } from './showDetails/tvmaze-show-details/tvmaze-show-details.component';
import { TvmazeSearchListComponent } from './showSearchList/tvmaze-search-list/tvmaze-search-list.component';
import { AppComponent } from "./app.component";
import { routes } from "./app-routing.module";

describe("Router: App", () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [TvmazeDashboardComponent, TvmazeShowDetailsComponent, TvmazeSearchListComponent]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it("fakeAsync works", fakeAsync(() => {
    let promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /dashboard', fakeAsync(() => {
    router.navigate([""]).then(() => {
      tick(50);
      expect(location.path()).toBe("/dashboard");
    });
  }));

  it('navigate to "searchList" takes you to /searchList', fakeAsync(() => {
    router.navigate(["/searchList"]).then(() => {
      tick(50);
      expect(location.path()).toBe("/searchList");
    });
  }));
  it('navigate to "show-details/:id" takes you to /show-details/:id', fakeAsync(() => {
    router.navigate(["/show-details/:id"]).then(() => {
      tick(50);
      expect(location.path()).toBe("/show-details/:id");
    });
  }));
});
