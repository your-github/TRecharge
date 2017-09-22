import { Component } from '@angular/core';
import {NavParams , ViewController} from 'ionic-angular';
/**
 * Generated class for the MoreComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'more',
  template: `
    <button (click)="closePopup()">History</button>
  `,
  styles: [`
    button{
      width: 100%;
      height: 40px;
      background: white;
      text-align: left;
    }
  `]
})
export class MoreComponent {

  data: string;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams
  ) {
  }

  closePopup(){
    /** close pop up menu by using view controller */
    this.viewCtrl.dismiss(true);
  }
}
