import { Component, Input, OnChanges} from '@angular/core';
import { TvShows } from 'src/app/modals/tvshow.interface';

@Component({
  selector: 'app-tvmaze-show-list',
  templateUrl: './tvmaze-show-list.component.html',
  styleUrls: ['./tvmaze-show-list.component.css']
})
export class TvmazeShowListComponent implements OnChanges {
  @Input() searchResults: TvShows[] = []
  @Input() genresType!: string;
  showsDataByGenres: TvShows[] = []
  genre!: string;
  isLoadingIndicator = false;
  hasError = false;

  /*  Receive input params from parent and store in assigned variables */
  ngOnChanges(changes: any) {
     if (changes.genresType) {
      this.genre = changes.genresType.currentValue;
    } 
    if (changes.searchResults) {
      this.showsDataByGenres = changes.searchResults.currentValue ? changes.searchResults.currentValue : [];
    }
  }
}
