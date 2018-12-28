import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const superlogin = require('superlogin-client').default;

import { MyApp } from './app.component';
import { DebtListingPageModule } from '../pages/debt-listing/debt-listing.module';
import { BorrowerEditorPageModule } from '../pages/borrower-editor/borrower-editor.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { DebtInfoPage } from '../pages/debt-info/debt-info';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DebtListingPage } from '../pages/debt-listing/debt-listing';
import { TabsPage } from '../pages/tabs/tabs';
import { SignInPageModule } from '../pages/sign-in/sign-in.module';
import { AuthProvider } from '../providers/auth/auth';
import { environment } from '../environments/debug.environment';
import { DebtsProvider } from '../providers/debts/debts';
import { SignUpPageModule } from '../pages/sign-up/sign-up.module';
import { FormsModule } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { GooglePlus } from '@ionic-native/google-plus';
import { Network } from '@ionic-native/network';
import { ComponentsModule } from '../components/components.module';
import { DialogUtilitiesProvider } from '../providers/dialog-utilities/dialog-utilities';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { LongPressModule } from 'ionic-long-press';
import { PublicDebtInfoPage } from '../pages/public-debt-info/public-debt-info';
import { PublicDebtInfoPageModule } from '../pages/public-debt-info/public-debt-info.module';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { AccountEditorPageModule } from '../pages/account-editor/account-editor.module';
import { PublicDebtProvider } from '../providers/public-debt/public-debt';

superlogin.configure(environment.superlogin);

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp,
      {
        pageTransition: "ios-transition",
        platforms: {
          ios: {
            scrollAssist: true,
            scrollPadding: true,
            autoFocusAssist: true
          },
          android: {
            scrollAssist: true,
            scrollPadding: true,
            autoFocusAssist: true
          },
          web: {
            scrollAssist: false,
            autoFocusAssist: false
          }
        }
      },
      {
        links:
          [
            { component: PublicDebtInfoPage, name: "public-debt-info", segment: "public-debt-info/:userid/:debtid" },
            { component: DashboardPage, name: "dashboard", segment: "dashboard" },
            { component: DebtInfoPage, name: "debt-info", segment: "debt-info/:id", defaultHistory: [DebtListingPage] },
            { component: DebtListingPage, name: "debt-list", segment: "debt-list" },
            { component: TabsPage, name: "tabs", segment: "tab" }
          ]
      }
    ),
    IonicStorageModule.forRoot(),
    DebtListingPageModule,
    BorrowerEditorPageModule,
    DashboardPageModule,
    TabsPageModule,
    SignInPageModule,
    SignUpPageModule,
    ComponentsModule,
    BrowserAnimationsModule,
    LongPressModule,
    PublicDebtInfoPageModule,
    AccountEditorPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    HttpClientModule,
    StatusBar,
    SplashScreen,
    Keyboard,
    GooglePlus,
    Network,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    DebtsProvider,
    DialogUtilitiesProvider,
    UtilitiesProvider,
    ConnectivityProvider,
    PublicDebtProvider
  ]
})
export class AppModule { }
