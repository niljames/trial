import { Injectable, Inject } from '@angular/core';
import { adminModel } from 'src/app/admin-portal/admin-portal.model';

import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';


@Injectable({
  providedIn: 'root'
})


export class LoginService {
  tempdata = new Array();

  constructor(private httpClient: HttpClient, private api: ApiService) { }
  getAll() {
    this.getData(0);
    return this.tempdata;
  }
  ngOnInit(): void {
    this.getData(0);
  }

  getData(i: number) {
    this.httpClient.get(this.api.api_user).subscribe((data: any) => {
      data.forEach((element: adminModel[]) => {
        this.tempdata[i++] = (element);
      });
    })
  }
}
