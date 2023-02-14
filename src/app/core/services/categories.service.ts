import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from '../models/category.models';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }
  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/categories`);
  }
  getCategory(id: string) {
    return this.http.get<Category>(`${environment.url_api}/categories/${id}`);
  }
  createCategory(data: Partial<Category>) {
    return this.http.post<Category>(`${environment.url_api}/categories`, data);
  }
  updateCategory(id: string, data: Partial<Category>) {
    return this.http.put<Category>(`${environment.url_api}/categories/${id}`, data);
  }
  checkCategory(name: string) {
    return this.http.get(`${environment.url_api}/categories`)
    .pipe(
      map((response: any) => {
        // console.log(response, 'RESPUESTA OBTENIDA Y PASADA POR EL MAP');
        const isAvailable = {
          isAvailable: false
        }
        const existsCategoryName = response.some((category) => category.name === name);
        if (!existsCategoryName) isAvailable.isAvailable = true
        return isAvailable
      })
    )
  }
}
