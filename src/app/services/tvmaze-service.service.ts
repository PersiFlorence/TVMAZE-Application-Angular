import { Injectable } from '@angular/core';
import { TvShows } from '../modals/tvshow.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TvmazeServiceService {
  isLoading = false;
  showsData: TvShows[] = [];
  url :string = 'https://api.tvmaze.com/';
  constructor(private http: HttpClient) { 
  }
  
   /* Below getAllTVShows method fetches all the shows from tvmaze API */
  getAllTVShows(): Observable<any> {
    return this.http.get(`${this.url}shows?page=1`);
  }
  /*  Below searchShows method fetch results based on the input text provided */
  searchShows(searchText: string): Observable<any> {
    return this.http.get(`${this.url}search/shows?q=${searchText}`);
  }
   /* Below getShowDetails method fetch details based on the show id provided */
  getShowDetails(id: number): Observable<any> {
    return this.http.get(`${this.url}shows/${id}`);
  }
   /*  Below getShowDetails method fetch details based on the show id provided */
   getShowCast(id: number): Observable<any> {
    return this.http.get(`${this.url}shows/${id}/cast`);
  }
}
