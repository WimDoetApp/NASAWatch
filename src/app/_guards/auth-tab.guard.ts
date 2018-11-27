import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTabGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}      

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const tab = next.params['tab'];

    if(tab == '11'){
      this.authService.userData$.subscribe(data => {                             
        if (!data) {
          this.router.navigate(['/login']);
        }
      }); 
    }

    return true;
  }
}
