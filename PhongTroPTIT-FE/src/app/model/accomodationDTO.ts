import {PostDTO} from './postDTO';

export class AccomodationDTO {
  id: number;
  acreage: number;
  address: string;
  electricPrice: number;
  waterPrice: number;
  internet: boolean;
  parking: boolean;
  airConditioner: boolean;
  heater: boolean;
  cableTV: boolean;
  tv: boolean;
  toilet: string;
  price: number;
  motel: boolean;
  status: boolean;
  xCoordinate: number;
  yCoordinate: number;
  postDTO: PostDTO;
  idDistrict: number;
}
