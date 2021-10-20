import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvmazeDashboardComponent } from './dashboard/tvmaze-dashboard/tvmaze-dashboard.component';
import { TvmazeShowDetailsComponent } from './showDetails/tvmaze-show-details/tvmaze-show-details.component';
import { TvmazeSearchListComponent } from './showSearchList/tvmaze-search-list/tvmaze-search-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: TvmazeDashboardComponent, pathMatch: 'full' },
  { path: 'searchList', component: TvmazeSearchListComponent,pathMatch: 'full'},
  { path: 'show-details/:id', component: TvmazeShowDetailsComponent },
  { path: '**', component: TvmazeDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
