import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataTask } from '../../models/dataTask.model';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataTasksService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllDataTasks() : Observable<DataTask[]> { 
    return this.http.get<DataTask[]>(`${this.baseApiUrl}/api/v1/dataTasks`, this.getHeaderOption())
    .pipe(tap(data => { data }))
  }

  getDataTasksById(id: any) : Observable<DataTask> { 
    return this.http.get<DataTask>(`${this.baseApiUrl}/api/v1/dataTasks/${id}`, this.getHeaderOption())
    .pipe(tap(data => { data }))
  }

  deleteTaskById(id: any) : Observable<any>{
    return this.http.delete(`${this.baseApiUrl}/api/v1/dataTasks/${id}`, this.getHeaderOption())
    .pipe(tap(data => { data }))
  }

  private handleError(error: any) : Promise<any>{
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getHeaderOption() {
    return {
        headers: new HttpHeaders({
        'Content-Type': 'application/json' //,
        //'Authorization': `Bearer ${window.localStorage.getItem('az-token')}`
      })
    }
  }

  save(dataTask: DataTask) : Observable<DataTask>{
    let request = {
      "Id": dataTask.id,
      "Description" : dataTask.description,
      "ValidateDate":  dataTask.validateDate,
      "Status" : dataTask.status
    }
    if(dataTask.id != 0 && dataTask.id != undefined){
      return this.http.put<DataTask>(`${environment.baseApiUrl}/api/v1/dataTasks/${dataTask.id}`, request, this.getHeaderOption())
        .pipe(tap(data => { data }));
      }
    else{
      return this.http.post<DataTask>(`${environment.baseApiUrl}/api/v1/dataTasks`, request, this.getHeaderOption())
        .pipe(tap(data => { data }));
      }
  }
}