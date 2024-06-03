import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImageDTO} from '../model/ImageDTO';
import {Observable} from 'rxjs';
import {Image} from '../model/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {
  }

  addImageForPost(idPost: number, formData: FormData): Observable<ImageDTO[]> {
    return this.http.post<ImageDTO[]>(this.apiUrl + '/uploadImage/post/' + idPost, formData);
  }

  addImages(idPost: number, formData: FormData): Observable<ImageDTO[]> {
    return this.http.post<ImageDTO[]>(this.apiUrl + '/uploadMultipleFiles/post/' + idPost, formData);
  }

  getImageByteByIdPost(idPost: number): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiUrl + '/imageByte/post/' + idPost);
  }

  deleteAllImage(idPost: number) {
    return this.http.delete(this.apiUrl + '/deleteImage/post/' + idPost);
  }

  // deleteImage(listId: Array<string>): Observable<any> {
  //   let url = this.apiUrl + '/deleteImage?id=';
  //   for (const id of listId) {
  //     url += (id + ',');
  //   }
  //   url = url.substr(0, url.length - 1);
  //   console.log(url);
  //   return this.http.delete<any>(url);
  // }

}
