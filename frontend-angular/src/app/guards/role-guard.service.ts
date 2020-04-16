import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.decode();
    const { isLogged = true, isAdmin = true } = next.data;

    if ((isLogged && !!user && user.isAdmin === isAdmin) || (!isLogged && !user)) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
