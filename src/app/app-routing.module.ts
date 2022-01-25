import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'search-options',
    loadChildren: () => import('./search-options/search-options.module').then( m => m.SearchOptionsPageModule)
  },  {
    path: 'search-history',
    loadChildren: () => import('./search-history/search-history.module').then( m => m.SearchHistoryPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
