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
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private store: Store, private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new FetchRequest(true))
    return next.handle(request).pipe(tap((response) => {
      if (response instanceof HttpResponse) {
        this.store.dispatch(new FetchRequest(false));
      }
    }),
      catchError((requestError) => {
        this.store.dispatch(new FetchRequest(false));
        if (requestError.status == 401) {
          document.location.href = '';
          return of(requestError.message);
        } else if (requestError.status == 403) {
          this.displayMessage('Forbidden Request!', "you are not allowed to perform this action");
        }
        else if (requestError.status == 404) {
          this.displayMessage('Bad Request!', "entity not found");
        } else if (requestError.status == 500) {
          this.displayMessage('Server error!', "cannot fulfill the request");
        } else if (requestError.status == 503 || requestError.status == 504) {
          this.displayMessage('Server unavailable!', "cannot fulfill the request");
        }
        return throwError(() => new Error(requestError));
      }));
  }

  displayMessage(title: string, message: string): void {
    this._snackBar.open(title, message, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000
    });
  }
}