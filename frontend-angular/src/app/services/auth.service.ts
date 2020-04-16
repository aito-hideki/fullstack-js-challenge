import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { toCamelCase } from 'src/app/utils/case-convert';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  private loginStatus$ = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private roleStatus$ = new BehaviorSubject<boolean>(this.checkAdminStatus());
  private loggingIn$ = new BehaviorSubject<boolean>(false);

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
      if (!token.accessToken || !token.isAdmin) {
        token = null;
      }
    } catch (err) {
      token = null;
    }

    return token;
  }

  public login(credential) {
    const { email, password } = credential;
    this.loggingIn$.next(true);
    this.http.post('/auth/login', { email, password }).pipe(
      finalize(() => this.loggingIn$.next(false))
    ).subscribe(
      (token) => { this.setToken(toCamelCase(token)) },
      (err) => { throw err }
    );
  }

  public logout() {
    localStorage.removeItem('voteapp-credential');
    this.refreshStatus();
    this.router.navigate(['/']);
  }

  public setToken(token) {
    localStorage.setItem('voteapp-credential', JSON.stringify(token));
    this.refreshStatus();
    this.router.navigate(['/']);
  }

  public refreshStatus() {
    this.loginStatus$.next(this.checkLoginStatus());
    this.roleStatus$.next(this.checkAdminStatus());
  }


  get isLoggedIn() {
    return this.loginStatus$.asObservable();
  }
  get isAdmin() {
    return this.roleStatus$.asObservable();
  }
  get isLoggingIn() {
    return this.loggingIn$.asObservable();
  }

  getUserDetails() {
    // get user information
  }
}
