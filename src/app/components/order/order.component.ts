import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.interface';
import { Order } from '../../models/Order.interface';
import { Transport } from '../../models/Transport.interface';
import { Package } from '../../models/Package.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

	public defaultValue1: number = 0;
	isPackage: boolean = false;
	transports!: Transport[];
	selectedTransport: Transport[] = [];
	order?: Order;
	packages: Package[] = [];


	packageFormData: FormGroup = this.fb.group({
		id: [],
		netWeight: [],
		grossWeight: [],
        description: [''],
		transport: [''],
        status: ['']
	})


	constructor(
		private fb: FormBuilder,
		private apiService: ApiService
	) { 
		
		this.transports = [
			{type: 'Truck'},
			{type: 'Train'},
			{type: 'Ship'},
			{type: 'Airplain'},
		]
	}

	fieldIsInvalid( field: string ) {
		return this.packageFormData.controls[field].invalid
			   &&
			   this.packageFormData.controls[field].touched
	}

	ngOnInit(): void { 
		this.packageFormData.reset({
			netWeight: 0,
			grossWeight: 0,
			description: '',
			transport: {'type': 'Airplain'},
			status: 'created'
		})
	}

	addPackage() { 
		this.isPackage = true;
		this.apiService.addPackage(this.packageFormData.value).subscribe( pkg => console.log('pkg ->', pkg) );
	}

	submit() { 
		// this.apiService.updatePkg(this.packageFormData?.id).subscribe( pkg => console.log('pkg ->', pkg) );
	}


}
