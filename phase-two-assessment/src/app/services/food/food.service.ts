import { Injectable, Inject } from '@angular/core';
import { Food } from 'src/app/shared/models/food';
import { Tag } from 'src/app/shared/models/tag';

import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';


@Injectable({
  providedIn: 'root'
})

export class FoodService {
  tempdata = new Array();
  getFoodById(id: number): Food {
    return this.getAll().find(food => food.id == id)!;
  }

  getAllFoodsBySearchTerm(searchTerm: string): Food[] {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  getAllTags(): Tag[] {
    return [
      { name: 'All' },
      { name: 'Basic' },
      { name: 'Vegetables' },
      { name: 'Milk' },
      { name: 'Cereals' },
      { name: 'Meat' },
      { name: 'Fruits' },
      { name: 'Nuts' },
      { name: 'Eggs' },
      { name: 'Bread' },
    ]
  }
  getAllFoodsByTag(tag: string): Food[] {
    return tag == "All" ? this.getAll() : this.getAll().filter(food => food.tags?.includes(tag));
  }


  getAll() {
    this.getFood(0);
    return this.tempdata;
  }


  constructor(private http: HttpClient, private api: ApiService) {
  }



  getFood(i: number) {
    this.http.get(this.api.api_product).subscribe((data: any) => {
      data.forEach((element: Food[]) => {
        this.tempdata[i++] = (element);
      });
    })


  }
}
