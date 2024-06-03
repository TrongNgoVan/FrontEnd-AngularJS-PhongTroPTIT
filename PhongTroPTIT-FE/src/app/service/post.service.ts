import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostDTO} from '../model/postDTO';
import {SearchForm} from '../model/searchForm';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = '/api';
  private searchUrl: string;

  constructor(private http: HttpClient) {
  }

  searchPost(searchForm: SearchForm, page: number, sort: number): Observable<PostDTO[]> {
    this.searchUrl = 'acreageStart=' + searchForm.acreageStart + '&acreageEnd=' + searchForm.acreageEnd
      + '&priceStart=' + searchForm.priceStart + '&priceEnd=' + searchForm.priceEnd;
    if (searchForm.idDistrict) {
      this.searchUrl += '&idDistrict=' + searchForm.idDistrict;
    }
    if (searchForm.motel) {
      this.searchUrl += '&motel=' + searchForm.motel;
    }
    return this.http.get<PostDTO[]>(this.apiUrl + '/posts/search?' + this.searchUrl + '&page=' + page + '&sort=' + sort);
  }

  searchPostByMaps(searchForm: SearchForm, page: number, sort: number): Observable<PostDTO[]> {
    this.searchUrl = 'acreageStart=' + searchForm.acreageStart + '&acreageEnd=' + searchForm.acreageEnd
      + '&priceStart=' + searchForm.priceStart + '&priceEnd=' + searchForm.priceEnd;
    if (searchForm.idDistrict) {
      this.searchUrl += '&idDistrict=' + searchForm.idDistrict;
    }
    if (searchForm.motel) {
      this.searchUrl += '&motel=' + searchForm.motel;
    }
    if (searchForm.xCoordinate && searchForm.yCoordinate && searchForm.radius) {
      this.searchUrl += '&xCoordinate=' + searchForm.xCoordinate + '&yCoordinate='
        + searchForm.yCoordinate + '&radius=' + searchForm.radius;
    }
    return this.http.get<PostDTO[]>(this.apiUrl + '/posts/searchbymaps?' + this.searchUrl + '&page=' + page + '&sort=' + sort);
  }

  getPostById(id: number): Observable<PostDTO> {
    return this.http.get<PostDTO>(this.apiUrl + '/post/' + id);
  }

  getAllPost(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(this.apiUrl + '/posts');
  }

  getPostByIdUser(idUser: number, page: number) {
    return this.http.get<PostDTO[]>(this.apiUrl + '/post/user/' + idUser + '?page=' + page);
  }

  getAllPostApproved(page: number): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(this.apiUrl + '/posts/approved/true' + '?page=' + page);
  }

  getMotelPost(page: number, sort: number): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(this.apiUrl + '/posts/motel/true' + '?page=' + page + '&sort=' + sort);
  }

  getHousePost(page: number, sort: number): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(this.apiUrl + '/posts/motel/false' + '?page=' + page + '&sort=' + sort);
  }

  createPost(postDTO: PostDTO): Observable<PostDTO> {
    return this.http.post<PostDTO>(this.apiUrl + '/post', postDTO);
  }

  updatePost(id: number, postDTO: PostDTO): Observable<PostDTO> {
    return this.http.put<PostDTO>(this.apiUrl + '/post/' + id, postDTO);
  }
}
