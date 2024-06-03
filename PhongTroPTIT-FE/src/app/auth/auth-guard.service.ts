import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NbAuthService} from '@nebular/auth';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService,
              private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticatedOrRefresh()
      .pipe(tap(auth => {
        if (!auth) {
          this.router.navigate(['/home']);
        }
      }));
  }
}
