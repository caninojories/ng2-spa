import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../entities';

interface IGetUrlPromise {
  [url: string]: any;
}

const getUrlPromises: IGetUrlPromise = {};

@Injectable({
  providedIn: 'root',
})
export class ApiService<Entity> extends HttpClient {
  async getData(url: string, refresh: boolean): Promise<Entity>;
  async getData(url: string, refresh: boolean): Promise<Entity[]>;

  async getData(url: string, refresh: boolean): Promise<Entity | Entity[]> {
    if (!refresh && getUrlPromises[url]) {
      return getUrlPromises[url];
    }

    const response: Response = (await this.get(url).toPromise()) as Response;
    getUrlPromises[url] = (response as unknown) as Entity;

    return getUrlPromises[url];
  }

  async findOne(url: string, refresh = false): Promise<Entity> {
    return (await this.getData(url, refresh)) as Entity;
  }

  async findMany(url: string, refresh = false): Promise<Entity[]> {
    return ((await this.getData(url, refresh)) as unknown) as Entity[];
  }

  async save(url: string, body: Entity): Promise<Entity> {
    return ((await this.post(url, body).toPromise()) as unknown) as Entity;
  }
}
