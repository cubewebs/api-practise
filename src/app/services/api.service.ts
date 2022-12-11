import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User.interface';
import { Observable } from 'rxjs';
import { Package } from '../models/Package.interface';
import { Order } from '../models/Order.interface';

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
// User calls
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

  // Order calls

  addOrder( userId: number ): Observable<Order> {
    const url = `${this.baseUrl}orders`;
    const order = {userId, packages: []}
    return this.http.post<Order>( url,order, httpOptions )
  }

  getOrderById( id: number ): Observable<Order> {
    const url = `${this.baseUrl}orders/${id}`;
    return this.http.get<Order>( url )
  }

  updateOrder( id: number ): Observable<Order> {
    const url = `${this.baseUrl}orders/${id}`;
    return this.http.put<Order>( url, id, httpOptions )
  }


  // Packages calls

  getOrderPackages( orderId: number ): Observable<Package[]> {
    const url = `${this.baseUrl}orders/${orderId}/packages`;
    return this.http.get<Package[]>( url )
  }

  addPackage( pkg: Package ): Observable<Package> {
	const url = `${this.baseUrl}packages`;
	return this.http.post<Package>( url, pkg, httpOptions );
  }

  updatePkg( pkgId: number, pkg: Package): Observable<Package> {
	const url = `${this.baseUrl}packages/${pkgId}`;
	return this.http.put<Package>( url, pkg, httpOptions)
  }


}
