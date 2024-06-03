import {Component, OnInit} from '@angular/core';
import {PostService} from '../service/post.service';
import {PostDTO} from '../model/postDTO';
import {Router} from '@angular/router';
import {PaginationDTO} from '../model/paginationDTO';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  postDTOs: PostDTO[];
  errorMessage: '';
  paginationDTO = new PaginationDTO();
  totalElements: number;
  page = 1;

  constructor(private postService: PostService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllPost();
  }

  getAllPost() {
    this.postService.getAllPostApproved(this.page - 1).subscribe(
      data => {
        this.paginationDTO.content = data;
        this.postDTOs = this.paginationDTO.content.content;
        this.totalElements = this.paginationDTO.content.totalElements;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  navigateToDetail(postDTO: PostDTO) {
    this.router.navigate(['/post'], {queryParams: {id: postDTO.id}, skipLocationChange: false});
  }
}
