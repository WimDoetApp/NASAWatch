import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importeren componenten van de app
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ApodComponent } from './apod/apod.component';
import { NeoComponent } from './neo/neo.component';
import { NeoDetailComponent } from './neo-detail/neo-detail.component';

import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthTabGuard } from './_guards/auth-tab.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'apod', component: ApodComponent},
  {path: 'neo/:tab', component: NeoComponent, canActivate: [AuthTabGuard]},
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
