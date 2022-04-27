import { MunicipiosService } from './../../../core/services/municipios.service';
import { IMunicipio } from './../../../core/interfaces/municipio.interface';
import { IUf } from './../../../core/interfaces/uf.interface';
import { ClienteService } from './../../../core/services/cliente.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CLIENTES } from 'src/app/mock-clientes';
import { ICliente, EMPTY_CLIENTE } from '../cliente.interface';
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
  model: ICliente = JSON.parse(JSON.stringify(EMPTY_CLIENTE));

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
      id: new FormControl(this.model.id), // , disabled: true
      razaoNome: new FormControl(this.model.razaoNome, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      nomeFantasia: new FormControl(this.model.nomeFantasia, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      tipo: new FormControl(this.model.tipo, [Validators.required]),
      cnpj: new FormControl(this.model.cnpj, this.model.tipo === 'J' ? [Validators.required, Validators.minLength(18), Validators.maxLength(18)] : Validators.nullValidator),
      cpf: new FormControl(this.model.cpf, this.model.tipo === 'F' ? [Validators.required, Validators.minLength(14), Validators.maxLength(14)]  : Validators.nullValidator),

      logradouro: new FormControl(this.model.logradouro, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      numero: new FormControl(this.model.numero, [Validators.required, Validators.maxLength(10)]),
      complemento: new FormControl(this.model.complemento, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      bairro:new FormControl(this.model.bairro, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      cep: new FormControl(this.model.cep, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),

      uf: new FormControl(this.model.uf, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      codMun: new FormControl({value: '', disabled: true }, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      codPais: new FormControl(this.model.codPais, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),

      fone: new FormControl(this.model.fone, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),

      email: new FormControl(this.model.email, [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(60)]),
    });

    this.frmCadastro.get('razaoNome')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( razaoNome => {
      if (!razaoNome) { return; }
      this.validField('razaoNome', 60);
      // const control = this.frmCadastro.get('razaoNome');
      // if (razaoNome.length > 60) {
      //   razaoNome = razaoNome.substr(0, 60);
      //   control!.setValue(razaoNome);
      // }
    })

    this.frmCadastro.get('nomeFantasia')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( nomeFantasia => {
      if (!nomeFantasia) { return; };
      this.validField('nomeFantasia', 60);
    })

    this.frmCadastro.get('tipo')!.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( tipo => {
      const controlCnpj = this.frmCadastro.get('cnpj');
      const controlCpf = this.frmCadastro.get('cpf');
      const controlNomeFantasia = this.frmCadastro.get('nomeFantasia');
      if (tipo === 'J') {
        controlCnpj?.setValidators([Validators.required]);
        controlCnpj?.enable();
        controlCpf?.clearValidators();
        controlCpf?.disable();
        controlNomeFantasia?.setValidators([Validators.required]);
        controlNomeFantasia?.enable();
      } else {
        controlCnpj?.clearValidators();
        controlCnpj?.disable();
        controlCpf?.setValidators([Validators.required]);
        controlCpf?.enable();
        controlNomeFantasia?.clearValidators();
        controlNomeFantasia?.disable();
      }
      controlCnpj?.updateValueAndValidity();
      controlCpf?.updateValueAndValidity();
      controlNomeFantasia?.updateValueAndValidity();
    });

    this.frmCadastro.get('logradouro')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( logradouro => {
      if (!logradouro) { return; };
      this.validField('logradouro', 60);
    });

    this.frmCadastro.get('numero')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( numero => {
      if (!numero) { return; };
      this.validField('numero', 10);
    });

    this.frmCadastro.get('complemento')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( complemento => {
      if (!complemento) { return; };
      this.validField('complemento', 10);
    });

    this.frmCadastro.get('bairro')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( bairro => {
      if (!bairro) { return; };
      this.validField('bairro', 30);
    });

    this.frmCadastro.get('cep')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( cep => {
      if (!cep) { return; };
      this.validField('cep', 10);
    });

    this.frmCadastro.get('uf')!.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( uf => {
      const controlMunicipio = this.frmCadastro.get('codMun');
      controlMunicipio!.enable();

      this.municipios.getMunicipios(uf).subscribe( response => {
          this.cidades = response;
      });

    });

  }

  validField(field: string, size: number) {
    const control = this.frmCadastro.get(field);
    if (control?.value.length > size) {
      field = control?.value.substr(0, size);
      control!.setValue(field);
    }
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
          this.frmCadastro.get('cnpj')?.setValue(cliente.cnpj);
          this.frmCadastro.get('cpf')?.setValue(cliente.cpf);
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
        cnpj: value.cnpj,
        cpf: value.cpf,

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
        cnpj: value.cnpj,
        cpf: value.cpf,

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

  // getColor() {
  //   if(this.frmCadastro.get('cnpjCpf')?.value) {
  //     return 'green';
  //   } else {
  //     return 'red';
  //   }
  // }

}
