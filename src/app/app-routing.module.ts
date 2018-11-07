import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importeren componenten van de app
import { InfoComponent } from './info/info.component';
import { ApodComponent } from './apod/apod.component';
import { NeoComponent } from './neo/neo.component';
import { NeoDetailComponent } from './neo-detail/neo-detail.component';

import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: 'info', component: InfoComponent},
  {path: 'apod', component: ApodComponent},
  {path: 'neo/:tab', component: NeoComponent},
  {path: 'neo-detail/:id', component: NeoDetailComponent},
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
