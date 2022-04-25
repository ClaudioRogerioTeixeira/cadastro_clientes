import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMunicipio } from '../interfaces/municipio.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
  private urlApi = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  constructor(private http: HttpClient) { }

  getMunicipios(uf: string): Observable<IMunicipio[]> {
    return this.http.get<IMunicipio[]>(`${this.urlApi}/${uf}/municipios`).pipe(
      tap( response => {
        console.log('Length response: ', response.length);
        console.log('response getMunicipios: ', response);
      })
    );
  }
}
