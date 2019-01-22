import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromComment from './comment.reducer';
import * as fromDocument from './document.reducer';
import * as fromUser from './user.reducer';

export interface State {
  comment: fromComment.State;
  document: fromDocument.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  comment: fromComment.reducer,
  document: fromDocument.reducer,
  user: fromUser.reducer,
};

const selectUserState = createFeatureSelector<fromUser.State>('user');

const selectUserIds = createSelector(
  selectUserState,
  fromUser.selectUserIds,
);
const selectUserEntities = createSelector(
  selectUserState,
  fromUser.selectUserEntities,
);
const selectAllUsers = createSelector(
  selectUserState,
  fromUser.selectAllUsers,
);
const selectUserTotal = createSelector(
  selectUserState,
  fromUser.selectUserTotal,
);

const selectCommentState = createFeatureSelector<fromComment.State>('comment');

const selectCommentIds = createSelector(
  selectCommentState,
  fromComment.selectCommentIds,
);
const selectCommentEntities = createSelector(
  selectCommentState,
  fromComment.selectCommentEntities,
);
const selectAllComments = createSelector(
  selectCommentState,
  fromComment.selectAllComments,
);
const selectCommentTotal = createSelector(
  selectCommentState,
  fromComment.selectCommentTotal,
);

const selectDocumentState = createFeatureSelector<fromDocument.State>(
  'document',
);

const selectDocumentIds = createSelector(
  selectDocumentState,
  fromDocument.selectDocumentIds,
);
const selectDocumentEntities = createSelector(
  selectDocumentState,
  fromDocument.selectDocumentEntities,
);
const selectAllDocuments = createSelector(
  selectDocumentState,
  fromDocument.selectAllDocuments,
);
const selectDocumentTotal = createSelector(
  selectDocumentState,
  fromDocument.selectDocumentTotal,
);

export const getAllUsers = selectAllUsers;

export const getAllComments = createSelector(
  selectAllComments,
  getAllUsers,
  (comments, users) => {
    return comments.map(c => {
      const comment = {
        ...c,
        creator: users.find(v => v.id === c.creatorId),
      };
      delete comment.creatorId;
      return comment;
    });
  },
);

export const getAllDocuments = createSelector(
  selectAllDocuments,
  getAllUsers,
  getAllComments,
  (documents, users, comments) => {
    return documents.map(d => {
      const document = {
        ...d,
        creator: users[d.creatorId],
        comments: d.commentIds.map(id => comments.find(v => v.id === id)),
        sharedUsers: d.sharedUserIds.map(id => users.find(v => v.id === id)),
      };
      delete document.creatorId;
      delete document.commentIds;
      delete document.sharedUserIds;
      return document;
    });
  },
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
