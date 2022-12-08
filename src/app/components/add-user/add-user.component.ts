import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.interface';
import { ApiService } from 'src/app/services/api.service';
import { ComcomService } from 'src/app/services/comcom.service';


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
	uploadedFiles: any[] = [];

  date2!: Date;
  dates!: Date[];
  rangeDates!: Date[];
  minDate!: Date;
  maxDate!: Date;
  invalidDates!: Array<Date>
  userFormData: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    birthDate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    carrier: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.minLength(3)]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private cc: ComcomService,
    private route: ActivatedRoute,
	private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.checkIfId();

    this.populateUser();

	this.getUsers();

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today,invalidDate];

  }

  onUpload(event: any) {
	for(let file of event.files) {
		this.uploadedFiles.push(file);
	}

	this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

  checkIfId() {
	this.cc.userIdSubject.subscribe( id => this.id = id )
	console.log('this.id ->', this.id)
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
			  carrier: [ user.corrier ],
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
