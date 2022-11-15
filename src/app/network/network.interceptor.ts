import { CommonService } from './../services/common.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(private loading: CommonService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loading.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.loading.hide();
      })
    );
  }
}
