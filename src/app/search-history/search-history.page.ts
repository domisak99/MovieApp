import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.page.html',
  styleUrls: ['./search-history.page.scss'],
})
export class SearchHistoryPage implements OnInit {
  searchHistoryList: any
  searchITEM: string
  constructor(public modalController: ModalController) { 
    this.getSearchHistory();
  }
  ModalClose() {
    this.modalController.dismiss();
  }
  async getSearchHistory() {
    const { value } = await Storage.get({ key: 'searchhistory' });
    this.searchHistoryList = value.split(",").filter(String);
  };
  async searchFromHistory() {
    if (this.searchITEM != null) {
      await Storage.set({
        key: 'type',
        value: this.searchITEM,
      });
    }
  };
  ngOnInit() {
  }

}
