import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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

  loginDialog: boolean = false;
  validateForm: FormGroup;
  email: string = '';
  password: string = '';

  ngOnInit() {
    this.isLogged$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.authService.isAdmin;

    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })
  }


  onLogin() {
    console.log(this.email, this.password)
    // this.closeLoginDialog();
  }

  onLogout() {
    this.authService.logout();
  }

  openLoginDialog() {
    this.loginDialog = true;
    this.email = '';
    this.password = '';
  }

  closeLoginDialog () {
    this.loginDialog = false;
  }
}
