import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbLoginComponent} from '@nebular/auth';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {RegisterComponent} from '../register/register.component';
import {Location} from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {
  showLoadding = false;
  disableSubmit = false;
  wrongAccount = false;
  blockAccount = false;
  dialogRegister: MatDialogRef<RegisterComponent>;

  constructor(private dialog: MatDialog, authService: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) options: {},
              cd: ChangeDetectorRef, router: Router,
              private location: Location) {
    super(authService, options, cd, router);
  }

  submitLogin(signIn: NgForm) {
    if (signIn.valid) {
      this.login();
    }
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.wrongAccount = false;
    this.blockAccount = false;
    this.showLoadding = true;
    this.disableSubmit = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
        if (this.errors.toString() === 'Bad credentials') {
          this.wrongAccount = true;
        }
        if (this.errors.toString() === 'User account is locked') {
          this.blockAccount = true;
        }
        this.showLoadding = false;
        this.disableSubmit = false;
      }

      const redirect = this.location.path();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  submitRegister() {
    this.dialog.closeAll();
    this.dialogRegister = this.dialog.open(RegisterComponent, {
      hasBackdrop: true,
      maxHeight: '430px',
      width: '500px',
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
