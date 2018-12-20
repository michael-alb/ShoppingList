import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ShoppingListService } from './../../services/shopping-list/shopping-list';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Item } from '../../models/item/item.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>

  constructor(public navCtrl: NavController, private shoppingListService: ShoppingListService) {

    this.shoppingList$ = this.shoppingListService
      .getShoppingList()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map( c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      )

  }

}
