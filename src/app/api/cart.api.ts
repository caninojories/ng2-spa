import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Cart } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class CartApi extends ApiService<Cart> {}
