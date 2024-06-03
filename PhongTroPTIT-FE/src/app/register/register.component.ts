import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {Account} from '../model/account';
import {AccountService} from '../service/account.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  account: Account = new Account();
  disableSubmit = false;
  alreadyEmail = false;
  success = false;
  type = 'password';
  show = false;

  constructor(private dialog: MatDialog,
              private accountService: AccountService) {
  }

  ngOnInit() {
  }

  showHidePass() {
    this.show = !this.show;
    if (this.show) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  submitRegister(signUp: NgForm) {
    if (signUp.valid) {
      this.disableSubmit = true;
      this.accountService.checkExistUser(this.account.email).subscribe(res => {
        if (res) {
          this.alreadyEmail = res;
        } else {
          this.accountService.registerUserAccount(this.account).subscribe(account => {
            if (account.email) {
              this.success = true;
            }
          });
        }
        this.disableSubmit = false;
      });
    }
  }

  login() {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      hasBackdrop: true,
      maxHeight: '370px',
      width: '500px',
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
