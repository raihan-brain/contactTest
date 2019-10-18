import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Contact} from "@ionic-native/contacts";
import {Diagnostic} from "@ionic-native/diagnostic";

/**
 * Generated class for the CreateContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-contact',
  templateUrl: 'create-contact.html',
})
export class CreateContactPage {
  public numberOfContacts = '';
  isContactsAuthorized: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private contacts: Contact,
              private diagnostic: Diagnostic,
              private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateContactPage');
  }

  ionViewWillEnter() {
    if (this.platform.is('ios')) {
      this.diagnostic.isContactsAuthorized().then(state => {
        this.isContactsAuthorized = state;
        if (!state) {
          this.requestContactsAuthorization();
        }
      })
    }
  }

  requestContactsAuthorization() {
    this.diagnostic
      .requestContactsAuthorization()
      .then(data => {
        if (
          data === this.diagnostic.permissionStatus.DENIED_ALWAYS ||
          data === this.diagnostic.permissionStatus.DENIED
        ) {
          this.isContactsAuthorized = false;
        } else {
          this.isContactsAuthorized = true;
        }
      }).catch((error)=>{
        console.log(error);
    })
  }

  create() {
    console.log('working on it');
  }

}
