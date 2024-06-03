import {PostDTO} from './postDTO';

export class NotificationDTO {
  id: number;
  postDTO: PostDTO;
  seen: boolean;
  createAt: string;
  unit: string;
  notificationName: string;
}
