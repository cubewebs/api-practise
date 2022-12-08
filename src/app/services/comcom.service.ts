import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComcomService {

  public userIdSubject = new Subject<number>();

  constructor() { }

  userEvent( id: number ) {
    this.userIdSubject.next( id )
  }
}
