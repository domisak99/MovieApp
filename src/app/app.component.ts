import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private modalController: ModalController) {
      this.presentSplash();
  }

  async presentSplash() {
    const modal = await this.modalController.create({
      component: SplashscreenComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
}
