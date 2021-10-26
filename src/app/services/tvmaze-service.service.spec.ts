import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TvmazeServiceService } from './tvmaze-service.service';

describe('TvmazeServiceService', () => {
  let service: TvmazeServiceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: TvmazeServiceService}
      ],
    });
    service = TestBed.inject(TvmazeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get tvShowsList', () => {
    spyOn(TvmazeServiceService.prototype, 'getAllTVShows').and.callThrough();
    service.getAllTVShows();
    expect( service.getAllTVShows).toHaveBeenCalled();
  });
  it('should get showDetails', () => {
    spyOn(TvmazeServiceService.prototype, 'getShowDetails').and.callThrough();
    service.getShowDetails(1);
    expect(service.getShowDetails).toHaveBeenCalled();
  });
  it('should get searchShows', () => {
    spyOn(TvmazeServiceService.prototype, 'searchShows').and.callThrough();
    service.searchShows('drama');
    expect(service.searchShows).toHaveBeenCalled();
  });
  it('should search for cast', () => {
    spyOn(TvmazeServiceService.prototype, 'getShowCast').and.callThrough();
    service.getShowCast(1);
    expect(service.getShowCast).toHaveBeenCalled();
  });
});

