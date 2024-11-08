import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private apiUrl = 'http://localhost:3000/query';

  constructor(private http: HttpClient) {}

  getQueryResult(query: string): Observable<any> {
    return this.http.post(this.apiUrl, { query });
  }
}
