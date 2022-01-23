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
  //searchItem: string
  constructor(public modalController: ModalController) { 
    this.getSearchHistory();
  }
  async getSearchHistory() {
    const { value } = await Storage.get({ key: 'searchhistory' });
    this.searchHistoryList = value.split(",").filter(String);
  };
  searchFromHistory(searchItem: string) {
    this.modalController.dismiss(searchItem);
  }
  ModalClose() {
    this.modalController.dismiss();
  }
  ngOnInit(): void {
      
  }
}
