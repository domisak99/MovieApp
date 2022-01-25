import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import * as moment from 'moment';


@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.page.html',
  styleUrls: ['./search-options.page.scss'],
})
export class SearchOptionsPage implements OnInit {
  soType: string
  soYear: any
  constructor(public modalController: ModalController) {
    this.getType();
    this.getYear();
  }

  ngOnInit() {
  }

  ModalClose() {
    this.modalController.dismiss();
  }

  async setItem() {
    if (this.soYear != null) {
      var year = moment(this.soYear).format('YYYY');
      console.log(year);
      await Storage.set({
        key: 'year',
        value: JSON.stringify(year),
      });
    }
    if (this.soType != null) {
      await Storage.set({
        key: 'type',
        value: this.soType,
      });
    }
    this.modalController.dismiss();
  };

  async getType() {
    const { value } = await Storage.get({ key: 'type' });
    //this.type = value;
    this.soType = value;
    //console.log(this.soType);
  };
  async getYear() {
    const { value } = await Storage.get({ key: 'year' });
    this.soYear = parseInt(value);
  };
}

