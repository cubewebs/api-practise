import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.interface';
import { Order } from '../../models/Order.interface';
import { Transport } from '../../models/Transport.interface';
import { Package } from '../../models/Package.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';



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
	orderId!: number;
	order!: Order;
	pkgId!: number;
	packages: Package[] = [];
	selectedPackage!: Package;


	packageFormData: FormGroup = this.fb.group({
		id: [],
		netWeight: [],
		grossWeight: [],
        description: [''],
		transport: [''],
        status: [''],
		orderId: [this.orderId]
	})


	constructor(
		private fb: FormBuilder,
		private apiService: ApiService,
		private route: ActivatedRoute
	) { 
		
		this.transports = [
			{type: 'Truck'},
			{type: 'Train'},
			{type: 'Ship'},
			{type: 'Airplain'},
		]
	}

	ngOnInit(): void { 
		this.route.paramMap.subscribe( params => {
			let id = Number(params.get('id'))
			this.orderId = id;
		})

		this.apiService.getOrderById(this.orderId).subscribe( order => this.order = order)

		this.apiService.getPackages(this.orderId).subscribe( packages => this.packages = packages)

		this.packageFormData.reset({
			netWeight: 0,
			grossWeight: 0,
			description: '',
			transport: {'type': 'Airplain'},
			status: 'created',
			orderId: this.orderId
		})
	}

	fieldIsInvalid( field: string ) {
		return this.packageFormData.controls[field].invalid
			   &&
			   this.packageFormData.controls[field].touched
	}

	onSelectPkg(i: number) {
		this.selectedPackage = this.packages[i];
		this.isPackage = true;
		console.log('this.selectedPackage ->', this.selectedPackage)
		this.packageFormData.reset(this.selectedPackage)
		this.pkgId = this.packages[i].id;
	}

	addPackage() { 
		this.isPackage = true;
		this.apiService.addPackage(this.packageFormData.value).subscribe( pkg => {
			this.packages.push(pkg)
			console.log('pkg ->', pkg)
			this.pkgId = pkg.id;
			this.selectedPackage = pkg
		} );
		
	}

	submit() { 
		this.apiService.updatePkg(this.selectedPackage).subscribe( pkg => console.log('pkg ->', pkg) );
	}


}
