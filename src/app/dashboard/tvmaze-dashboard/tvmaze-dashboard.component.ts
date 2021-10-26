import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TvShows } from 'src/app/modals/tvshow.interface';
import { TvmazeServiceService } from 'src/app/services/tvmaze-service.service';

@Component({
  selector: 'app-tvmaze-dashboard',
  templateUrl: './tvmaze-dashboard.component.html',
  styleUrls: ['./tvmaze-dashboard.component.css']
})
export class TvmazeDashboardComponent implements OnInit {
  searchForShow = '';
  allShowsData: TvShows[] = [];
  dramaData:  TvShows[] = [];
  sportsData: TvShows[] = [];
  comedyData: TvShows[] = [];
  actionData: TvShows[] = [];
  isLoadingIndicator: boolean = false;
  hasError: boolean = false;
  constructor(private tvmazeService: TvmazeServiceService,private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem("searchValue", '');
    this.getAllShows();
  }
   /* Below function filter the TV Shows Data based on genres */
   getFilteredDataByGenres(genres: string): TvShows[] {
    return this.allShowsData.filter(item => item.genres.indexOf(genres) >= 0);
  }
   /* Below function fetches all the shows from tvmaze API and split data based on genre */
   getAllShows() {
    this.isLoadingIndicator = true;
    this.tvmazeService.getAllTVShows().subscribe(
      (data: TvShows[]) => {
        this.allShowsData = data;
        this.allShowsData.sort((a, b) => a.rating.average > b.rating.average ? -1 : 1);
        this.dramaData = this.getFilteredDataByGenres('Drama');
        this.comedyData = this.getFilteredDataByGenres('Comedy');
        this.sportsData = this.getFilteredDataByGenres('Sports');
        this.actionData = this.getFilteredDataByGenres('Action');
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoadingIndicator = false;
      }
    );
  }
  goToSearch(searchVal:string) {
   localStorage.setItem("searchValue", searchVal);
   this.router.navigate(['/searchList']);
   console.log(searchVal);
  }
}
