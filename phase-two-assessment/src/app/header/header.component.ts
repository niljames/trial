import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../shared/models/cart';
import { CartService } from '../services/cart/cart.service';
import { adminLogin } from '../admin-login/admin-login.model';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  formValue!: FormGroup;
  searchTerm: String = "";
  adminLoginObj: adminLogin = new adminLogin();
  namechange: string = '';
  loginData: adminLogin[] = [];
  adminData: any;



  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService,
    private formbuilder: FormBuilder,
    private loginService: LoginService, private api: ApiService) {
    this.setCart();

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.searchTerm)
        this.searchTerm = params.searchTerm;
    })
    this.formValue = this.formbuilder.group({
      id: 0,
      username: [''],
      email: [''],
      password: ['']
    })
    this.loginData = this.loginService.getAll();
  }

  search() {
    if (this.searchTerm)
      this.router.navigate(['search/' + this.searchTerm]);
  }
  cart!: Cart;


  setCart() {
    this.cart = this.cartService.getCart();
  }

  AddDetails() {
    this.adminLoginObj.id = this.loginData.length + 1;
    this.adminLoginObj.username = this.formValue.value.username;
    this.adminLoginObj.email = this.formValue.value.email;
    this.adminLoginObj.password = this.formValue.value.password;
    this.api.postLogin(this.adminLoginObj).subscribe(res => {
      console.log(res);
      alert("Account creation successful!");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      window.location.reload();
    },
      err => {
        alert("Something went wrong");
      })
  }


  CheckDetails() {
    this.loginData = this.loginService.getAll();
    const btn1 = <HTMLButtonElement>document.getElementById("login");
    const btn2 = <HTMLButtonElement>document.getElementById("logout");
    for (let i = 0; i < this.loginData.length; i++) {
      if (btn1.innerText == "Login" && this.formValue.value.email === "admin@gmail.com" && this.formValue.value.password === "admin") {
        alert("Admin Login successful!");
        this.router.navigateByUrl('admin');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        const txt = "Welcome " + this.loginData[i].username;
        this.namechange = txt;
        btn1.style.display = "none";
        btn2.style.display = "block";
        localStorage.setItem('isLoggedIn', 'true');
        return;

      }
      else if (btn1.innerText == "Login" && this.loginData[i].email === this.formValue.value.email && this.loginData[i].password === this.formValue.value.password) {
        alert("Login successful!");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.router.navigateByUrl('');
        const txt = "Welcome " + this.loginData[i].username;
        this.namechange = txt;
        btn1.style.display = "none";
        btn2.style.display = "block";
        return;
      }
    }
    alert("Invalid Details");
    return;

  }

  check() {
    const btn1 = <HTMLButtonElement>document.getElementById("login");
    const btn2 = <HTMLButtonElement>document.getElementById("logout");
    btn2.style.display = "none";
    btn1.style.display = "block";
    alert("Succesfully Logged Out!");
    window.location.reload();
    this.namechange = '';
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['home']);


  }


}
