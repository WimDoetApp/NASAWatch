import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ApodModule } from './apod/apod.module';
import { ErrorModule } from './error/error.module';
import { InfoModule } from './info/info.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ApodModule,
    ErrorModule,
    InfoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
