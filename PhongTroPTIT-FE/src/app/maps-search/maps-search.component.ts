import {Component, HostListener, OnInit} from '@angular/core';
import {SearchForm} from '../model/searchForm';
import {Options} from 'ng5-slider';
import {Router} from '@angular/router';
import {GeocodingApiServiceService} from '../service/geocoding-api-service.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-maps-search',
  templateUrl: './maps-search.component.html',
  styleUrls: ['./maps-search.component.scss']
})
export class MapsSearchComponent implements OnInit {
  searchForm1: SearchForm = new SearchForm();
  priceOptions1: Options = {
    floor: 0,
    ceil: 50,
    step: 0.5,
    noSwitching: true,
    hideLimitLabels: true,
    hidePointerLabels: true
  };
  acreageOptions1: Options = {
    floor: 0,
    ceil: 1000,
    step: 5,
    noSwitching: true,
    hideLimitLabels: true,
    hidePointerLabels: true
  };
  address: string;
  zoom = 13;
  lat = 10.7756587;
  lng = 106.7004238;
  innerWidth: any;


  constructor(private router: Router,
              private geocodingAPIService: GeocodingApiServiceService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.setValueSearchForm();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  setValueSearchForm() {
    this.searchForm1.priceStart = 0;
    this.searchForm1.priceEnd = 50;
    this.searchForm1.acreageStart = 0;
    this.searchForm1.acreageEnd = 1000;
    this.searchForm1.radius = 2;
    this.searchForm1.xCoordinate = 10.7756587;
    this.searchForm1.yCoordinate = 106.7004238;
  }

  navigateToSearchPage1() {
    this.close();
    this.router.navigate(['/result'], {queryParams: {...this.searchForm1, page: 1}, skipLocationChange: false});
  }

  mapClicked($event: any) {
    this.searchForm1.xCoordinate = $event.coords.lat;
    this.searchForm1.yCoordinate = $event.coords.lng;
  }

  markerDragEnd($event: any) {
    this.searchForm1.xCoordinate = $event.coords.lat;
    this.searchForm1.yCoordinate = $event.coords.lng;
  }

  updateLatLngFromAddress() {
    this.geocodingAPIService
      .findFromAddress(this.address).subscribe(response => {
      if (response.status === 'OK') {
        this.lat = response.results[0].geometry.location.lat;
        this.lng = response.results[0].geometry.location.lng;
        this.searchForm1.xCoordinate = response.results[0].geometry.location.lat;
        this.searchForm1.yCoordinate = response.results[0].geometry.location.lng;
        console.log('GEO ' + this.lat);
        console.log('GEO ' + this.lng);
      } else if (response.status === 'ZERO_RESULTS') {
        console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
      } else {
        console.log('geocodingAPIService', 'Other error', response.status);
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
