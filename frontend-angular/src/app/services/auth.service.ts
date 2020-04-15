import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  private loginStatus$ = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private roleStatus$ = new BehaviorSubject<boolean>(this.checkAdminStatus());

  private checkLoginStatus(): boolean {
    return !!this.decode();
  }

  private checkAdminStatus(): boolean {
    const token = this.decode();
    return token && token.isAdmin;
  }

  public decode(): any {
    let token;

    try {
      token = JSON.parse(localStorage.getItem('voteapp-credential'));
      if (!token.token || !token.isAdmin) {
        token = null;
      }
    } catch (err) {
      token = null;
    }

    return token;
  }

  public logout() {
    localStorage.removeItem('voteapp-credential');
    this.loginStatus$.next(this.checkLoginStatus());
    this.roleStatus$.next(this.checkAdminStatus());

    this.router.navigate(['/']);
  }

  get isLoggedIn() {
    return this.loginStatus$.asObservable();
  }
  get isAdmin() {
    return this.roleStatus$.asObservable();
  }

  getUserDetails() {
    // get user information
  }
}
