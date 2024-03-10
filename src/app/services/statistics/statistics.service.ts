import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetStatisticsResponse } from '../../models/dtos/statistics-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private http: HttpClient) { }

  getAllOrganizationsStatistics(): Observable<GetStatisticsResponse[]> {
    return this.http.get<GetStatisticsResponse[]>(`${environment.apiBaseUrl}/Statistics/admin-statistics`);
  }
}
