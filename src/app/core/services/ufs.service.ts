import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUf } from '../interfaces/uf.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UfsService {
  private api = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  constructor(private http: HttpClient) { }

  getUfs(): Observable<IUf[]> {
    return this.http.get<IUf[]>(this.api).pipe(
      tap( response => {
        // console.log('tap response: ', response);
        // console.log('Length response: ', response.length);
      })
    );
  }
}
