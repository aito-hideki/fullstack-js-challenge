import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, catchError } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  users: any[];
  loadingUsers = false;
  invitingUser = false;

  validateForm: FormGroup;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]]
    });

    this.refreshUsersTable();
  }

  refreshUsersTable() {
    this.loadingUsers = true;
    this.http.get('/user/all').pipe(
      catchError(err => { throw err; })
    ).pipe(
      finalize(() => this.loadingUsers = false)
    ).subscribe(
      (payload: any[]) => { this.users = payload; }
    );
  }

  inviteUser() {
    const { email } = this.validateForm.value;
    this.invitingUser = true;
    this.http.post('/user', { email }).pipe(
      catchError(err => { throw err; })
    ).pipe(
      finalize(() => this.invitingUser = false)
    ).subscribe(
      () => {
        this.validateForm.reset();
        this.refreshUsersTable();
      }
    );
  }
}
