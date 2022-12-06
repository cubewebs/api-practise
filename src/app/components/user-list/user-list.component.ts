import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
	users: User[] = [];

	constructor(
		private apiService: ApiService,
	) {}

	ngOnInit(): void {
		this.apiService.getUsers()
		.subscribe( users => this.users = users )
	}

}
