import {User} from './user';

export class CommentDTO {
  id: number;
  content: string;
  lastUpdate: string;
  idPost: number;
  userDTO: User;
  rate: number;
}
