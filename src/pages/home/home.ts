import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import {MoreComponent} from '../../components/more/more';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController
  ) {

  }

  popOver(){
    const more = this.popoverCtrl.create(MoreComponent, {}, {showBackdrop: true});
    more.present();
  }
}
