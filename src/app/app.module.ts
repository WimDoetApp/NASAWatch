import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { NavbarComponent } from './navbar/navbar.component';
import { UserInfoComponent } from './user-info/user-info.component';

import { LoginModule } from './login/login.module';
import { ApodModule } from './apod/apod.module';
import { ErrorModule } from './error/error.module';
import { InfoModule } from './info/info.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NeoModule } from './neo/neo.module';
import { NeoDetailModule } from './neo-detail/neo-detail.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserInfoComponent,
    UserDetailComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,

    LoginModule,
    ApodModule,
    ErrorModule,
    InfoModule,
    NeoModule,
    NeoDetailModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
