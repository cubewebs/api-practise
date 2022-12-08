import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User.interface';
import { Observable } from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/'

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {

	const url = `${this.baseUrl}data`;

	return this.http.get<User[]>( url );
	
  }

  addUser( user: User ): Observable<User> {

    const url = `${this.baseUrl}data`;

    return this.http.post<User>( url, user );
	
  }

  deleteUser( user: number ): Observable<User> {

	const url = `${this.baseUrl}data/${user}`;

	return this.http.delete<User>( url );

  }

  updateUser( user: number ): Observable<number> {
	
	const url = `${this.baseUrl}data/${user}`;

	return this.http.put<number>( url, user, httpOptions );
  }

  getUserById( id: number ): Observable<User> {
    const url = `${this.baseUrl}data/${id}`;
    return this.http.get<User>(url)
  }

}
