import { Component, OnInit } from '@angular/core';
import { TvmazeServiceService } from 'src/app/services/tvmaze-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tvmaze-search-list',
  templateUrl: './tvmaze-search-list.component.html',
  styleUrls: ['./tvmaze-search-list.component.css']
})
export class TvmazeSearchListComponent implements OnInit {
  public serachVal!: any;
  searchResults: any = [];
  isLoadingIndicator: boolean = false;
  hasError: boolean = false;
  
  constructor(private searchShowsService: TvmazeServiceService, private router: Router) { }
  /* Below method fetches TV shows based on Search Value from Service */
  ngOnInit(): void {
      if(localStorage.getItem("searchValue")?.length){
        this.serachVal = localStorage.getItem("searchValue");
        this.getShowsBySearch(localStorage.getItem("searchValue"));
      }
  }
  /*  Below function fetches all the shows from tvmaze API based on Search input */
  getShowsBySearch(searchVal : any) {
    this.isLoadingIndicator = true;
    this.searchShowsService.searchShows(searchVal).subscribe(
      (data: any) => {
        this.searchResults = data.map((item: { show: any; }) => item.show);
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
  /* Below method is used to Redirect to the Dashboard */
  goDashBoard() {
    this.router.navigate(['/dashboard']);
  }

}
