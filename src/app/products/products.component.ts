import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductApi, CartApi } from '../api';
import { Product, Cart } from '../entities';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productApi: ProductApi,
    private cartApi: CartApi
  ) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.productApi.findMany('products');
  }

  public gotoProductDetails(product: Product): void {
    this.router.navigate([product._id], { relativeTo: this.route });
  }

  public async addToCart(cart: Cart): Promise<void> {
    delete cart._id;
    await this.cartApi.save('carts', cart);
    alert('Successfully Added to Cart');
  }
}
