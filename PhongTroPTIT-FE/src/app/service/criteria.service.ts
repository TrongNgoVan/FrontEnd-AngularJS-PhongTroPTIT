import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CriteriaDTO} from '../model/criteriaDTO';

@Injectable({
  providedIn: 'root'
})
export class CriteriaService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {
  }

  getCriteria(page: number, all: boolean): Observable<CriteriaDTO[]> {
    return this.http.get<CriteriaDTO[]>(this.apiUrl + '/criterias?page=' + page + '&all=' + all);
  }

  stopCriteria(idCriteria: number): Observable<CriteriaDTO> {
    return this.http.put<CriteriaDTO>(this.apiUrl + '/criteria/stop/' + idCriteria, null);
  }

  startCriteria(idCriteria: number): Observable<CriteriaDTO> {
    return this.http.put<CriteriaDTO>(this.apiUrl + '/criteria/start/' + idCriteria, null);
  }

  createCriteria(criteriaDTO: CriteriaDTO): Observable<CriteriaDTO> {
    return this.http.post<CriteriaDTO>(this.apiUrl + '/criteria', criteriaDTO);
  }
}
