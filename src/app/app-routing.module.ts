import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importeren componenten van de app
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ApodComponent } from './apod/apod.component';
import { NeoComponent } from './neo/neo.component';
import { NeoDetailComponent } from './neo-detail/neo-detail.component';

import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthTabGuard } from './_guards/auth-tab.guard';
import { LandsatComponent } from './landsat/landsat.component';
import { RoverManifestComponent } from './rover-manifest/rover-manifest.component';
import { RoverPhotosComponent } from './rover-photos/rover-photos.component';

const routes: Routes = [
  {path: 'error', component: ErrorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'info', component: InfoComponent},
  {path: 'user', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'apod', component: ApodComponent},
  {path: 'neo/:tab', component: NeoComponent, canActivate: [AuthTabGuard]},
  {path: 'neo-detail/:id', component: NeoDetailComponent},
  {path: 'landsat/:tab', component: LandsatComponent, canActivate: [AuthTabGuard]},
  {path: 'rovers', component: RoverManifestComponent},
  {path: 'roverphoto/:tab', component: RoverPhotosComponent, canActivate: [AuthTabGuard]},
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
