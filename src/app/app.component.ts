import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadDocuments, LoadComments } from './actions/api.actions';
import * as fromState from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngrx-playground';

  users$ = this.store.pipe(select(fromState.getAllUsers));
  comments$ = this.store.pipe(select(fromState.getAllComments));
  documents$ = this.store.pipe(select(fromState.getAllDocuments));

  constructor(private store: Store<fromState.State>) {
    this.store.dispatch(new LoadComments({ documentId: 1 }));
    this.store.dispatch(new LoadComments({ documentId: 2 }));
    this.store.dispatch(new LoadDocuments());
  }
}
