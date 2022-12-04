import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MenubarModule} from 'primeng/menubar';

import { SharedRoutingModule } from './shared-routing.module';
import { MenubarComponent } from './menubar/menubar.component';


@NgModule({
  declarations: [
    MenubarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MenubarModule
  ],
  exports: [
    MenubarModule,
    MenubarComponent
  ]
})
export class SharedModule { }
