import { Component }                      from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';


import { Items }                          from '../../providers';
import { Item }                           from '../../models';
import { ItemDetailPage }                 from '../item-detail/item-detail';
import { ItemCreatePage }                 from '../item-create/item-create';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
    this.currentItems = this.items.query();
  }

  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  deleteItem(item) {
    this.items.delete(item);
  }

  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
