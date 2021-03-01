import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductApi } from '../../api';
import { Product } from '../../entities';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public product: Product;

  constructor(private route: ActivatedRoute, private productApi: ProductApi) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (param: ParamMap) => {
      const id = param.get('id');
      this.product = await this.productApi.findOne(`products/${id}`);
    });
  }
}
