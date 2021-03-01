import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class ProductApi extends ApiService<Product> {}
