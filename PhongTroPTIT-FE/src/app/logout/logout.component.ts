import { Component, OnInit } from '@angular/core';
import {NbAuthResult, NbLogoutComponent} from '@nebular/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent extends NbLogoutComponent {

  // constructor() { }
  // gio chuyen huong
  logout(strategy: string): void {
    this.service.logout(strategy).subscribe((result: NbAuthResult) => {

      const redirect = '/home';
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }
}
