import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Status } from '../../models/statusmodel';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllStatus() : Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseApiUrl}/api/v1/categories`).pipe(
      tap(data => { data }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) : Promise<any>{
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}