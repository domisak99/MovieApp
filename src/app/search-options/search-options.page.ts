import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.page.html',
  styleUrls: ['./search-options.page.scss'],
})
export class SearchOptionsPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  ModalClose() {
    this.modalController.dismiss();
  }

}
