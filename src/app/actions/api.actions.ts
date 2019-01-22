import { Action } from '@ngrx/store';
import { User } from '../models/user.model';
import { Document } from '../models/document.model';
import { Comment } from '../models/comment.model';

export enum ApiActionTypes {
  LoadDocuments = '[Api] Load Documents',
  LoadDocumentsSuccess = '[Api] Load DocumentsSuccess',
  LoadDocumentsFailure = '[Api] Load DocumentsFailure',
  LoadComments = '[Api] Load Comments',
  LoadCommentsSuccess = '[Api] Load CommentsSuccess',
  LoadCommentsFailure = '[Api] Load CommentsFailure',
}

export class LoadDocuments implements Action {
  readonly type = ApiActionTypes.LoadDocuments;
}

export class LoadDocumentsSuccess implements Action {
  readonly type = ApiActionTypes.LoadDocumentsSuccess;

  constructor(
    public payload: {
      documents: Document[];
      users: any[];
      // comments: any[];
    },
  ) {}
}

export class LoadDocumentsFailure implements Action {
  readonly type = ApiActionTypes.LoadDocumentsFailure;
}

export class LoadComments implements Action {
  readonly type = ApiActionTypes.LoadComments;

  constructor(public payload: { documentId: number }) {}
}

export class LoadCommentsSuccess implements Action {
  readonly type = ApiActionTypes.LoadCommentsSuccess;

  constructor(
    public payload: {
      documentId: number;
      comments: Comment[];
      users: User[];
    },
  ) {}
}

export class LoadCommentsFailure implements Action {
  readonly type = ApiActionTypes.LoadCommentsFailure;
}

export type ApiActions =
  | LoadDocuments
  | LoadDocumentsSuccess
  | LoadDocumentsFailure
  | LoadComments
  | LoadCommentsSuccess
  | LoadCommentsFailure;
