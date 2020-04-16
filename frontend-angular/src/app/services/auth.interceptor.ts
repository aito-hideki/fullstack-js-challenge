import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const { API_URL } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.decode()
    const url = `${API_URL}${req.url}`

    if (token) {
      const cloned = req.clone({
        url,
        headers: req.headers.set('Authorization', `Bearer ${token.accessToken}`)
      })

      return next.handle(cloned).pipe(
        catchError(err => {
          if (err.status === 401) {
            this.authService.logout();
          }
          throw err;
        })
      )
    } else {
      const cloned = req.clone({ url })
      return next.handle(cloned)
    }
  }
}