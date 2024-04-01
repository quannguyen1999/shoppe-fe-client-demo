import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private widthSubject = new BehaviorSubject<number>(window.innerWidth);
  width$ = this.widthSubject.asObservable();
  
  constructor() {
    this.handleResize();
   }

  @HostListener('window:resize', ['$event'])
  handleResize() {
    this.widthSubject.next(window.innerWidth);
  }

  getWidth(): number {
    return this.widthSubject.value;
  }
}
