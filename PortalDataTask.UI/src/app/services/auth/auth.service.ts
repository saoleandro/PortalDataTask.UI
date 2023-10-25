import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { LoginData } from './auth.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(login: any, password: any): Observable<LoginData> {
    let request = {
      "Login": login,
      "Password": password
    }

    return this.http.post<LoginData>(`${environment.baseApiUrl}/api/v1/auth`, request, this.getHeaderOption())
    .pipe(tap(data => { data }))
  }

  private handleError(error: any) : Promise<any>{
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  isLogged(): boolean {
    const token = window.localStorage.getItem('az-token');
    return token !== null && token !== undefined;
  }

  logout() {
    window.localStorage.removeItem('az-token');
    window.localStorage.removeItem('az-name');
  }
  
  getHeaderOption() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ''
      })
    }
  }
}
