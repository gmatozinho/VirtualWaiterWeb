import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralPagesToolbarService {
  private toolbarSubject: Subject<boolean>;

  constructor() {
    this.toolbarSubject = new Subject<boolean>();
  }

  getHeroes(): string {
    return 'works';
  }


  itsLogin(itsLogin: boolean): void {
      this.toolbarSubject.next(itsLogin);
  }

  onToolbar(): Observable<boolean> {
      return this.toolbarSubject;
  }


}
