import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {


  items!: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    
    this.items = [
      {
          label: 'Users',
		      icon: 'pi pi-fw pi-users',
		      routerLink: 'user-list'
      },
      {
          label: 'Add User',
          icon: 'pi pi-fw pi-user-plus',
          routerLink: 'add-user'
      }
  ];
    
  }

}
