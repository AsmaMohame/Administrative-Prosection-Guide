import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from './message.service';
import * as errorMsg from 'src/assets/error-messages.json';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get('refresh')) {
      return next.handle(request);
    }
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            this.notFoundMessage();
        } else {
          // server-side error
          if (!error.url?.includes('document')) {
            if (error.status === 409) this.getErrorMessage(error.error.code);
            if (
              error.status === 200 ||
              error.status === 400 ||
              error.status === 404 ||
              error.status === 424 ||
              error.status === 500 ||
              error.status === 102 ||
              error.status === 300 ||
              error.status === 303 ||
              error.status === 304 ||
              error.status === 305 ||
              error.status === 306 ||
              error.status === 307 ||
              error.status === 301 ||
              error.status === 308 ||
              error.status === 309
            )
              this.getErrorMessage(error.status.toString());
          }
        }
          throw new Error(errorMessage)
        })
      )
  }

  private getErrorMessage(errorCode: string): void {
    //@ts-ignore
    this.toasterService.errorMessage(errorMsg[errorCode]);
  }

  private notFoundMessage(): void {
    this.toasterService.errorMessage('الرجاء المحاوله مرة اخري');
  }

  private get toasterService(): MessageService {
    return this.injector.get(MessageService);
  }
}
