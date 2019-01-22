import { User, UserResponse } from './user.model';
import { CommentResponse } from './comment.model';

export interface DocumentResponse {
  id: number;
  title: string;
  body: string;
  createdBy: UserResponse;
  comments?: CommentResponse[];
  shared_users: UserResponse[];
}

export interface Document {
  id?: number;
  title?: string;
  body?: string;
  creatorId?: number;
  commentIds?: number[];
  sharedUserIds?: number[];
}
