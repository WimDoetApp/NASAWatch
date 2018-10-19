import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importeren componenten van de app
import { ApodComponent } from './apod/apod.component';

import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: 'apod', component: ApodComponent},
  //homepage = apod
  {path: '', component: ApodComponent},
  //Niet gedefineerde paden doorverwijzen
  {path: '**', redirectTo: 'error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
