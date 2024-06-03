import {Component, HostListener, OnInit} from '@angular/core';
import {PostDTO} from '../model/postDTO';
import {PostService} from '../service/post.service';
import {ToiletName} from '../model/ToiletName';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationDTO} from '../model/paginationDTO';

@Component({
  selector: 'app-house-page',
  templateUrl: './house-page.component.html',
  styleUrls: ['./house-page.component.scss']
})
export class HousePageComponent implements OnInit {
  public innerWidth: any;
  postDTOs: PostDTO[];
  errorMessage: '';
  KHEP_KIN = ToiletName.KHEP_KIN;
  paginationDTO = new PaginationDTO();
  totalElements: number;
  page = 1;
  sort = 5;
  notFound = false;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  getHousePost() {
    this.postService.getHousePost(this.page - 1, this.sort).subscribe(
      data => {
        this.paginationDTO.content = data;
        this.postDTOs = this.paginationDTO.content.content;
        this.totalElements = this.paginationDTO.content.totalElements;
      },
      error => {
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
      }
    );
  }

  init() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.page = params.page;
      if (parseInt(String(this.page), 10) !== 0) {
        this.getHousePost();
      } else {
        this.notFound = true;
      }
    });
  }

  getPage(page: number) {
    this.router.navigate(['/house'], {queryParams: {page}});
  }

  navigateToDetail(postDTO: PostDTO) {
    this.router.navigate(['/post'], {queryParams: {id: postDTO.id}, skipLocationChange: false});
  }
}
