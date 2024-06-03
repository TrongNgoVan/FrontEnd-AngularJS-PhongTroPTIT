import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {AccountService} from '../service/account.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user: User = new User();
  idUser: number;
  loading = false;
  disableSubmit = false;
  urlAvatar = '';
  uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  image;

  constructor(private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUserById();
  }

  getUserById() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idUser = params.id;
    });
    this.accountService.getUserById(this.idUser).subscribe(res => {
        this.user = res;
        if (this.user.b64) {
          this.urlAvatar = 'data:image;base64,' + this.user.b64;
        } else {
          this.urlAvatar = 'assets/avatar.svg';
        }
      }, error => {
        console.log(error.error.message);
      }
    );
  }

  submit() {
    this.loading = true;
    this.disableSubmit = true;
    this.accountService.updateProfile(this.user.id, this.user).subscribe(data => {
        this.dialog.closeAll();
      },
      error => {
        console.log(error.error.message);
      });
  }

  close() {
    this.dialog.closeAll();
  }

  changeUploader() {
    if (this.uploader.queue.length > 1) {
      this.uploader.queue[0].remove();
    } else {
      this.user.fileType = this.uploader.queue[0]._file.type;
      const file: File = this.uploader.queue[0]._file;
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.image = myReader.result.toString().replace('data:' + this.uploader.queue[0]._file.type + ';base64,', '');
        this.user.b64 = this.image;
      };

      myReader.readAsDataURL(file);
    }
  }

  deleteAvatar() {
    this.uploader.clearQueue();
    this.user.fileType = null;
    this.user.b64 = null;
    this.urlAvatar = 'assets/avatar.svg';
  }
}
