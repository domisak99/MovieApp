import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchOptionsPage } from './search-options.page';

const routes: Routes = [
  {
    path: '',
    component: SearchOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchOptionsPageRoutingModule {}
