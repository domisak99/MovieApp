import { Component } from '@angular/core';
import { MoviedatabaseService } from '../api/moviedatabase.service';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SearchOptionsPage } from '../search-options/search-options.page';
import { SearchHistoryPage } from '../search-history/search-history.page';
import { Storage } from '@capacitor/storage';
import { ArrayType } from '@angular/compiler';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {
  myinput: string = ''
  MovieInfo: any
  loadingDialog: any // any = obecný datový typ, použijeme ho vždy když nechceme datový typ řešit.
  modal: any
  type: string
  year: number = 0
  searchItem: string
  constructor(private movieDatabaseService: MoviedatabaseService, public loadingController: LoadingController, public modalController: ModalController) {
    this.removeOptions();
    this.myinput = "hobbit";
    this.btnSearchClicked();
  }

  //Funkce pro vyhledání v databázi
  public async btnSearchClicked(): Promise<void> {
    await this.getOptions()
    if (this.myinput.length >= 2) {
      this.presentLoading();
      this.setHistoryItem(this.myinput);
      this.movieDatabaseService.searchInDatabase(this.myinput, this.type, this.year, true).subscribe((data) => { //Je nutné volat metodu subscribe, v jejím prvním parametru se nacházejí data stažená ze serveru (odpověď na náš požadavek).  [V metodě subscribe, použijeme arrow function, abychom vypsali data stažená ze serveru do konzole.]
        this.MovieInfo = data['data'];
        this.loadingDialog.dismiss();
      });
    }
  }

  //Ukládání položky hledání do historie
  async setHistoryItem(newHistoryItem: string) {
    const { value } = await Storage.get({ key: 'searchhistory' });
    let historyList: any;
    let historyListArr: any;
    if (value != null) {
      historyList = value;
    }
    if (newHistoryItem != null) {
      historyList = [newHistoryItem].concat(historyList);

      historyListArr = historyList.toString().split(",").filter(String);
      if(historyListArr.length>10){
        historyListArr.pop();
      }
      await Storage.set({
        key: 'searchhistory',
        value: historyListArr,
      });
    }
  };



  async setFavouriteItem(newFavouriteItem: string) {
    const { value } = await Storage.get({ key: 'favourite' });
    let favouriteList: any;
    let favouriteListArr: any;
    if (value != null) {
      favouriteList = value;
    }
    if (newFavouriteItem != null) {
      favouriteList = [newFavouriteItem].concat(favouriteList);
      console.log(favouriteList);
      favouriteListArr = favouriteList.toString().split(",").filter(String);
      console.log(favouriteListArr);
      await Storage.set({
        key: 'favourite',
        value: favouriteListArr,
      });
    }
  };

  /*RemoveElementFromArray(element: number) {
    this.arrayElements.forEach((value,index)=>{
        if(value==element) this.arrayElements.splice(index,1);
    });
  }*/

  async delFavouriteItem(delFavouriteItem: string) {
    const { value } = await Storage.get({ key: 'favourite' });
    let favouriteList: any;
    let favouriteListArr: any;
    if (value != null) {
      favouriteList = value;
    }
    if (delFavouriteItem != null) {
      favouriteListArr = favouriteList.toString().split(",").filter(String);
      favouriteListArr.forEach((value,index)=>{
        if(value==delFavouriteItem) favouriteListArr.splice(index,1);
      });
      await Storage.set({
        key: 'favourite',
        value: favouriteListArr,
      });
    }
  };


  //Loading při vyhledávání
  async presentLoading() {
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'I\'m  looking for \"' + this.myinput + "\"",
      });
    await this.loadingDialog.present();
  }

  //Modální okno pro nastavení parametrů vyhledávání
  async searchOptionsModal() {
    const modal = await this.modalController.create({
      component: SearchOptionsPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

  //Modální okno pro historii vyhledávání
  async searchHistoryModal() {
    const modal = await this.modalController.create({
      component: SearchHistoryPage,
      cssClass: 'my-custom-modal-css'
    });
    modal.onDidDismiss().then((data) => {
      this.myinput = data['data'];
      if(this.myinput!=null){
        this.btnSearchClicked();
      }
  });
    return await modal.present();
  }

  //Funkce pro získání typu
  async getType() {
    const { value } = await Storage.get({ key: 'type' });
    this.type = value;
  };
  //Funkce pro získání roku
  async getYear() {
    const { value } = await Storage.get({ key: 'year' });
    if(value!=null){
      var temp = value.replace('"', '');
      this.year = parseInt(temp);
    }
  };

  //Funkce pro získání typu i roku
  async getOptions() {
    await this.getType();
    await this.getYear();
  };

  //odstraneni typu a roku z uloziste
  async removeOptions() {
    await Storage.remove({ key: 'year' });
    await Storage.remove({ key: 'type' });
  };

  async removeOptions2() {
    await Storage.remove({ key: 'year' });
    await Storage.remove({ key: 'type' });
    this.type=null;
    this.year=NaN;
  };
}

