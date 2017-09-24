import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController } from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {MoreComponent} from '../../components/more/more';
import {HistoryPage} from '../history/history';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CallNumber,BarcodeScanner]       //add CallNumber Class to home providers to make this page know CallNumber class
})
export class HomePage {
  inputCardNumber: string = ""; //Declare inputCardNumber Property to binding with ion-input on html
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public call: CallNumber,
    public barcodeScanner: BarcodeScanner
  ) {

  }

  /** Add morePoperver method and work at click event on more icon*/
  morePopOver(event){

    /** create Popover Controller object to pop up menu */
    const more = this.popoverCtrl.create(MoreComponent);
    /** show the pop over */
    more.present({
      ev: event
    });

    /** when pop up is closed, check what is clicked on pop up*/
    more.onDidDismiss(result => {
      /** if history button is clicked on pop up open history page */
      if(result){
        /** create modal controller object to open history page */
        const historyModal = this.modalCtrl.create(HistoryPage);

        /** show history page */
        historyModal.present();
      }
    });
  }

  /** Add rechargeCard method to make phone call for recharge any card*/
  rechargeCard(cnumber: string){
    if(cnumber.length > 0){

      const cardNumber = "*121*" + cnumber + "#";   //format card number to recharge card formet
      const date = new Date();

      /** Add new card log to newCard variable*/
      const newCard = {cn: cnumber, d: date.getDate() + '-' + (Number.parseInt(date.getMonth().toString()) + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()};

      /** Make phone call to recharge card */
      this.call.callNumber(cardNumber, true).then(()=>{

        /** when call success check histories if there are histories stored on localStorage, add new card to store again
         * else set new card to store on localStorage */
        if(localStorage.getItem("historyCache")) {
          let histories = [];                                                   // create new Array variable
          histories = JSON.parse(localStorage.getItem("historyCache"));    //add all histories cache to histories variable
          histories.push(newCard);                                              //add new card to history cache
          localStorage.setItem("historyCache", JSON.stringify(histories)); //Reset histories variable to store on localStorage
        }else {
          localStorage.setItem("historyCache", JSON.stringify([newCard]));  //Set new card to store on localStorage
        }
        this.inputCardNumber = '';  //clear input card number
      });
    }
  }

  scanCode(){

    const option: BarcodeScannerOptions = {
      'showFlipCameraButton': true,
      'showTorchButton': true,
	  'prompt':'ເຕີມເງີນແບບສະບາຍສະບາຍ',
      'formats': 'QR_CODE'
    }

    this.barcodeScanner.scan(option).then((cardnumber) =>{
      // if gotten data from scaned
       if(cardnumber.cancelled==false){
         // Call to telephone center with cardnumber then filled the card to your phone number.
         this.rechargeCard(cardnumber.text);
       }
    },(err) =>{

    })
  }

}
