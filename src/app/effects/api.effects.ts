import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concatMap, flatMap, map } from 'rxjs/operators';
import * as ApiActions from '../actions/api.actions';
import { UpsertComments } from '../actions/comment.actions';
import { UpsertDocuments } from '../actions/document.actions';
import { UpsertUsers } from '../actions/user.actions';
import { CommentService } from '../services/comment.service';
import { DocumentService } from '../services/document.service';

@Injectable()
export class ApiEffects {
  @Effect()
  loadDocuments = this.actions$.pipe(
    ofType<ApiActions.LoadDocuments>(ApiActions.ApiActionTypes.LoadDocuments),
    concatMap(() =>
      this.documentService
        .getDocumentList()
        .pipe(map(res => new ApiActions.LoadDocumentsSuccess(res))),
    ),
  );

  @Effect()
  loadDocumentsSuccess = this.actions$.pipe(
    ofType<ApiActions.LoadDocumentsSuccess>(
      ApiActions.ApiActionTypes.LoadDocumentsSuccess,
    ),
    map(action => action.payload),
    flatMap(res => [
      new UpsertDocuments({
        documents: res.documents,
      }),
      new UpsertUsers({
        users: res.users,
      }),
      // new UpsertComments({
      //   comments: res.comments,
      // }),
    ]),
  );

  @Effect()
  loadComments = this.actions$.pipe(
    ofType<ApiActions.LoadComments>(ApiActions.ApiActionTypes.LoadComments),
    map(action => action.payload.documentId),
    concatMap(documentId =>
      this.commentService
        .getComments(documentId)
        .pipe(
          map(
            res => new ApiActions.LoadCommentsSuccess({ documentId, ...res }),
          ),
        ),
    ),
  );

  @Effect()
  loadCommentsSuccess = this.actions$.pipe(
    ofType<ApiActions.LoadCommentsSuccess>(
      ApiActions.ApiActionTypes.LoadCommentsSuccess,
    ),
    map(action => action.payload),
    flatMap(res => [
      new UpsertComments({
        comments: res.comments,
      }),
      new UpsertUsers({
        users: res.users,
      }),
    ]),
  );

  constructor(
    private actions$: Actions,
    private documentService: DocumentService,
    private commentService: CommentService,
  ) {}
}
