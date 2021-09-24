import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (this.isLoggedIn())
      return true;
    this.router.navigate(['noaccess']);
    return false;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('isLoggedIn') == 'true')
      return true;
    return false;
  }



}