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
import { ComponentsModule } from '../components/components.module';
import { DialogUtilitiesProvider } from '../providers/dialog-utilities/dialog-utilities';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { LongPressModule } from 'ionic-long-press';

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
        scrollAssist: true,
        scrollPadding: true,
        autoFocusAssist: true
      },
      {
        links:
          [
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
    LongPressModule
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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    DebtsProvider,
    DialogUtilitiesProvider,
    UtilitiesProvider
  ]
})
export class AppModule { }
