import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import * as globals from '../global';


@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(`${globals.APIS.USER_LIST}`).pipe(
      tap((data: any) => {
        return data
      }),
      catchError((e: any) => {
        return throwError(e)
      }),
    )
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${globals.APIS.CREATE_USER}`, data).pipe(
      tap((data: any) => {
        return data
      }),
      catchError((e: any) => {
        return throwError(e)
      }),
    )
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${globals.APIS.DELETE_USER}/${id}`).pipe(
      tap((data: any) => {
        return data
      }),
      catchError((e: any) => {
        return throwError(e)
      }),
    )
  }

  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`${globals.APIS.UPDATE_USER}/${id}`, data).pipe(
      tap((data: any) => {
        return data
      }),
      catchError((e: any) => {
        return throwError(e)
      }),
    )
  }

}
