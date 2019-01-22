import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Document } from '../models/document.model';

export enum DocumentActionTypes {
  LoadDocuments = '[Document] Load Documents',
  AddDocument = '[Document] Add Document',
  UpsertDocument = '[Document] Upsert Document',
  AddDocuments = '[Document] Add Documents',
  UpsertDocuments = '[Document] Upsert Documents',
  UpdateDocument = '[Document] Update Document',
  UpdateDocuments = '[Document] Update Documents',
  DeleteDocument = '[Document] Delete Document',
  DeleteDocuments = '[Document] Delete Documents',
  ClearDocuments = '[Document] Clear Documents'
}

export class LoadDocuments implements Action {
  readonly type = DocumentActionTypes.LoadDocuments;

  constructor(public payload: { documents: Document[] }) {}
}

export class AddDocument implements Action {
  readonly type = DocumentActionTypes.AddDocument;

  constructor(public payload: { document: Document }) {}
}

export class UpsertDocument implements Action {
  readonly type = DocumentActionTypes.UpsertDocument;

  constructor(public payload: { document: Document }) {}
}

export class AddDocuments implements Action {
  readonly type = DocumentActionTypes.AddDocuments;

  constructor(public payload: { documents: Document[] }) {}
}

export class UpsertDocuments implements Action {
  readonly type = DocumentActionTypes.UpsertDocuments;

  constructor(public payload: { documents: Document[] }) {}
}

export class UpdateDocument implements Action {
  readonly type = DocumentActionTypes.UpdateDocument;

  constructor(public payload: { document: Update<Document> }) {}
}

export class UpdateDocuments implements Action {
  readonly type = DocumentActionTypes.UpdateDocuments;

  constructor(public payload: { documents: Update<Document>[] }) {}
}

export class DeleteDocument implements Action {
  readonly type = DocumentActionTypes.DeleteDocument;

  constructor(public payload: { id: string }) {}
}

export class DeleteDocuments implements Action {
  readonly type = DocumentActionTypes.DeleteDocuments;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearDocuments implements Action {
  readonly type = DocumentActionTypes.ClearDocuments;
}

export type DocumentActions =
 LoadDocuments
 | AddDocument
 | UpsertDocument
 | AddDocuments
 | UpsertDocuments
 | UpdateDocument
 | UpdateDocuments
 | DeleteDocument
 | DeleteDocuments
 | ClearDocuments;
