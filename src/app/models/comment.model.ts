import { User, UserResponse } from './user.model';

export interface CommentResponse {
  id: number;
  body: string;
  user: UserResponse;
}

export interface Comment {
  id?: number;
  body?: string;
  creatorId?: number;
}
