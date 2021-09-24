import { Food } from "./food";

export class CartItem {
    constructor(food: Food) {
        this.food = food;

    }
    food: Food;
    quantity: number = 1;

    get Price(): number {
        return this.food.price * this.quantity;
    }
}