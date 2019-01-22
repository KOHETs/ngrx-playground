import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Comment } from '../models/comment.model';
import { Document, DocumentResponse } from '../models/document.model';
import { User } from '../models/user.model';
import { mockUsers, normalizeUser } from './user.service';

const mockDocuments: DocumentResponse[] = [
  {
    id: 1,
    title: 'Test Document 1',
    body: 'This is a test document. documentId 1',
    createdBy: mockUsers[0],
    // comments: [
    //   mockComments[0],
    //   mockComments[1],
    //   mockComments[2],
    //   mockComments[3],
    // ],
    shared_users: [mockUsers[1], mockUsers[2], mockUsers[3]],
  },
  {
    id: 2,
    title: 'Test Document 2',
    body: 'This is a test document. documentId 2',
    createdBy: mockUsers[4],
    // comments: [
    //   mockComments[4],
    //   mockComments[5],
    //   mockComments[6],
    //   mockComments[7],
    // ],
    shared_users: [mockUsers[0]],
  },
];

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor() {}

  getDocumentList() {
    return of(mockDocuments).pipe(
      tap(r => console.info(r)),
      map(res => res.map(v => normalizeDocument(v))),
      map(res => ({
        documents: res.map(v => v.document),
        users: [].concat(...res.map(v => v.users)),
        // comments: [].concat(...res.map(v => v.comments)),
      })),
    );
  }

  getDocument(id: number) {
    return of(mockDocuments[id]);
  }
}

export function normalizeDocument(
  document: DocumentResponse,
): {
  document: Document;
  users: User[];
  // comments: Comment[];
} {
  const normalizedDocument: Document = {
    id: document.id,
    title: document.title,
    body: document.body,
    creatorId: document.createdBy.id,
    // commentIds: document.comments.map(v => v.id),
    sharedUserIds: document.shared_users.map(v => v.id),
  };

  const normalizedUsers = [document.createdBy, ...document.shared_users].map(
    v => normalizeUser(v),
  );

  // const normalizedComments = [...document.comments].map(v =>
  //   normalizeComment(v),
  // );

  return {
    document: normalizedDocument,
    users: [...normalizedUsers],
    // users: [...normalizedUsers, ...normalizedComments.map(v => v.user)],
    // comments: normalizedComments.map(v => v.comment),
  };
}
