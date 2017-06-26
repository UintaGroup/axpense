import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseDetailPage } from './expense-detail';

@NgModule({
  declarations: [
    ExpenseDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseDetailPage),
  ],
  exports: [
    ExpenseDetailPage
  ]
})
export class ExpenseDetailPageModule {}
