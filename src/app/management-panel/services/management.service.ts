import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/management.interfaces';

@Injectable()
export class ManagementService {

  constructor(private store: Store<AppState>) { }
}
