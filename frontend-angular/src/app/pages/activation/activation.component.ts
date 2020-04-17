import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  validateForm: FormGroup;
  submittingForm = false;
  key = null;
  linkVerified = false;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });

    this.verifyLink();
  }

  verifyLink = () => {
    this.key = this.route.snapshot.queryParams.key;
    if (this.key) {
      this.router.navigate(
        ['.'],
        { relativeTo: this.route, queryParams: {} }
      );
    } else {
      this.router.navigate(['/']);
    }

    this.sendAccessCode();
  }

  sendAccessCode = () => {
    const { key } = this;
    this.http.post('/activate/access-code', { key }).pipe(
      catchError(err => {
        this.router.navigate(['/']);
        throw err;
      })
    ).subscribe(
      () => { this.linkVerified = true; }
    );
  }


  confirmationValidator = (control: FormControl) => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }
  updateConfirmValidator = () => {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }
  submitForm = (e) => {
    e.preventDefault();
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.submittingForm = true;
    const { key } = this;
    const { code, password } = this.validateForm.value;
    console.log(code, password);
    this.http.post('/activate', { key, code, password }).pipe(
      catchError(err => { throw err; })
    ).pipe(
      finalize(() => { this.submittingForm = false; })
    ).subscribe(
      () => { this.router.navigate(['/']); }
    );
  }
}
