import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class JwtHttpInterceptor implements HttpInterceptor {
    bearerToken = '60a2eddf2eb518ce7237737055cd143f4b6e9f8c77e2c2e94a8ad43115938425'
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.bearerToken
        const isApiUrl = request.url.startsWith(environment.API_BASE_URL);
        if (token && isApiUrl) {
            console.log('checking', token, request)
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            })
        }
        return next.handle(request);
    }
}