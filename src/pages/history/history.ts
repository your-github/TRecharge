import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  cards = [];   //Declare cards property to store histories
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
    /** While opening history page, check histories on localStorage if there are histories stored set it to cards property */
    if(localStorage.getItem("historyCache")){
      this.cards = JSON.parse(localStorage.getItem("historyCache"));  //Set all histories cards from localStorage to cards property
      this.cards = this.cards.reverse();  //Reverse to show the last recharge history first
    }
  }

  ionViewDidLoad() {
  }

  /** add closeHistoryPage method to close history page */
  closeHistoryPage(){
    /** close history page using view controller */
    this.viewCtrl.dismiss();
  }

  /** add deleteHistory mathod for delete history list */
  deleteHistory(index: number){
    this.cards.splice(index, 1);    //delete the card you want from cards
    let newStoreCards = this.cards.slice(0);     // store all cards that to newStoreCard variable
    newStoreCards = newStoreCards.reverse();      //Reverse it one time and store on it own
    localStorage.setItem("historyCache", JSON.stringify(newStoreCards))  //Restore all cards to localStorage again
  }

}
