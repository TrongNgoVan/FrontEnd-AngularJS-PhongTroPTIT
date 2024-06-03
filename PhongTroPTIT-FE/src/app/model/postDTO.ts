import {AccomodationDTO} from './accomodationDTO';
import {CommentDTO} from './commentDTO';
import {ImageResponse} from './imageResponse'
import {User} from './user';

export class PostDTO {
  id: number;
  title: string;
  content: string;
  approved: boolean;
  notApproved: boolean;
  createAt: string;
  lastUpdate: string;
  del: boolean;
  fullName: string;
  idUser: number;
  accomodationDTO: AccomodationDTO;
  commentDTOS: CommentDTO[];
  imageStrings: ImageResponse[];
  userDTO: User;
}
