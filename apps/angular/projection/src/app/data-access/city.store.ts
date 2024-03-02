import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  citys = signal<City[]>([]);

  addAll(citys: City[]) {
    this.citys.set(citys);
  }

  addOne(city: City) {
    this.citys.update((citys) => [...citys, city]);
  }

  deleteOne(id: number) {
    this.citys.update((citys) => citys.filter((s) => s.id !== id));
  }
}
