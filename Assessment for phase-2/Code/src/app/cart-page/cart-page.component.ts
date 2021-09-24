import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../shared/models/cartItem';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  date!: Date;


  constructor(private cartService: CartService, private route: Router) {
    this.setCart();
  }

  handler: any = null;

  ngOnInit(): void {
    this.loadStripe();
    this.date = new Date();
    this.date.setDate(this.date.getDate() + 2);
  }




  pay() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JaFRgSC1tqaOG4n6Yqw1ecAJbe8C6E8xvxoVsW5JSu4jJqtPgU3uWO9mUMDllwVJw884wLHPhjc5mwwCdZL576l00KtVFiOGC',
      locale: 'auto',
      token: function (token: any) {
        console.log("Token id: ", token.id)
        alert("Payment Successful!\nToken id:" + token.id);
      }
    });
    handler.open({
      name: 'Payment Gateway',
      description: 'Please enter the details',
      amount: this.cart.totalPrice * 100
    });
    this.loadStripe();

  }

  loadStripe() {

    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JaFRgSC1tqaOG4n6Yqw1ecAJbe8C6E8xvxoVsW5JSu4jJqtPgU3uWO9mUMDllwVJw884wLHPhjc5mwwCdZL576l00KtVFiOGC',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log("Token id: ", token.id)
            alert("Payment Success. ");

          }
        });
      }

      window.document.body.appendChild(s);
    }

  }
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
    this.setCart();
  }

  setCart() {
    this.cart = this.cartService.getCart();
  }


}
