import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController } from 'ionic-angular';
import {MoreComponent} from '../../components/more/more';
import {HistoryPage} from '../history/history';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
data: string;
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController
  ) {

  }

  morePopOver(event){
    const more = this.popoverCtrl.create(MoreComponent);
    more.present({
      ev: event
    });
    more.onDidDismiss(result => {
      if(result){
        const historyModal = this.modalCtrl.create(HistoryPage);
        historyModal.present();
      }
    });
  }
}
