import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../environments/environment';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { ICliente } from 'src/app/components/clientes/cliente.interface';
import { CLIENTES  } from '../../mock-clientes';
import { MessageService } from './message.service';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // private baseUrl = 'api/clientes';
  private baseUrl = `${environment.baseUrl}/clientes`;

  // loading = false;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private matSnackBar: MatSnackBar
    ) { }

  // buscando de arquivo json e utilizando o operador of para transformar CLIENTES em observable
  // getClientes(): Observable<ICliente[]> {
  //   const clientes = of(CLIENTES)
  //   this.messageService.add('ClienteService: Clientes Selecionados');
  //   return clientes;
  // }

  // buscando api mock json-server
  // GET /clientes
  getClientes(): Observable<ICliente[]> {
    // this.loading = true;
    // this.messageService.add('ClienteService: Clientes Selecionados');
    return this.http.get<ICliente[]>(this.baseUrl).pipe(
      tap( response => { this.log(`${response.length} Cliente(s) Selecionado(s)`)}),
      // finalize( () => this.loading = false)
    );
  }

  // GET /clientes/id
  getCliente(id: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.baseUrl}/${id}`).pipe(
      tap( response => {
        // this.log(`${response.id}) ${response.nomeFantasia} - selecionado`);
      })
    );
  }

  createCliente(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(this.baseUrl, cliente).pipe(
      tap( (cliente) => {
        this.matSnackBar.open(`Registro: ${cliente.razaoNome} - Criado com sucesso`, '',{duration: 3000, panelClass:'success-snackbar'});
        this.log(`${cliente.id}) ${cliente.nomeFantasia} - Criado`);
      })
    );
  }

  updateCliente(cliente: ICliente): Observable<ICliente> {
    return this.http.put<ICliente>(`${this.baseUrl}/${cliente.id}`, cliente).pipe(
      tap( (cliente) => {
        this.matSnackBar.open(`Registro: ${cliente.razaoNome} - Alterado com Sucesso`, '',{duration: 3000, panelClass:'success-snackbar'});
        this.log(`${cliente.id}) ${cliente.nomeFantasia} - Alterado`);
      })
    );
  }

  // DELETE /clientes/id
  deleteCliente(cliente: ICliente): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${cliente.id}`).pipe(
      tap( () => {
        this.matSnackBar.open(`Registro: ${cliente.razaoNome} - Excluido com sucesso`, '',{duration: 3000, panelClass:'danger-snackbar'});
        this.log(`${cliente.id}) ${cliente.nomeFantasia} - deletado`);
      })
    );
  }

  private log(message: string, id?: number, nomeFantasia?: string): void {
    message && id && nomeFantasia ? this.messageService.add(`${id}) ${nomeFantasia} -  ${message}`) : this.messageService.add(`ClienteService: ${message}`);
  }

}
