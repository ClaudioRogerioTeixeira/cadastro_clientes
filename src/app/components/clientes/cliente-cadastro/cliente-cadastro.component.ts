import { MunicipiosService } from './../../../core/services/municipios.service';
import { IMunicipio } from './../../../core/interfaces/municipio.interface';
import { IUf } from './../../../core/interfaces/uf.interface';
import { ClienteService } from './../../../core/services/cliente.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CLIENTES } from 'src/app/mock-clientes';
import { ICliente } from '../cliente.interface';
import { Location } from '@angular/common';
import { BACEN } from '../../../shared/bacen';
import { UfsService } from './../../../core/services/ufs.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent implements OnInit, AfterViewInit {
  clientes: ICliente[] = CLIENTES;
  cliente!: ICliente;
  bacen!: { codigo: string, descricao: string }[];
  estados!: IUf[];
  cidades!: IMunicipio[];
  isEditing!: boolean;
  value = '';
  frmCadastro!: FormGroup;

  @ViewChild('titleH1') titleValor!: ElementRef; // HTMLElement;

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private location: Location,
    private ufs: UfsService,
    private municipios: MunicipiosService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.isEditing = false;
    this.bacen = BACEN;

    this.ufs.getUfs().subscribe( (response) => {
      this.estados = response;
    });

    this.initForm();
    this.getCliente();
      }

  initForm() {
    this.frmCadastro = this.fb.group({
      id: new FormControl({ value: 0 }), // , disabled: true
      razaoNome: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      nomeFantasia: new FormControl('', [Validators.minLength(5), Validators.maxLength(60)]),
      tipo: new FormControl('J', [Validators.required]),
      cnpjCpf: new FormControl('', [Validators.required]),

      logradouro: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      numero: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      complemento: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      bairro:new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      cep: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      uf: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      codMun: new FormControl({value: '', disabled: true }, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      codPais: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),

      fone: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),

      email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]),
    });

    this.frmCadastro.get('uf')!.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( uf => {
      const controlMunicipio = this.frmCadastro.get('codMun');
      controlMunicipio!.enable();

      this.municipios.getMunicipios(uf).subscribe( response => {
          this.cidades = response;
      });

    });

  }

  ngAfterViewInit(): void {
    console.log('titleValor: ', this.titleValor.nativeElement.textContent);
  }

  getCliente(): void {
    this.route.params.subscribe( param => {
      // console.log('param: ', param);

      if (param.new === 'new') {
        this.isEditing = false;
      } else {
        this.isEditing = true;
        this.clienteService.getCliente(param.new).subscribe( (cliente) => {
          this.frmCadastro.get('id')?.setValue(cliente.id);
          this.frmCadastro.get('razaoNome')?.setValue(cliente.razaoNome);
          this.frmCadastro.get('nomeFantasia')?.setValue(cliente.nomeFantasia);
          this.frmCadastro.get('tipo')?.setValue(cliente.tipo);
          this.frmCadastro.get('cnpjCpf')?.setValue(cliente.cnpjCpf);
          this.frmCadastro.get('logradouro')?.setValue(cliente.logradouro);
          this.frmCadastro.get('numero')?.setValue(cliente.numero);
          this.frmCadastro.get('complemento')?.setValue(cliente.complemento);
          this.frmCadastro.get('bairro')?.setValue(cliente.bairro);
          this.frmCadastro.get('cep')?.setValue(cliente.cep);
          this.frmCadastro.get('uf')?.setValue(cliente.uf);
          this.frmCadastro.get('codMun')?.setValue(cliente.codMun);
          this.frmCadastro.get('codPais')?.setValue(cliente.codPais);
          this.frmCadastro.get('fone')?.setValue(cliente.fone);
          this.frmCadastro.get('email')?.setValue(cliente.email);
        })
      }

    })
  }

  create(): void {
    const { valid, value } = this.frmCadastro;
    if (valid) {
      const cliente: ICliente = {
        razaoNome: value.razaoNome,
        nomeFantasia: value.nomeFantasia,
        tipo: value.tipo,
        cnpjCpf: value.cnpjCpf,

        logradouro: value.logradouro,
        numero: value.numero,
        complemento: value.complemento,
        bairro: value.bairro,
        cep: value.cep,
        codPais: value.codPais,
        uf: value.uf,
        codMun: value.codMun,

        fone: value.fone,
        email: value.email,
      } as ICliente;
      this.clienteService.createCliente(cliente).subscribe( response => {
        this.location.back();
      })
    }
  }

  update() {
    const { valid, value } = this.frmCadastro;
    if (valid) {
      // this.frmCadastro.controls['id'].enable();
      // const controlId = this.frmCadastro.get('id');
      // controlId!.enable();
      const cliente: ICliente = {
        id: value.id,
        razaoNome: value.razaoNome,
        nomeFantasia: value.nomeFantasia,
        tipo: value.tipo,
        cnpjCpf: value.cnpjCpf,

        logradouro: value.logradouro,
        numero: value.numero,
        complemento: value.complemento,
        bairro: value.bairro,
        cep: value.cep,
        codPais: value.codPais,
        uf: value.uf,
        codMun: value.codMun,

        fone: value.fone,
        email: value.email,
      } as ICliente;
      // debugger
      this.clienteService.updateCliente(cliente).subscribe( response => {

        // controlId!.disable();
        this.location.back();
      })
    }
  }

  goBack(): void {
    this.location.back();
  }

  getColor() {
    if(this.frmCadastro.get('cnpjCpf')?.value) {
      return 'green';
    } else {
      return 'red';
    }
  }

}
