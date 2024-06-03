import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbAuthOAuth2JWTToken, NbAuthService} from '@nebular/auth';
import {MatDialog, MatDialogRef} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {User} from '../model/user';
import {RegisterComponent} from '../register/register.component';
import {NotificationService} from '../service/notification.service';
import {PaginationDTO} from '../model/paginationDTO';
import {NotificationDTO} from '../model/notificationDTO';
import {PostDTO} from '../model/postDTO';
import * as moment from 'moment';
import {NotificationName} from '../model/NotificationName';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  dialogLogin: MatDialogRef<LoginComponent>;
  dialogRegister: MatDialogRef<RegisterComponent>;
  user: User;
  paginationDTO = new PaginationDTO();
  notificationDTOs: NotificationDTO[];
  page = 0;
  notiName = NotificationName;
  showLoadding = false;
  noti = false;
  totalElements: number;

  constructor(public dialog: MatDialog,
              private authService: NbAuthService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthOAuth2JWTToken) => {
      if (token.isValid()) {
        this.getNotificationByEmail();
        this.user = token.getPayload().account;
        this.dialog.closeAll();
      }
    });
  }

  navigateToCreatePost() {
    if (this.user) {
      this.router.navigate(['/create-post']);
    } else {
      this.dialogLogin = this.dialog.open(LoginComponent, {
        hasBackdrop: true,
        maxHeight: '370px',
        width: '500px',
      });
    }
  }

  navigateToUser(idUser: number) {
    this.router.navigate(['/user'], {queryParams: {id: idUser}, skipLocationChange: false});
  }

  login() {
    this.dialogLogin = this.dialog.open(LoginComponent, {
      hasBackdrop: true,
      maxHeight: '370px',
      width: '500px',
    });
  }

  register() {
    this.dialogRegister = this.dialog.open(RegisterComponent, {
      hasBackdrop: true,
      maxHeight: '430px',
      width: '500px',
    });
  }

  getNotificationByEmail() {
    this.showLoadding = true;
    this.notificationService.getNotificationByEmail(this.page, false).subscribe(
      data => {
        this.paginationDTO.content = data;
        this.notificationDTOs = this.paginationDTO.content.content;
        this.totalElements = this.paginationDTO.content.totalElements;
        for (const notificationDTO of this.notificationDTOs) {
          if (!notificationDTO.seen) {
            this.noti = true;
          }
          if (notificationDTO.postDTO.userDTO.b64) {
            notificationDTO.postDTO.userDTO.b64 = 'data:image;base64,'
              + notificationDTO.postDTO.userDTO.b64;
          } else {
            notificationDTO.postDTO.userDTO.b64 = 'assets/avatar.svg';
          }
          const a = new Date();
          const date: number = moment(notificationDTO.createAt, 'YYYY-MM-DDTHH:mm:ss').valueOf();
          const b = (a.getTime() - date) / 1000;
          if (b < 3600) {
            notificationDTO.createAt = (Math.floor(b / 60)).toString();
            notificationDTO.unit = 'phút';
          } else if (b >= 3600 && b < 86400) {
            notificationDTO.createAt = (Math.floor(b / 3600)).toString();
            notificationDTO.unit = 'giờ';
          } else if (b >= 86400 && b < 2628000) {
            notificationDTO.createAt = (Math.floor(b / 86400)).toString();
            notificationDTO.unit = 'ngày';
          } else if (b >= 2628000 && b < 31536000) {
            notificationDTO.createAt = (Math.floor(b / 2628000)).toString();
            notificationDTO.unit = 'tháng';
          } else {
            notificationDTO.createAt = (Math.floor(b / 31536000)).toString();
            notificationDTO.unit = 'năm';
          }
        }
        this.showLoadding = false;
      }, error => {
        console.log(error.error.message);
      }
    );
  }

  seen(notificationDTO: NotificationDTO) {
    if (!notificationDTO.seen) {
      this.notificationService.seenNotification(notificationDTO.id).subscribe(
        data => {
          this.getNotificationByEmail();
        },
        error => {
          console.log(error.error.message);
        }
      );
    }
  }

  navigateToDetail(postDTO: PostDTO) {
    this.router.navigate(['/post'], {queryParams: {id: postDTO.id}, skipLocationChange: false});
  }
}
