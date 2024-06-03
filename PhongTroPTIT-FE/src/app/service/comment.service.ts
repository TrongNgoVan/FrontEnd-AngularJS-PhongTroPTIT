import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentDTO} from '../model/commentDTO';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {
  }

  getComment(idPost: number, page: number): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(this.apiUrl + '/comments/post/' + idPost + '?page=' + page);
  }

  createComment(commentDTO: CommentDTO): Observable<CommentDTO> {
    return this.http.post<CommentDTO>(this.apiUrl + '/comment/post', commentDTO);
  }

  editComment(id: number, commentDTO: CommentDTO): Observable<CommentDTO> {
    return this.http.put<CommentDTO>(this.apiUrl + '/comment/' + id, commentDTO);
  }

  deleteComment(id: number): Observable<string> {
    return this.http.delete<string>(this.apiUrl + '/comment/' + id);
  }
}
