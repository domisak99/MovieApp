import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchOptionsPageRoutingModule } from './search-options-routing.module';

import { SearchOptionsPage } from './search-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchOptionsPageRoutingModule
  ],
  declarations: [SearchOptionsPage]
})
export class SearchOptionsPageModule {}
