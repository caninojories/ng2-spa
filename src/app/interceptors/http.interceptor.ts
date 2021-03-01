import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export class Error {
  public static message(statusCode: number | string): string {
    let message: any;
    switch (statusCode) {
      case 0:
        message = 'Unexpected Error. Please try again later.';
        break;
      default:
        message = 'Unexpected Error. Please try again later.';
    }

    return message;
  }
}

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: `${environment.apiConnectionURL}${environment.version}${request.url}`,
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
