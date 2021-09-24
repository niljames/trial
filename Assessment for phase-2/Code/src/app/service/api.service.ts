import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_product: string = "http://localhost:3000/product_details/";
  api_user: string = " http://localhost:3000/users/";

  constructor(private http: HttpClient) { }

  postFoodItem(data: any) {
    return this.http.post<any>(this.api_product, data).pipe(map((res: any) => {
      return res;
    }))
  }

  getFoodItem() {
    return this.http.get<any>(this.api_product).pipe(map((res: any) => {
      return res;
    }))
  }

  UpdateFoodItem(data: any, id: number) {
    return this.http.put<any>(this.api_product + id, data).pipe(map((res: any) => {
      return res;
    }))
  }

  DeleteFoodItem(id: number) {
    return this.http.delete<any>(this.api_product + id).pipe(map((res: any) => {
      return res;
    }))
  }

  postLogin(data: any) {
    return this.http.post<any>(this.api_user, data).pipe(map((res: any) => {
      return res;
    }))
  }

  getLogin() {
    return this.http.get<any>(this.api_user).pipe(map((res: any) => {
      return res;
    }))
  }

  UpdateLogin(data: any, id: number) {
    return this.http.put<any>(this.api_user + id, data).pipe(map((res: any) => {
      return res;
    }))
  }

  DeleteLogin(id: number) {
    return this.http.delete<any>(this.api_user + id).pipe(map((res: any) => {
      return res;
    }))
  }


}
