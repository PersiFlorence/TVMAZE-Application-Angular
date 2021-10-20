import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TvmazeServiceService } from 'src/app/services/tvmaze-service.service';
import { TvShows } from 'src/app/modals/tvshow.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tvmaze-search-list',
  templateUrl: './tvmaze-search-list.component.html',
  styleUrls: ['./tvmaze-search-list.component.css']
})
export class TvmazeSearchListComponent implements OnInit {
  public serachVal!: any;
  searchForShow = '';
  allShowsData: TvShows[] = [];
  searchResults: any = [];
  isLoadingIndicator: boolean = false;
  hasError: boolean = false;
  constructor(private location:Location,private showsData: TvmazeServiceService, private router: Router) { }

  ngOnInit(): void {
    if(this.location.getState()){
      this.serachVal = this.location.getState();
      if(this.serachVal.searchInput){
      localStorage.setItem("searchValue", this.serachVal.searchInput);
      this.getShowsBySearch(this.serachVal.searchInput);
      }else{
        this.getShowsBySearch(localStorage.getItem("searchValue"));
        this.serachVal.searchInput = localStorage.getItem("searchValue");
      }
    }
  }
  // Below function fetches all the shows from tvmaze API based on Search input
  getShowsBySearch(searchVal : any) {
    this.isLoadingIndicator = true;
    this.showsData.searchShows(searchVal).subscribe(
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
  goDashBoard() {
    this.router.navigate(['/dashboard']);
  }

}
