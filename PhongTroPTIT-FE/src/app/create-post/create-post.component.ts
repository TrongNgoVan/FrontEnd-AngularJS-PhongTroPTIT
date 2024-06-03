import {Component, HostListener, OnInit} from '@angular/core';
import {PostDTO} from '../model/postDTO';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {AccomodationDTO} from '../model/accomodationDTO';
import {GeocodingApiServiceService} from '../service/geocoding-api-service.service';
import {PostService} from '../service/post.service';
import {FileUploader} from 'ng2-file-upload';
import {ImageService} from '../service/image.service';
import {ImageDTO} from '../model/ImageDTO';
import {Router} from '@angular/router';
import {NbAuthOAuth2JWTToken, NbAuthService} from '@nebular/auth';
import {User} from '../model/user';
import {DistrictService} from '../service/district.service';
import {DistrictDTO} from '../model/districtDTO';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postDTO: PostDTO = new PostDTO();
  postTest: PostDTO = new PostDTO();
  imageDTO: ImageDTO[] = new Array();
  errorMessage: '';
  accomodationDTO: AccomodationDTO = new AccomodationDTO();
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Nhập nội dung ở đây...',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  zoom = 13;
  lat = 10.776111;
  lng = 106.695833;

  public innerWidth: any;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  showError = false;
  showRequired = false;
  showNoti = false;
  disableSubmit = false;
  showLoadding = false;
  user: User;
  districtDTOs: DistrictDTO[];
  motel: number;

  constructor(private geocodingApiService: GeocodingApiServiceService,
              private postService: PostService,
              private imageService: ImageService,
              private districtService: DistrictService,
              private authService: NbAuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.setValue();
    this.getDistrict();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  onSubmit() {
    if (this.uploader.queue.length !== 0) {
      this.createPost();
    }
  }

  getDistrict() {
    this.districtService.getDistrict().subscribe(
      data => {
        this.districtDTOs = data;
      },
      error => {
        console.log(error.error.message);
      }
    );
  }

  setValue() {
    this.postDTO.accomodationDTO = this.accomodationDTO;
    this.postDTO.accomodationDTO.waterPrice = this.postDTO.accomodationDTO.electricPrice = 0;
    // this.postDTO.idUser = this.user.id;
  }

  mapClicked($event: any) {
    this.postDTO.accomodationDTO.xCoordinate = $event.coords.lat;
    this.postDTO.accomodationDTO.yCoordinate = $event.coords.lng;
  }

  markerDragEnd($event: any) {
    this.postDTO.accomodationDTO.xCoordinate = $event.coords.lat;
    this.postDTO.accomodationDTO.yCoordinate = $event.coords.lng;
  }

  updateLatLngFromAddress() {
    this.geocodingApiService
      .findFromAddress(this.postDTO.accomodationDTO.address).subscribe(response => {
      if (response.status === 'OK') {
        this.postDTO.accomodationDTO.xCoordinate = response.results[0].geometry.location.lat;
        this.postDTO.accomodationDTO.yCoordinate = response.results[0].geometry.location.lng;
      } else if (response.status === 'ZERO_RESULTS') {
        console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
      } else {
        console.log('geocodingAPIService', 'Other error', response.status);
      }
    });
  }

  createPost() {
    this.disableSubmit = true;
    this.showLoadding = true;
    if (parseFloat(String(this.motel)) === 1) {
      this.postDTO.accomodationDTO.motel = true;
    } else {
      this.postDTO.accomodationDTO.motel = false;
    }
    this.postService.createPost(this.postDTO).subscribe(
      data => {
        this.postTest = data;
        this.addImageForPost(this.postTest.id);
      },
      error => {
        this.errorMessage = error;
        console.log(this.errorMessage);
      }
    );
  }

  addImageForPost(id: number) {
    if (id != null) {
      for (const uploader of this.uploader.queue) {
        const formData = new FormData();
        const fileItem = uploader._file;
        formData.append('file', fileItem);
        this.imageService.addImageForPost(id, formData).subscribe(
          data => {
            this.imageDTO = data;
            if (this.imageDTO) {
              this.showNoti = true;
              this.showLoadding = false;
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 5000);
            }
          },
          error => {
            this.errorMessage = error.error.message;
            console.log(this.errorMessage);
          }
        );
      }
    } else {
      this.showError = true;
    }
  }

  ClickedOut(event) {
    if (event.target.className === 'modal fade show') {
      this.showError = false;
      this.showRequired = false;
    }
  }
}
