import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TvShows } from 'src/app/modals/tvshow.interface';
import { TvmazeServiceService } from 'src/app/services/tvmaze-service.service';

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
    searchValue!: string;
    backButtonText!:string;
    constructor(
      private route: ActivatedRoute, private router: Router,
      private showsService: TvmazeServiceService
    ) { }

  /* Get id from params and call API to get Show details and Cast Details and handling the back button Text */
  ngOnInit(): void {
      if(localStorage.getItem("searchValue")?.length){
        this.backButtonText = "Back to Search Result";
      }else{
        this.backButtonText = "Go Dashboard";
      }
      this.searchDetails();
      this.getCastDetails(); 
  }
  /* Below method fetches the details of selected show from service */
  searchDetails(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.isLoading = true;
    this.showsService.getShowDetails(this.id).subscribe(
      (data) => {
        this.showDetails = data;
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  /* Below method fetches the Cast Details of selected show from service */
  getCastDetails(){
    this.showsService.getShowCast(this.id).subscribe(
      (data) => {
        this.castDetails = data;
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  /* Below method redirected to either Search List page or dashboard page */
  goHome() {
    if(localStorage.getItem("searchValue")?.length){
      this.router.navigate(['/searchList']);
    }else{
      this.router.navigate(['/dashboard']);
    }
  }
}
