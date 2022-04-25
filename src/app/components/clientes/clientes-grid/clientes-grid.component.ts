import { ConfirmationDialogComponent } from './../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IDialog } from './../../../core/interfaces/dialog.interface';
import { Component, OnInit } from '@angular/core';
import { ICliente } from '../cliente.interface';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-clientes-grid',
  templateUrl: './clientes-grid.component.html',
  styleUrls: ['./clientes-grid.component.scss']
})
export class ClientesGridComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'tipo', 'nomeFantasia', 'razaoNome', 'cnpjCpf', 'logradouro', 'numero', 'bairro', 'cep', 'uf', 'fone', 'email'];
  clientes: ICliente[] = [];
  cliente!: ICliente;

  constructor(
    public clienteService: ClienteService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe( (response) => {
      this.clientes = response;
      // this.clientes = response.filter( resp => resp.nomeFantasia == 'Print');
    });
  }

  // edit(id: Number):void {
  //   console.log('edit ID:', id);
  // }

  delete(cliente: ICliente):void {
    const dialogData: IDialog = {
      cancelText: 'Cancel',
      confirmText: 'Deletar',
      content: `Deletar ${cliente.razaoNome} ?`
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '600px',
      height: '200px'
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.clienteService.deleteCliente(cliente).subscribe( response => {
          // evita chamada ao backend filtrando os clientes
          //this.clientes = this.clientes.filter(item => item != cliente);
          this.getClientes();
        });
      }
    })

  }

}
