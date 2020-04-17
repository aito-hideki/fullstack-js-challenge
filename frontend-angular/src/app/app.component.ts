import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  isLogged$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isLogging$: Observable<boolean>;

  loginDialog = false;
  validateForm: FormGroup;

  closeLoginDialogOnAuthSubscription: Subscription;

  ngOnInit() {
    this.isLogged$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.authService.isAdmin;
    this.isLogging$ = this.authService.isLoggingIn;

    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });

    this.closeLoginDialogOnAuthSubscription = this.isLogged$.subscribe(this.closeLoginDialogOnAuth.bind(this));
  }

  ngOnDestroy() {
    this.closeLoginDialogOnAuthSubscription.unsubscribe();
  }


  onLogin() {
    const { email, password } = this.validateForm.value;
    this.authService.login({ email, password });
  }

  onLogout() {
    this.authService.logout();
  }

  openLoginDialog() {
    this.loginDialog = true;
  }

  closeLoginDialog() {
    this.loginDialog = false;
  }

  closeLoginDialogOnAuth(currentAuthStatus: boolean) {
    if (currentAuthStatus === true) {
      this.closeLoginDialog();
    }
  }
}
