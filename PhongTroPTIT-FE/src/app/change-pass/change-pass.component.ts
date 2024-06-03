import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AccountService} from '../service/account.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  oldPasswordText = '';
  newPasswordText = '';
  confirmNewPasswordText = '';
  errorConfirm = false;
  idUser: number;
  wrongPass = false;
  success = false;
  loading = false;
  res: any;
  disableSubmit = false;

  constructor(private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private accountService: AccountService) {
  }

  ngOnInit() {
  }

  close() {
    this.dialog.closeAll();
  }

  submit() {
    if (this.newPasswordText !== this.confirmNewPasswordText) {
      this.errorConfirm = true;
    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        this.idUser = params.id;
      });
      this.errorConfirm = false;
      this.loading = true;
      this.disableSubmit = true;
      this.accountService.changePassword(this.idUser, this.newPasswordText, this.oldPasswordText).subscribe(
        data => {
          this.res = data;
          if (this.res.id) {
            this.success = true;
            this.loading = false;
          }
        }, error => {
          if (error.error.message === 'Mật khẩu không đúng') {
            this.wrongPass = true;
            this.loading = false;
            this.disableSubmit = false;
          }
        });
    }
  }
}
