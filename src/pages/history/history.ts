import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  cards = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
    if(localStorage.getItem("historyCache")){
      this.cards = JSON.parse(localStorage.getItem("historyCache"));
      this.cards = this.cards.reverse();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  closeHistoryPage(){
    this.viewCtrl.dismiss();
  }

  deleteHistory(index: number){
    this.cards.splice(index, 1);
    let newStoreCard = this.cards.slice(0);
    newStoreCard = newStoreCard.reverse();
    localStorage.setItem("historyCache", JSON.stringify(newStoreCard))
  }

}
