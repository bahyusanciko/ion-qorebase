import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetPage } from './budget.page';

import { BudgetPageRoutingModule } from './budget-routing.module';
import { CreatePageModule } from "./create/create.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BudgetPageRoutingModule,
    CreatePageModule
  ],
  declarations: [BudgetPage]
})
export class BudgetPageModule {}
