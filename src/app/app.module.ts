import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Prime NG module
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { SharedModule } from './shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddUserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    ButtonModule,
	CardModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
	InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
