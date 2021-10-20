import { Injectable } from '@angular/core';
import { TvShows } from '../modals/tvshow.interface';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TvmazeServiceService {

  isLoading = false;
  showsData: TvShows[] = [];
  constructor(private httpService: HttpService,) { }
  // Below getAllTVShows method fetches all the shows from tvmaze API
  getAllTVShows(): Observable<any> {
    return this.httpService.get(`https://api.tvmaze.com/shows?page=1`);
  }
  // Below searchShows method fetch results based on the input text provided
  searchShows(searchText: string): Observable<any> {
    return this.httpService.get(`https://api.tvmaze.com/search/shows?q=${searchText}`);
  }
  // Below getShowDetails method fetch details based on the show id provided
  getShowDetails(id: number): Observable<any> {
    return this.httpService.get(`https://api.tvmaze.com/shows/${id}`);
  }
   // Below getShowDetails method fetch details based on the show id provided
   getShowCast(id: number): Observable<any> {
    return this.httpService.get(`https://api.tvmaze.com/shows/${id}/cast`);
  }
}
