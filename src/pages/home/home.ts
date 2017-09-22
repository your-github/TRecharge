import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController } from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {MoreComponent} from '../../components/more/more';
import {HistoryPage} from '../history/history';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CallNumber]
})
export class HomePage {
  data: string;
  inputCardNumber: string = "";
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public call: CallNumber
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
  rechargeCard(cnumber: string){
    if(cnumber.length > 0){
      const cardNumber = "*121*" + cnumber + "#";
      const date = new Date();
      const newCard = {cn: cnumber, d: date.getDate() + '-' + (Number.parseInt(date.getMonth().toString()) + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()};

      this.call.callNumber(cardNumber, true).then(()=>{
        if(localStorage.getItem("historyCache")) {
          let histories = [];
          histories = JSON.parse(localStorage.getItem("historyCache"));
          histories.push(newCard);
          localStorage.setItem("historyCache", JSON.stringify(histories));
        }else {
          localStorage.setItem("historyCache", JSON.stringify([newCard]));
        }
        this.inputCardNumber = '';
      });
    }
  }
}
