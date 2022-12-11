import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.interface';
import { ApiService } from 'src/app/services/api.service';
import { ComcomService } from 'src/app/services/comcom.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [MessageService]
})
export class AddUserComponent implements OnInit {

	users: User[] = [];
  	user!: User;
  	id!: number;
	edit: boolean = false;
 	subs?: Subscription;
	fileToUpload: any[] = [];
  
	userFormData: FormGroup = this.fb.group({
		first_name: ['', [Validators.required, Validators.minLength(3)]],
		last_name: ['', [Validators.required, Validators.minLength(3)]],
		birthDate: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		carrier: ['', [Validators.required, Validators.minLength(3)]],
		address: ['', [Validators.required, Validators.minLength(3)]],
		city: ['', [Validators.required]],
		country: ['', [Validators.required]],
		zip: ['', [Validators.required]],
		avatar: new FormData()
	})

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private cc: ComcomService,
    private route: ActivatedRoute,
	private messageService: MessageService,
	private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.checkIfId();

    this.populateUser();

	this.getUsers();

  }

  base64Extract = async ($event: any) => new Promise( ( resolve,reject ) => {
		try {
			const unsafeImg = window.URL.createObjectURL($event);
			const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
			const reader = new FileReader();
			reader.readAsDataURL($event);
			reader.onload = () => {
				resolve({
					base: reader.result
				});
			};
		} catch (error) {
			console.error(error);
		}
  } )	

  onUpload(event: any) {
		this.fileToUpload = event.files[0]
		this.base64Extract(this.fileToUpload[0]);
		this.userFormData.controls['formData'].setValue('avatar', this.fileToUpload[0]);
		this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
	}

  checkIfId() {
	this.cc.userIdSubject.subscribe( id => this.id = id )
  }

  fieldIsInvalid( field: string ) {
    return this.userFormData.controls[field].invalid
           &&
           this.userFormData.controls[field].touched
  }

  getUsers() {
	  this.apiService.getUsers().subscribe( users => this.users = users )
  }

  addUser() {
    if(this.userFormData.invalid) {
      this.userFormData.markAllAsTouched;
      return;
    }
    this.apiService.addUser(this.userFormData.value)
    .subscribe( response => console.log('response ->', response));
	this.userFormData.reset();
  }

  deleteUser( user: User) {
    this.apiService.deleteUser(user.id)
    .subscribe()
    this.getUsers();
  }

  populateUser() {
	
    this.subs = this.route.paramMap.subscribe( params => {
		this.id = Number(params.get('id'))
	  });

	  if(this.id < 1) {
		this.edit = false;
		return;
	  } else {
		this.edit = true;
		this.apiService.getUserById(this.id).subscribe( user => {
			this.userFormData = this.fb.group({
			  firstName: [ user.first_name ],
			  lastName: [ user.last_name ],
			  birthDate: [ user.birthDate ],
			  email: [ user.email ],
			  corrier: [ user.corrier ],
			  address: [ user.address ],
			  city: [ user.city ],
			  country: [ user.country ],
			  zip: [ user.zip ],
			})
		  });
	  }

  }

  updateUser() {

  }


}
