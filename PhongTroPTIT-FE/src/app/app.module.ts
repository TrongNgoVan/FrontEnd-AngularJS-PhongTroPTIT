import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpRequest} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {HomePageComponent} from './home-page/home-page.component';
import {TruncatePipe} from './pipe/TruncatePipe';
import {SearchComponent} from './search/search.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCheckboxModule, MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
import {MatTabsModule} from '@angular/material';
import {Ng5SliderModule} from 'ng5-slider';
import {OnlynumberDirective} from './directive/onlynumber.directive';
import {FooterComponent} from './footer/footer.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {AgmCoreModule} from '@agm/core';
import {DetailPostComponent} from './detail-post/detail-post.component';
import {MotelPageComponent} from './motel-page/motel-page.component';
import {HousePageComponent} from './house-page/house-page.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';
import {MediaPreviewDirective} from './directive/MediaPreview.directive';
import {UpdatePostComponent} from './update-post/update-post.component';
import {CounterDirective} from './directive/Counter.directive';
import {NgxPaginationModule} from 'ngx-pagination';
import {UserPageComponent} from './user-page/user-page.component';
import {
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthJWTInterceptor,
  NbAuthModule, NbAuthOAuth2JWTToken,
  NbOAuth2AuthStrategy, NbOAuth2AuthStrategyOptions,
  NbOAuth2ClientAuthMethod, NbOAuth2GrantType
} from '@nebular/auth';
import {NB_WINDOW} from '@nebular/theme';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RegisterComponent} from './register/register.component';
import {MapsSearchComponent} from './maps-search/maps-search.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {ChangePassComponent} from './change-pass/change-pass.component';
import {NotfoundPageComponent} from './notfound-page/notfound-page.component';
import {AuthGuard} from './auth/auth-guard.service';
import {StarRatingModule} from 'angular-star-rating';
import {AutofocusDirective} from './directive/AutoFocus.directive';
import { NotificationComponent } from './notification/notification.component';
import {SafeHtml} from './pipe/SafeHtml';
import { CreateCriteriaComponent } from './create-criteria/create-criteria.component';

const authConfig: NbOAuth2AuthStrategyOptions = {
  name: 'userpass',
  baseEndpoint: 'http://localhost:8080',
  clientId: 'clientIdPassword',
  clientSecret: '123',
  clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
  token: {
    endpoint: '/oauth/token',
    grantType: NbOAuth2GrantType.PASSWORD,
    class: NbAuthOAuth2JWTToken,
    // scope: 'read',
    requireValidToken: true
  },
  refresh: {
    endpoint: '/oauth/token',
    grantType: NbOAuth2GrantType.REFRESH_TOKEN,
    requireValidToken: true
  },
};

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    TruncatePipe,
    SafeHtml,
    SearchComponent,
    OnlynumberDirective,
    MediaPreviewDirective,
    CounterDirective,
    AutofocusDirective,
    FooterComponent,
    CreatePostComponent,
    DetailPostComponent,
    MotelPageComponent,
    HousePageComponent,
    SearchPageComponent,
    UpdatePostComponent,
    UserPageComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    MapsSearchComponent,
    UpdateUserComponent,
    ChangePassComponent,
    NotfoundPageComponent,
    NotificationComponent,
    CreateCriteriaComponent,
  ],
  imports: [
    MatExpansionModule,
    FileUploadModule,
    StarRatingModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup(authConfig)

      ],
      forms: {
        login: {
          redirect: '/',
          redirectDelay: 0,
          strategy: 'userpass',
          rememberMe: true,
          showMessages: {
            success: true,
            error: true,
          },
        },
        logout: {
          redirect: '/login',
          redirectDelay: 10,
          strategy: 'userpass'
        }
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCsT_O-XMJwHBfETVpFVFA_lLz0pG31r0'
    }),
    NgxPaginationModule,
    AngularEditorModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    Ng5SliderModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
  ],
  providers: [
    AuthGuard,
    {provide: NB_WINDOW, useValue: window},
    {provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    {
      provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: (req: HttpRequest<any>) => {
        return (req.url.indexOf('oauth/token') >= 0 && req.body != null
          && JSON.stringify(req.body).indexOf('grant_type=') >= 0) || req.url.indexOf('https://maps.googleapis.com/') >= 0;
      }
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent, MapsSearchComponent, UpdateUserComponent, ChangePassComponent, CreateCriteriaComponent]
})
export class AppModule {
}
