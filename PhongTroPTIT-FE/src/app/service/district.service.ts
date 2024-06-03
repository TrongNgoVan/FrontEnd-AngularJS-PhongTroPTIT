import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DistrictDTO} from '../model/districtDTO';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getDistrict(): Observable<DistrictDTO[]> {
    return this.http.get<DistrictDTO[]>(this.apiUrl + '/districts');
  }
}
