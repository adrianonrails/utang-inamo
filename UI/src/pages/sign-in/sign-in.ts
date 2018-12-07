import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../sign-up/sign-up';
import { DebtsProvider } from '../../providers/debts/debts';

import superlogin from 'superlogin-client';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  username: any = "adrian";
  password: any = "password";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private toastCtrl: ToastController,
    private debtsProvider: DebtsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  async directLogin() {
    let loading = this.loadingCtrl.create({
      content: "Logging in..."
    });
    loading.present();

    try {
      const res = await this.authProvider.login(this.username, this.password);
      this.debtsProvider.init(res);
      this.navCtrl.setRoot(TabsPage);
    }
    catch (e) {
      console.log("Problem encountered while logging in.", e);
      this.toastCtrl.create({
        message: this.concatValidationErrors(e) || "Cannot login, check your username and password.",
        duration: 3000
      }).present();
    }
    finally {
      loading.dismiss();
    }
  }

  // async googleLogin() {

  //   let loading = this.loadingCtrl.create({
  //     content: "Signing in via Google..."
  //   });

  //   try {
  //     loading.present();
  //     const response = await this.authProvider.googleLogin();

  //     // convert the image to base64
  //     const picture = await this.toDataURL(response.user.photoURL);

  //     // Save to storage
  //     await this.storage.set("user", {
  //       isLocal: false,
  //       name: response.user.displayName,
  //       firstName: response.additionalUserInfo.profile.given_name,
  //       lastName: response.additionalUserInfo.profile.family_name,
  //       picture: picture
  //     });

  //     console.log("Successfully logged in.", response);

  //     this.goToHomePage();
  //   }
  //   catch (e) {
  //     console.log("Error logging in.", e);
  //     this.toastCtrl.create({
  //       message: "Cannot login, please try again.",
  //       duration: 2000
  //     }).present();
  //   }
  //   finally {
  //     loading.dismiss();
  //   }
  // }

  async directUse() {
    await this.storage.set("user", {
      isLocal: true,
      name: "Hooman",
      firstName: "Hooman",
      lastName: "Hooman",
      picture: "assets/imgs/user-placeholder.jpg"
    });

    this.goToHomePage();
  }

  goToSignUpPage() {
    this.navCtrl.setRoot(SignUpPage);
  }

  goToHomePage() {
    this.navCtrl.setRoot(TabsPage);
  }

  toDataURL(url) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  }

  loginGoogle() {
    // window.open("http://localhost:3000/auth/google", "_system", "scrollbars=yes,menubar=no,width=500, resizable=yes,toolbar=no,location=no,status=no");
    // try {
    //   let response = await superlogin.socialAuth("google");
    //   console.log("response", response);
    // }
    // catch (e) {
    //   console.log("shit happens while logging in via google", e);
    // }

    superlogin.socialAuth("google")
      .then((response) => {
        console.log("oraaaayts", response);
      })
      .catch((e) => {
        console.log("shit happens while logging in via google", e);
      });
  }

  loginFacebook() {
    //window.open("/auth/google", "_system", "scrollbars=yes,menubar=no,width=500, resizable=yes,toolbar=no,location=no,status=no");
    superlogin.socialAuth("facebook");
  }

  concatValidationErrors(err) {
    if (!err.error) {
      return;
    }

    let validations = err.error.validationErrors;
    let errors = [];
    if (validations) {
      for (let key in validations) {
        errors = errors.concat(validations[key].flatMap(x => x));
      }
      return errors.join(".\n");
    }

    return;
  }
}
