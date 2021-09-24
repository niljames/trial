import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { ApiService } from '../service/api.service';
import { adminModel } from './admin-portal.model';
@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

  formValue!: FormGroup;
  adminModelObj: adminModel= new adminModel();
  adminLoginData!:any;
  adminData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder, private api:ApiService,private ad:AdminLoginComponent) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      id:0,
      name:[''],
      price:0,
      price_ext:[''],
      imageUrl:[''],
      tags:['']
    })
    this.getFoodItem();
  }

  back(){
    this.ad.back();
  }
  clickAddBtn(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postFoodItem(){
    this.adminModelObj.id=this.formValue.value.id;
    this.adminModelObj.name=this.formValue.value.name;
    this.adminModelObj.price=this.formValue.value.price;
    this.adminModelObj.price_ext=this.formValue.value.price_ext;
    this.adminModelObj.imageUrl=this.formValue.value.imageUrl;
    this.adminModelObj.tags=this.formValue.value.tags;

    this.api.postFoodItem(this.adminModelObj).subscribe(res=>{
      console.log(res);
    alert("Food Item Added Successfully!");
    let ref=document.getElementById('cancel');
    ref?.click();
    this.formValue.reset();
    this.getFoodItem();
  },
  err=>{
    alert("Something went wrong");
  })
  }


  getFoodItem(){
    this.api.getFoodItem().subscribe(res=>{
      this.adminData=res;
    })
  }

  deleteFoodItem(row: any){
this.api.DeleteFoodItem(row.id).subscribe(res=>{
  alert("Food Item Deleted Successfully!");
  this.getFoodItem();
})
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.adminModelObj.id=row.id;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['price'].setValue(row.price);
    this.formValue.controls['price_ext'].setValue(row.price_ext);
    this.formValue.controls['imageUrl'].setValue(row.imageUrl);
    this.formValue.controls['tags'].setValue(row.tags);
  }

  updateFoodItem(){
    this.adminModelObj.id=this.formValue.value.id;
    this.adminModelObj.name=this.formValue.value.name;
    this.adminModelObj.price=this.formValue.value.price;
    this.adminModelObj.price_ext=this.formValue.value.price_ext;
    this.adminModelObj.imageUrl=this.formValue.value.imageUrl;
    this.adminModelObj.tags=this.formValue.value.tags;

    this.api.UpdateFoodItem(this.adminModelObj,this.adminModelObj.id).subscribe(res=>{
      alert("Update Done Successfully!");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getFoodItem();
    })
  }
}
