import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TvmazeDashboardComponent } from './dashboard/tvmaze-dashboard/tvmaze-dashboard.component';
import { TvmazeShowDetailsComponent } from './showDetails/tvmaze-show-details/tvmaze-show-details.component';
import { TvmazeShowListComponent } from './showList/tvmaze-show-list/tvmaze-show-list.component';
import { TvmazeSearchListComponent } from './showSearchList/tvmaze-search-list/tvmaze-search-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from './pageNotFound/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    TvmazeDashboardComponent,
    TvmazeShowDetailsComponent,
    TvmazeShowListComponent,
    TvmazeSearchListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IvyCarouselModule
  ],
  providers: [  HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
