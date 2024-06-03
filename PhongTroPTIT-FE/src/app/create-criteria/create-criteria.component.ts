import {Component, HostListener, OnInit} from '@angular/core';
import {DistrictDTO} from '../model/districtDTO';
import {Options} from 'ng5-slider';
import {CriteriaDTO} from '../model/criteriaDTO';
import {DistrictService} from '../service/district.service';
import {MatDialog} from '@angular/material';
import {CriteriaService} from '../service/criteria.service';

@Component({
  selector: 'app-create-criteria',
  templateUrl: './create-criteria.component.html',
  styleUrls: ['./create-criteria.component.scss']
})
export class CreateCriteriaComponent implements OnInit {
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
  criteriaDTO = new CriteriaDTO();
  districtDTO = new DistrictDTO();
  motel: number;
  public innerWidth: any;
  showLoadding = false;

  constructor(private districtService: DistrictService,
              private criteriaService: CriteriaService,
              private dialog: MatDialog) {
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
    this.criteriaDTO.districtDTO = this.districtDTO;
    this.criteriaDTO.priceStart = this.criteriaDTO.acreageStart = 0;
    this.criteriaDTO.priceEnd = 50;
    this.criteriaDTO.acreageEnd = 1000;
  }

  createCriteria() {
    this.showLoadding = true;
    console.log(this.criteriaDTO);
    if (this.motel === 1) {
      this.criteriaDTO.motel = true;
    } else {
      this.criteriaDTO.motel = false;
    }
    this.criteriaService.createCriteria(this.criteriaDTO).subscribe(
      data => {
        this.criteriaDTO = data;
        this.dialog.closeAll();
      },
      error => {
        console.log(error.error.message);
      }
    );
  }

  close() {
    this.dialog.closeAll();
  }
}
