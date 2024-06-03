import {DistrictDTO} from './districtDTO';

export class CriteriaDTO {
  id: number;
  motel: boolean;
  priceStart: number;
  priceEnd: number;
  acreageStart: number;
  acreageEnd: number;
  districtDTO: DistrictDTO;
  stop: boolean;
  createAt: string;
}
