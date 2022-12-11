import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.interface';
import { Order } from '../../models/Order.interface';
import { Transport } from '../../models/Transport.interface';
import { Package } from '../../models/Package.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';



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


	packageFormData!: FormGroup;


	constructor(
		private fb: FormBuilder,
		private apiService: ApiService,
		private route: ActivatedRoute
	) { 
		
		this.transports = [
			{type: 'Select a Transport'},
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

		this.packageFormData = this.fb.group({
			id: [],
			netWeight: [],
			grossWeight: [],
			description: [],
			transport: ['', [Validators.required]],
			status: ['Created'],
			orderId: [this.orderId]
		})

		this.getOrderPackages();

		this.apiService.getOrderById(this.orderId).subscribe( order => this.order = order)

	}

	fieldIsInvalid( field: string ) {
		return this.packageFormData.controls[field].invalid
			   &&
			   this.packageFormData.controls[field].touched
	}

	getOrderPackages() {
		this.apiService.getOrderPackages(this.orderId)
		.pipe(
			tap( pkg => pkg.forEach( pkg => this.packages.push( pkg )))
		).subscribe( packages => this.packages = packages)
		console.log('this.packages ->', this.packages)
		if(this.packages.length === 0) {
			return;
		} else {
			this.onSelectPkg(0);
		}
	}

	onSelectPkg(i: number) {
		this.selectedPackage = this.packages[i];
		this.isPackage = true;
		console.log('this.selectedPackage ->', this.selectedPackage)
		this.packageFormData.setValue(this.selectedPackage)
		this.pkgId = this.packages[i].id;
	}

	addPackage() { 
		this.packageFormData.reset({
			id: 0,
			netWeight: 0,
			grossWeight: 0,
			description: '',
			transport: '',
			status: 'Created',
			orderId: this.orderId
		});
		this.isPackage = true;
		this.apiService.addPackage(this.packageFormData.value).subscribe( pkg => {
			this.packages.push(pkg)
			this.pkgId = pkg.id;
			this.selectedPackage = pkg;
			console.log('pkg ->', this.selectedPackage)
		} );
		this.getOrderPackages();
	}

	submit() { 
		console.log('submit ->', this.selectedPackage);
		this.selectedPackage = this.packageFormData.value;
		this.apiService.updatePkg(this.pkgId, this.packageFormData.value).subscribe( pkg => console.log('pkg ->', pkg) );
	}


}
