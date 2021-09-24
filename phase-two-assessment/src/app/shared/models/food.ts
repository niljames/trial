import { FormBuilder, FormGroup } from '@angular/forms';
export class Food{

    id!:number;
    name!:string;
    price!:number;
    price_ext!:string;
    tags?:string;
    imageUrl!: string;

}