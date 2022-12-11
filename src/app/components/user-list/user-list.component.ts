import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.interface';
import { ApiService } from 'src/app/services/api.service';
import { ComcomService } from 'src/app/services/comcom.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
	users: User[] = [];

	constructor(
		private apiService: ApiService,
		private cc: ComcomService,
		private route: Router
	) {}

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers() {
		this.apiService.getUsers()
		.subscribe( users => this.users = users )
	}

	editUser( id: number ) {
		this.cc.userEvent( id )
		this.route.navigateByUrl(`add-user/${id}`)
	}

	deleteUser( id: number ) {

		this.apiService.deleteUser( id ).subscribe();
		this.getUsers();

	}

	addOrder( userId: number ) {
		let orderId!: number;
		this.apiService.addOrder( userId ).subscribe( response => {
			this.route.navigateByUrl(`order/` + response.id)
		})
	}

}
