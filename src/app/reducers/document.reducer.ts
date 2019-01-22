import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Document } from '../models/document.model';
import {
  DocumentActions,
  DocumentActionTypes,
} from '../actions/document.actions';
import { CommentActions, CommentActionTypes } from '../actions/comment.actions';
import { ApiActions, ApiActionTypes } from '../actions/api.actions';

export interface State extends EntityState<Document> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Document> = createEntityAdapter<Document>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: DocumentActions | ApiActions,
): State {
  switch (action.type) {
    case DocumentActionTypes.AddDocument: {
      return adapter.addOne(action.payload.document, state);
    }

    case DocumentActionTypes.UpsertDocument: {
      return adapter.upsertOne(action.payload.document, state);
    }

    case DocumentActionTypes.AddDocuments: {
      return adapter.addMany(action.payload.documents, state);
    }

    case DocumentActionTypes.UpsertDocuments: {
      return adapter.upsertMany(action.payload.documents, state);
    }

    case DocumentActionTypes.UpdateDocument: {
      return adapter.updateOne(action.payload.document, state);
    }

    case DocumentActionTypes.UpdateDocuments: {
      return adapter.updateMany(action.payload.documents, state);
    }

    case DocumentActionTypes.DeleteDocument: {
      return adapter.removeOne(action.payload.id, state);
    }

    case DocumentActionTypes.DeleteDocuments: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case DocumentActionTypes.LoadDocuments: {
      return adapter.addAll(action.payload.documents, state);
    }

    case DocumentActionTypes.ClearDocuments: {
      return adapter.removeAll(state);
    }

    case ApiActionTypes.LoadCommentsSuccess: {
      const document: Document = state.entities[action.payload.documentId] || {
        id: action.payload.documentId,
      };
      document.commentIds = action.payload.comments.map(v => v.id);

      return adapter.upsertOne(document, state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectDocumentIds = selectIds;
export const selectDocumentEntities = selectEntities;
export const selectAllDocuments = selectAll;
export const selectDocumentTotal = selectTotal;
