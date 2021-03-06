import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { MyFormsRoutingModule } from './my-forms-routing.module';
import { MyFormsComponent } from './my-forms.component';

@NgModule({
  declarations: [MyFormsComponent],
  imports: [
    CommonModule,
    MyFormsRoutingModule,
    SharedModule
  ]
})
export class MyFormsModule { }
