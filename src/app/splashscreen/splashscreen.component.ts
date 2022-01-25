import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.scss'],
})
export class SplashscreenComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  ionViewDidEnter(){
    setTimeout(() => {
      this.modalController.dismiss();
    }, 2000);
  }

}
