import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../service/post.service';
import {PostDTO} from '../model/postDTO';
import {ToiletName} from '../model/ToiletName';
import {AccomodationDTO} from '../model/accomodationDTO';
import {CommentDTO} from '../model/commentDTO';
import {CommentService} from '../service/comment.service';
import {PaginationDTO} from '../model/paginationDTO';
import {User} from '../model/user';
import {NbAuthOAuth2JWTToken, NbAuthService} from '@nebular/auth';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {
  postDTO: PostDTO = new PostDTO();
  userDTO: User = new User();
  accomodationDTO: AccomodationDTO = new AccomodationDTO();
  paginationDTO = new PaginationDTO();
  commentDTOs: CommentDTO[];
  errorMessage: '';
  ToiletName = ToiletName;
  util = ' ';
  zoom = 15;
  idPost: number;
  page = 1;
  totalElements: number;
  commentDTO: CommentDTO = new CommentDTO();
  auth: User = new User();
  notFound = false;
  errorRate = false;
  public innerWidth: any;
  disableSubmit = false;
  idCommentEdit: number;

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private router: Router,
              private authService: NbAuthService,
              private commentService: CommentService) {
    this.activatedRoute.queryParams.subscribe(_ => {
      this.getUser();
      this.getPostById();
    });
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.getUser();
    this.getPostById();
  }

  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  navigateToUpdate(idPost: number) {
    this.router.navigate(['/update'], {queryParams: {id: idPost}, skipLocationChange: false});
  }

  getUser() {
    this.authService.onTokenChange().subscribe((token: NbAuthOAuth2JWTToken) => {
      if (token.isValid()) {
        this.auth = token.getPayload().account;
      }
    });
  }

  getPostById() {
    this.notFound = false;
    this.postDTO.userDTO = this.userDTO;
    this.postDTO.accomodationDTO = this.accomodationDTO;
    this.activatedRoute.queryParams.subscribe(params => {
      this.idPost = params.id;
    });
    this.postService.getPostById(this.idPost).subscribe(
      data => {
        this.postDTO = data;
        if (this.postDTO.notApproved || (this.postDTO.del && (this.auth.email !== this.postDTO.userDTO.email)) ||
          (!this.postDTO.approved && (this.auth.email !== this.postDTO.userDTO.email))) {
          this.notFound = true;
        } else {
          this.util = ' ';
          if (this.postDTO.accomodationDTO.parking) {
            this.util += 'Chỗ để xe';
          }
          if (this.postDTO.accomodationDTO.internet) {
            this.util += ', Internet';
          }
          if (this.postDTO.accomodationDTO.airConditioner) {
            this.util += ', Điều hòa';
          }
          if (this.postDTO.accomodationDTO.cableTV) {
            this.util += ', Truyền hình cáp';
          }
          if (this.postDTO.accomodationDTO.tv) {
            this.util += ', Tivi';
          }
          if (this.postDTO.accomodationDTO.heater) {
            this.util += ', Máy nước nóng';
          }
          if (this.util.startsWith(' , ')) {
            this.util = this.util.substring(2);
          }
        }
      },
      error => {
        this.errorMessage = error.error.message;
        this.notFound = true;
      }
    );
    this.getComment();
  }

  getComment() {
    this.commentService.getComment(this.idPost, this.page - 1).subscribe(
      data => {
        this.paginationDTO.content = data;
        this.commentDTOs = this.paginationDTO.content.content;
        this.totalElements = this.paginationDTO.content.totalElements;
        for (const comment of this.commentDTOs) {
          if (comment.userDTO.b64) {
            comment.userDTO.b64 = 'data:image;base64,' + comment.userDTO.b64;
          } else {
            comment.userDTO.b64 = 'assets/avatar.svg';
          }
        }
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  getPage(page: number) {
    this.page = page;
    this.getComment();
  }

  createComment(bl: NgForm) {
    if (this.commentDTO.rate === 0 || !this.commentDTO.rate) {
      this.errorRate = true;
    } else {
      this.disableSubmit = true;
      this.commentDTO.idPost = this.idPost;
      this.commentDTO.id = null;
      this.commentService.createComment(this.commentDTO).subscribe(
        data => {
          this.commentDTO = data;
          this.commentDTO.rate = 0;
          this.disableSubmit = false;
          bl.resetForm();
          this.getComment();
        }, error => {
          console.log(error.error.message);
        }
      );
    }
  }

  navigateToUser(idUser: number) {
    this.router.navigate(['/user'], {queryParams: {id: idUser}, skipLocationChange: false});
  }

  onRatingChange($event: any) {
    this.commentDTO.rate = $event.rating;
  }

  editComment(commentDTO: CommentDTO) {
    commentDTO.rate = this.commentDTO.rate;
    this.commentService.editComment(this.idCommentEdit, commentDTO).subscribe(
      data => {
        this.idCommentEdit = null;
        this.getComment();
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  change(commentDTO: CommentDTO) {
    this.idCommentEdit = commentDTO.id;
  }

  discardChange() {
    this.idCommentEdit = null;
    this.getComment();
  }

  delComment(id: number) {
    this.commentService.deleteComment(id).subscribe(
      data => {
        this.getComment();
      },
      error => {
        this.errorMessage = error.error.message;
        console.log(error);
      }
    );
  }
}
