import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = JSON.parse(localStorage.getItem('user') as string)?.token;
    if (authToken) {
      request = request.clone({
        setHeaders: {
          'x-auth-token': authToken,
        },
      });
    }
    return next.handle(request);
  }
}
