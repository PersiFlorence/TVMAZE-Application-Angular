import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TvmazeServiceService } from 'src/app/services/tvmaze-service.service';
import { of, throwError } from 'rxjs';
import { TvmazeShowListComponent } from 'src/app/showList/tvmaze-show-list/tvmaze-show-list.component';
import { TvmazeDashboardComponent } from './tvmaze-dashboard.component';

describe('TvmazeDashboardComponent', () => {
  let component: TvmazeDashboardComponent;
  let fixture: ComponentFixture<TvmazeDashboardComponent>;
  const mockData = '[{"id":46584,"url":"http://www.tvmaze.com/shows/46584/drama","name":"Drama","type":"Scripted","language":"Spanish","genres":["Drama","Comedy","Sports"],"status":"Running","runtime":25,"premiered":"2020-02-04","officialSite":"http://www.rtve.es/playz/drama/","schedule":{"time":"19:00","days":["Tuesday"]},"rating":{"average":6.7},"weight":0,"network":{"id":147,"name":"RTVE","country":{"name":"Spain","code":"ES","timezone":"Europe/Madrid"}},"webChannel":null,"externals":{"tvrage":null,"thetvdb":376734,"imdb":"tt11341924"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/244/611819.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/244/611819.jpg"},"summary":"<p><b>Drama</b> tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/46584"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/1812874"}}}]';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvmazeDashboardComponent, TvmazeShowListComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [TvmazeServiceService, HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvmazeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('App should return data after loaded', () => {
    spyOn(TvmazeServiceService.prototype, 'getAllTVShows').and.returnValue(of(JSON.parse(mockData)));
    component.getAllShows();
    spyOn(component.allShowsData, 'sort');
    expect(component.allShowsData.length).toEqual(1);
    expect(component.dramaData.length).toBeGreaterThan(0);
    expect(component.comedyData.length).toBeGreaterThan(0);
    expect(component.sportsData.length).toBeGreaterThan(0);
  });
  it('App should return data display Rating ', () => {
    spyOn(TvmazeServiceService.prototype, 'getAllTVShows').and.returnValue(of(JSON.parse(mockData)));
    component.getAllShows();
    spyOn(component.allShowsData, 'sort');
    expect( component.allShowsData.sort()).toEqual( component.allShowsData.sort());
  });
  it('App should show error when we get error from API', () => {
    spyOn(TvmazeServiceService.prototype, 'getAllTVShows').and.returnValue(throwError('error'));
    component.getAllShows();
    expect(component.hasError).toBeTruthy();
  });
});
