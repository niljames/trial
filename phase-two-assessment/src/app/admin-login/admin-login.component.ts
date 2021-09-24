import { Component, OnInit } from '@angular/core';
import { adminLogin } from './admin-login.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { adminModel } from '../admin-portal/admin-portal.model';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  formValue!: FormGroup;
  adminLoginObj: adminLogin = new adminLogin();
  adminLoginData!: any;
  adminData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  login = new Array();
  row_id!: number;
  loginData: adminLogin[] = [];

  constructor(private formbuilder: FormBuilder, private api: ApiService, private httpClient: HttpClient, private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id: 0,
      username: [''],
      email: [''],
      password: ['']
    })
    this.getLoginDetails();
    this.loginData = this.loginService.getAll();
  }

  back() {

    this.router.navigateByUrl('admin');

  }
  clickAddBtn() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  AddDetails() {
    this.adminLoginObj.id = this.loginData.length + 1;
    this.adminLoginObj.username = this.formValue.value.username;
    this.adminLoginObj.email = this.formValue.value.email;
    this.adminLoginObj.password = this.formValue.value.password;
    this.api.postLogin(this.adminLoginObj).subscribe(res => {
      console.log(res);
      alert("New Account Added Successfully!");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getLoginDetails();
    },
      err => {
        alert("Something went wrong");
      })
  }


  getLoginDetails() {
    this.api.getLogin().subscribe(res => {
      this.adminData = res;
    })
  }


  deleteLogin(row: any) {
    this.api.DeleteLogin(row.id).subscribe(res => {
      alert("Login Details deleted!");
      this.getLoginDetails();
    })
  }


  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.adminLoginObj.id = row.id;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['username'].setValue(row.username);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['password'].setValue(row.password);
  }


  updateLogin() {
    this.adminLoginObj.id = this.formValue.value.id;
    this.adminLoginObj.username = this.formValue.value.username;
    this.adminLoginObj.email = this.formValue.value.email;
    this.adminLoginObj.password = this.formValue.value.password;

    this.api.UpdateLogin(this.adminLoginObj, this.adminLoginObj.id).subscribe(res => {
      alert("Update Done Successfully!");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getLoginDetails();
    })
  }

  tempdata = new Array();
  getData(i: number) {
    this.httpClient.get(this.api.api_user).subscribe((data: any) => {
      data.forEach((element: adminModel[]) => {
        this.tempdata[i++] = (element);
      });
    })

  }
}

