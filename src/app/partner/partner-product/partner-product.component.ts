import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/components/utils/MyErrorStateMatcher';
import { CurrentUser } from 'src/app/services/authentication.service';
import { Product } from 'src/app/models/Product';
import { Session } from 'src/app/models/Session';
import { ProductService } from 'src/app/services/product.service';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/models/Menu';

@Component({
  selector: 'app-partner-product',
  templateUrl: './partner-product.component.html',
  styleUrls: ['./partner-product.component.scss']
})
export class PartnerProductComponent implements OnInit {
  title: string;
  buttonTitle: string;
  inputPlaceholderName = 'Insira o nome';
  inputPlaceholderDescription = 'Insira a descrição';
  inputPlaceholderPrice = 'Insira o preço';
  inputPlaceholderPhoto = 'Insira a foto';
  inputPlaceholderOnPromotion = 'Em promoção';
  inputPlaceholderPromotionalDiscount = 'Insira o desconto promocional';
  inputPlaceholderActive = 'Ativo';
  inputPlaceholderPreparationTime = 'Insira o tempo de preparo';
  inputPlaceholderSession = 'Escolha a seção do produto';

  product: Product;
  zero = 0;

  nameFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  descriptionFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  priceFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  photoFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  startValue = 0;

  promotionalDiscountFormControl: FormControl = new FormControl(this.startValue, [
  ]);

  preparationTimeFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  sessionFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  active = false;
  onPromotion = false;

  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  sessions: Session[] = [];
  productForm: FormGroup;
  newroute: boolean;

  constructor(
    private productApi: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private menuApi: MenuService
    ) {
      this.newroute = this.route.snapshot.url[this.zero].path === 'novo';
      this.buttonTitle = this.newroute ? 'Cadastrar' : 'Atualizar';

      this.productForm = this.formBuilder.group({
        name: this.nameFormControl,
        description: this.descriptionFormControl,
        price: this.priceFormControl,
        photo: this.photoFormControl,
        promotionalDiscount: this.promotionalDiscountFormControl,
        preparationTime: this.preparationTimeFormControl,
        session: this.sessionFormControl,
      });

      if (!this.newroute) {
        this.getProduct(this.route.snapshot.params.id);
      }
  }

  submit() {
    if (this.newroute) {
      this.register();
    } else {
      this.update();
    }

  }

  async register() {
    let currentUser: CurrentUser;
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.productForm.valid) {
      this.product = {
        nome: this.productForm.value.name,
        descricao: this.productForm.value.description,
        preco: this.productForm.value.price,
        foto: this.productForm.value.photo,
        empromocao: this.onPromotion,
        descontopromocional: this.productForm.value.promotionalDiscount,
        tempopreparo: this.productForm.value.preparationTime,
        estabelecimento: currentUser.estabelecimentoId,
        secao: this.productForm.value.session,
        ativo: this.active,
      };

      this.productApi.create(this.product).subscribe(() => {
        alert('Produto Cadastrado');
        this.router.navigate(['/parceiro/cardapio']);
      });
    }
  }


  async update() {
    if (this.productForm.valid) {
      this.product = {
        id: this.product.id,
        nome: this.productForm.value.name,
        descricao: this.productForm.value.description,
        preco: this.productForm.value.price,
        foto: this.productForm.value.photo,
        empromocao: this.onPromotion,
        descontopromocional: this.productForm.value.descontopromocional,
        tempopreparo: this.productForm.value.preparationTime,
        estabelecimento: this.product.estabelecimento,
        secao: this.productForm.value.session,
        ativo: this.active,
      };

      this.productApi.update(this.product).subscribe(() => {
        alert('Produto Atualizado');
        this.router.navigate(['/parceiro/cardapio']);
      });
    }
  }

  // convenience getter for easy access to form fields
  get form() { return this.productForm.controls; }

  getProduct(id: number) {
   this.productApi.getById(id)
    .subscribe((data: Product) => {
      this.product = data[this.zero];
      this.nameFormControl.setValue(this.product.nome);
      this.descriptionFormControl.setValue(this.product.descricao);
      this.priceFormControl.setValue(this.product.preco);
      this.photoFormControl.setValue(this.product.foto);
      this.onPromotion = this.product.empromocao;
      this.promotionalDiscountFormControl.setValue(this.product.descontopromocional);
      this.preparationTimeFormControl.setValue(this.product.tempopreparo);
      this.active = this.product.ativo;
// tslint:disable-next-line: no-construct
      const productSession: any = JSON.parse(sessionStorage.getItem('productSession'));
      this.sessionFormControl.setValue(productSession.session);
    });
  }

  yourOnUploadHandler(event: { originalUrl: string; }) {
    this.photoFormControl.setValue(event.originalUrl);
  }

  ngOnInit() {
    this.route
    .data
    .subscribe(data => {
      this.title = data.title;
    });

    let currentUser: CurrentUser;
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    this.menuApi.getById(currentUser.cardapioId).subscribe((data: Menu) => {
      this.sessions = data[this.zero].secoes;
    });
  }

}
