import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Comment, CommentResponse } from '../models/comment.model';
import { mockUsers, normalizeUser } from './user.service';
import { User } from '../models/user.model';
import { tap, map } from 'rxjs/operators';

export const mockComments: CommentResponse[] = [
  {
    id: 1,
    body: 'This is a comment. documentId 1, commentId 1',
    user: mockUsers[0],
  },
  {
    id: 2,
    body: 'This is a comment. documentId 1, commentId 2',
    user: mockUsers[1],
  },
  {
    id: 3,
    body: 'This is a comment. documentId 1, commentId 3',
    user: mockUsers[0],
  },
  {
    id: 4,
    body: 'This is a comment. documentId 1, commentId 4',
    user: mockUsers[2],
  },
  {
    id: 5,
    body: 'This is a comment. documentId 2, commentId 5',
    user: mockUsers[4],
  },
  {
    id: 6,
    body: 'This is a comment. documentId 2, commentId 6',
    user: mockUsers[0],
  },
  {
    id: 7,
    body: 'This is a comment. documentId 2, commentId 7',
    user: mockUsers[0],
  },
  {
    id: 8,
    body: 'This is a comment. documentId 2, commentId 8',
    user: mockUsers[4],
  },
];

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}

  getComments(documentId: number) {
    switch (documentId) {
      case 1: {
        return of([
          mockComments[0],
          mockComments[1],
          mockComments[2],
          mockComments[3],
        ]).pipe(
          tap(r => console.info(r)),
          map(res => res.map(v => normalizeComment(v))),
          map(res => ({
            comments: res.map(v => v.comment),
            users: res.map(v => v.user),
          })),
        );
      }
      case 2: {
        return of([
          mockComments[4],
          mockComments[5],
          mockComments[6],
          mockComments[7],
        ]).pipe(
          tap(r => console.info(r)),
          map(res => res.map(v => normalizeComment(v))),
          map(res => ({
            comments: res.map(v => v.comment),
            users: res.map(v => v.user),
          })),
        );
      }
    }
  }
}

export function normalizeComment(
  comment: CommentResponse,
): {
  comment: Comment;
  user: User;
} {
  const normalizedComment: Comment = {
    id: comment.id,
    body: comment.body,
    creatorId: comment.user.id,
  };

  const normalizedUser = normalizeUser(comment.user);

  return {
    comment: normalizedComment,
    user: normalizedUser,
  };
}
