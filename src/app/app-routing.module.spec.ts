import { Location } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
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

  it('navigate to "" redirects you to /dashboard', (() => {
    router.navigate([""]).then(() => {
      expect(location.path()).toBe("/dashboard");
    });
  }));

  it('navigate to "searchList" takes you to /searchList', (() => {
    router.navigate(["/searchList"]).then(() => {
      expect(location.path()).toBe("/searchList");
    });
  }));
  it('navigate to "show-details/:id" takes you to /show-details/:id', (() => {
    router.navigate(["/show-details/:id"]).then(() => {
      expect(location.path()).toBe("/show-details/:id");
    });
  }));
});
