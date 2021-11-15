import { Component } from '@angular/core';
import { MoviedatabaseService } from '../api/moviedatabase.service';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SearchOptionsPage } from '../search-options/search-options.page';

@Component({
  selector: 'app-Search',
  templateUrl: 'Search.page.html',
  styleUrls: ['Search.page.scss']
})
export class SearchPage {
  myinput: String = ''
  MovieInfo: any
  loadingDialog: any // any = obecný datový typ, použijeme ho vždy když nechceme datový typ řešit.
  modal: any
  constructor(private movieDatabaseService: MoviedatabaseService, public loadingController: LoadingController, public modalController: ModalController) {}
  public btnSearchClicked(): void {
    if (this.myinput.length >= 2) {
      this.presentLoading();
      this.movieDatabaseService.SearchInDatabase(this.myinput, true).subscribe((data) => { //Je nutné volat metodu subscribe, v jejím prvním parametru se nacházejí data stažená ze serveru (odpověď na náš požadavek).  [V metodě subscribe, použijeme arrow function, abychom vypsali data stažená ze serveru do konzole.]
        console.log(data);
        this.MovieInfo = data['data'];
        this.loadingDialog.dismiss();
      });
    }
  }
  async presentLoading() {
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'I\'m looking for \"' + this.myinput + "\"",
      });
    await this.loadingDialog.present();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchOptionsPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }
}

