import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/management.interfaces';
import { ApiService } from 'src/app/core/api.service';

@Injectable()
export class DocumentTabService {
  
  constructor(private store: Store<AppState>, private api: ApiService) { }

  public getDocumentStats() {
    return this.store.select(state => state.management.documentStats);
  }

  public getSelectedTab() {
    return this.store.select(state => state.management.selectedTab);
  }

  public selectTab(tab: string) {
    this.store.dispatch({ type: 'TAB_SELECTED', payload: tab });
  }

  public selectId(id: number) {
    this.store.dispatch({ type: 'DOCUMENT_SELECTED', payload: id });
  }

  public getSelectedId() {
    return this.store.select(state => state.management.selectedId);
  }
}
