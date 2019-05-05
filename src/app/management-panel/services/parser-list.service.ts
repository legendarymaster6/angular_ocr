import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/management.interfaces';
import { ApiService } from 'src/app/core/api.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { formatNumber } from '@angular/common';
import { Parser } from 'src/app/core/interfaces';

@Injectable()
export class ParserListService {
  
    constructor(private store: Store<AppState>, private api: ApiService) { }

    public loadParserList() {
        this.api.getParsers()
            .subscribe((parsers: Parser[]) => {
                this.store.dispatch({ type: 'PARSERS_ARRIVED', payload: parsers });
            });
    }

    public getParserListVM() {
        return this.store.select(state => state.management.parserList)
            .pipe(map((parsers: Parser[]) => {
                return parsers
                    .map((parser: Parser) => {
                        return {
                            parser_id: parser.parser_id,
                            name: parser.name,
                        }
                    })
            }));
    }
}
