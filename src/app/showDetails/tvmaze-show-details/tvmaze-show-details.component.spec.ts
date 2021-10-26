import { async,ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TvmazeShowDetailsComponent } from './tvmaze-show-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TvmazeDashboardComponent } from 'src/app/dashboard/tvmaze-dashboard/tvmaze-dashboard.component';
import { ActivatedRoute, Router,convertToParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TvmazeServiceService } from 'src/app/services/tvmaze-service.service';
import { of, throwError } from 'rxjs';
import { TvmazeSearchListComponent } from 'src/app/showSearchList/tvmaze-search-list/tvmaze-search-list.component';
const mockData = '{"id":1,"url": "http://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"Englosh","genres":["Drama","Science-Fiction", "Thriller"],"status":"Ended","runtime":60,"premiered": "2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"19:00","days":["Thursday"]},"rating":{"average":6.5},"weight":97,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b>  tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/1"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/185054"}}}';
const castMockData = '[{"person":{"id":49716,"url":"https://www.tvmaze.com/people/49716/daniel-pink","name":"Daniel Pink","country":null,"birthday":null,"deathday":null,"gender":"Male","image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/5/14625.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/5/14625.jpg"},"updated":1420821992,"_links":{"self":{"href":"https://api.tvmaze.com/people/49716"}}},"character":{"id":86947,"url":"https://www.tvmaze.com/characters/86947/crowd-control-host","name":"Host","image":null,"_links":{"self":{"href":"https://api.tvmaze.com/characters/86947"}}},"self":false,"voice":false}]';
describe('TvmazeShowDetailsComponent', () => {
  let component: TvmazeShowDetailsComponent;
  let fixture: ComponentFixture<TvmazeShowDetailsComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TvmazeShowDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'dashboard', component: TvmazeDashboardComponent },
        { path: 'searchList', component: TvmazeSearchListComponent,pathMatch: 'full'}
      ])],
      providers: [TvmazeServiceService, HttpClient, {
        provide: ActivatedRoute, Router, useValue: {
          paramMap: of(convertToParamMap({ id: 1 }))
        }
      },{ provide: Router, useValue: router }]
    })
      .compileComponents();
      
  }));

  beforeEach(() => {
  fixture = TestBed.createComponent(TvmazeShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should call search list page if search value is present in local storage method', () => {
    expect(localStorage.setItem('searchValue', 'drama'));
    component.goHome();
    component.backButtonText = "Back to Search Result";
    expect(router.navigate).toHaveBeenCalledWith(['/searchList']);
  });
  it('should call dash board page if search value is present in local storage method', () => {
    expect(localStorage.setItem('searchValue', ''));
    component.goHome();
    component.backButtonText = "Go Dashboard";
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
  it('should call API to get Show details', () => {
    spyOn(TvmazeServiceService.prototype, 'getShowDetails').and.returnValue(of(JSON.parse(mockData)));
    component.ngOnInit();
    expect(typeof (component.showDetails)).toBe('object');
  });

  it('should show error when API call returns an error for getShowDetails', () => {
    spyOn(TvmazeServiceService.prototype, 'getShowDetails').and.returnValue(throwError('error'));
    component.ngOnInit();
    expect(component.hasError).toBeTruthy();
  });
  it('should call API to get Cast details', () => {
    spyOn(TvmazeServiceService.prototype, 'getShowCast').and.returnValue(of(JSON.parse(castMockData)));
    component.ngOnInit();
    expect(typeof (component.castDetails)).toBe('object');
  });

  it('should show error when API call returns an error for getShowCast', () => {
    spyOn(TvmazeServiceService.prototype, 'getShowCast').and.returnValue(throwError('error'));
    component.ngOnInit();
    expect(component.hasError).toBeTruthy();
  }); 
});
