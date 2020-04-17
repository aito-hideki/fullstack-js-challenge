import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  constructor(private http: HttpClient) { }

  admins: any[];
  loadingAdmins = false;

  ngOnInit(): void {
    this.refreshAdminsTable();
  }

  refreshAdminsTable() {
    this.loadingAdmins = true;
    this.http.get('/admin/all').pipe(
      catchError(err => { throw err; })
    ).pipe(
      finalize(() => this.loadingAdmins = false)
    ).subscribe(
      (payload: any[]) => { this.admins = payload; }
    );
  }
}
