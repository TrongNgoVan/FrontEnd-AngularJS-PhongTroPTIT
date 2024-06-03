import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {SearchForm} from '../model/searchForm';
import {Options} from 'ng5-slider';
import {Router} from '@angular/router';
import {GeocodingApiServiceService} from '../service/geocoding-api-service.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MapsSearchComponent} from '../maps-search/maps-search.component';
import {DistrictService} from '../service/district.service';
import {DistrictDTO} from '../model/districtDTO';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  searchForm: SearchForm = new SearchForm();
  searchForm1: SearchForm = new SearchForm();
  districtDTOs: DistrictDTO[];
  priceOptions: Options = {
    floor: 0,
    ceil: 50,
    step: 0.5,
    noSwitching: true,
    hideLimitLabels: true,
    hidePointerLabels: true
  };

  acreageOptions: Options = {
    floor: 0,
    ceil: 1000,
    step: 5,
    noSwitching: true,
    hideLimitLabels: true,
    hidePointerLabels: true
  };

  address: string;
  zoom = 13;
  public innerWidth: any;
  dialogMapsSearch: MatDialogRef<MapsSearchComponent>;

  constructor(private router: Router,
              private districtService: DistrictService,
              private geocodingAPIService: GeocodingApiServiceService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.getDistrict();
    this.setValueSearchForm();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  openSearchMaps() {
    // this.display = 'block';
    this.dialogMapsSearch = this.dialog.open(MapsSearchComponent, {
      hasBackdrop: true,
      width: '1140px',
      height: '740px'
    });
  }

  setValueSearchForm() {
    this.searchForm.priceStart = this.searchForm1.priceStart = 0;
    this.searchForm.priceEnd = this.searchForm1.priceEnd = 50;
    this.searchForm.acreageStart = this.searchForm1.acreageStart = 0;
    this.searchForm.acreageEnd = this.searchForm1.acreageEnd = 1000;
    this.searchForm1.radius = 2;
    this.searchForm1.xCoordinate = 10.7756587;
    this.searchForm1.yCoordinate = 106.7004238;
  }

  navigateToSearchPage() {
    this.router.navigate(['/result'], {queryParams: {...this.searchForm, page: 1}, skipLocationChange: false});
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
}
