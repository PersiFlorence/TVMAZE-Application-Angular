import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TvShows } from 'src/app/modals/tvshow.interface';
import { TvmazeServiceService } from 'src/app/services/tvmaze-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tvmaze-show-details',
  templateUrl: './tvmaze-show-details.component.html',
  styleUrls: ['./tvmaze-show-details.component.css']
})
export class TvmazeShowDetailsComponent  implements OnInit {
  id: any;
  showDetails!: TvShows;
  castDetails!:any;
  hasError = false;
  isLoading = false;
  serachVal!: any;
  backButtonText!:string;
  constructor(
    private route: ActivatedRoute, private router: Router,
    private shows: TvmazeServiceService,private location:Location
  ) { }

  // Get id from params and call API to get Show details
  ngOnInit(): void {
    this.serachVal = this.location.getState();
    if(this.serachVal && this.serachVal.searchInput && this.serachVal.searchInput.length>0){
      this.backButtonText = "Back to Search Result"
    }else{
      this.backButtonText = "Go Dashboard";
    }
    this.searchDetails();
    this.getCastDetails();
  }
  //fetching details of selected show
  searchDetails(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.isLoading = true;
    this.shows.getShowDetails(this.id).subscribe(
      (data) => {
        this.showDetails = data;
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  //fetching cast details of selected show
  getCastDetails(){
    this.shows.getShowCast(this.id).subscribe(
      (data) => {
        this.castDetails = data;
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  //below method redirected to either Search List page or dashboard page
  goHome() {
    this.serachVal = this.location.getState();
    if(this.serachVal &&  this.serachVal.searchInput && this.serachVal.searchInput.length>0){
      this.router.navigateByUrl('/searchList', { state: {searchInput: this.serachVal.searchInput} });
    }else{
      this.router.navigate(['/dashboard']);
    }
    
  }
}
