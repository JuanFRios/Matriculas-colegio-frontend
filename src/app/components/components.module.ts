import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    CardComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    RouterModule
  ]
})
export class ComponentsModule { }
