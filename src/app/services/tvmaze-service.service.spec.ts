import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpApiServiceMock } from './http-api.service.mock';
import { HttpService } from './http.service';
import { TvmazeServiceService } from './tvmaze-service.service';

describe('TvmazeServiceService', () => {
  let service: TvmazeServiceService;
  const httpApiServiceMock = new HttpApiServiceMock();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: HttpService, useValue: httpApiServiceMock }
      ],
    });
    service = TestBed.inject(TvmazeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get tvShowsList', () => {
    spyOn(httpApiServiceMock, 'get').and.callThrough();
    service.getAllTVShows();
    expect(httpApiServiceMock.get).toHaveBeenCalled();
  });
  it('should get showDetails', () => {
    spyOn(httpApiServiceMock, 'get').and.callThrough();
    service.getShowDetails(1);
    expect(httpApiServiceMock.get).toHaveBeenCalled();
  });
  it('should get searchShows', () => {
    spyOn(httpApiServiceMock, 'get').and.callThrough();
    service.searchShows('drama');
    expect(httpApiServiceMock.get).toHaveBeenCalled();
  });
  it('should search for cast', () => {
    spyOn(httpApiServiceMock, 'get').and.callThrough();
    service.getShowCast(1);
    expect(httpApiServiceMock.get).toHaveBeenCalled();
  });
});

