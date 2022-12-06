import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MenubarModule} from 'primeng/menubar';

import { SharedRoutingModule } from './shared-routing.module';
import { MenubarComponent } from './menubar/menubar.component';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    MenubarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MenubarModule,
	InputTextModule
  ],
  exports: [
    MenubarModule,
    MenubarComponent
  ]
})
export class SharedModule { }
