import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';
/**
 * Generated class for the MoreComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'more',
  template: `
    <ion-list>
      <button ion-item (click)="closeView()">History</button>
    </ion-list>
  `
})
export class MoreComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
    this.text = 'Hello World';
  }

  closeView(){
    this.viewCtrl.dismiss();
  }
}
