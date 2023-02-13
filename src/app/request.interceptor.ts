import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { FetchRequest } from './app.state';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new FetchRequest(true))
    return next.handle(request).pipe(tap((response) => {
      if (response instanceof HttpResponse) {
        this.store.dispatch(new FetchRequest(false));
      }
    }),
      catchError((requestError) => {
        if (requestError.status == 401) {
          document.location.href = '';
          return of(requestError.message);
        }
        return throwError(() => new Error(requestError));
      }));
  }
}