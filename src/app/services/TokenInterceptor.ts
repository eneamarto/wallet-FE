import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string | null = localStorage.getItem('token');

    if (token) {

      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    }

    return next.handle(request);
  }
}
