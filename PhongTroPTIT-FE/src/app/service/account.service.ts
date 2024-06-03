import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Account} from '../model/account';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private API_URL = 'https://localhost:8080';

  constructor(private http: HttpClient) {
  }

  checkExistUser(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.API_URL + '/users/check' + '?email=' + email);
  }

  registerUserAccount(account: Account): Observable<User> {
    return this.http.post<User>(this.API_URL + '/users/', account);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.API_URL + '/users/' + id);
  }

  updateProfile(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.API_URL + '/users/' + id, user);
  }

  changePassword(id: number, newPass: string, oldPass: string): Observable<any> {
    return this.http.post<any>(this.API_URL + '/users/' + id + '/password?password=' + newPass + '&oldPassword=' + oldPass, '');
  }
}
