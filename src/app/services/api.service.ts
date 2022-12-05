import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:4200/'

  constructor(
    private http: HttpClient
  ) { }

  addUser( user: User ) {
    const url = `${this.baseUrl}Resp/data`;
    this.http.post<User>( url, user );
  }

}
