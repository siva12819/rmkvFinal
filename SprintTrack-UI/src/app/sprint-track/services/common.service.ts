import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  handleError: any;
  uploadTempFile(formData: FormData) {
    throw new Error('Method not implemented.');
  }
  getDocumentPathView(objView: any) {
    throw new Error('Method not implemented.');
  }
  getAPIWithParams(formData: FormData, api_name: any, arg2: string, arg3: string) {
    throw new Error('Method not implemented.');
  }
  private ticketData: any | null = null;

  private userData: any;

  setTicket(data: any): void {
    this.ticketData = data;
  }

  getTicket(): any | null {
    return this.ticketData;
  }

  clearTicket(): void {
    this.ticketData = null;
  }

  setUser(data: any) {
    this.userData = data;
  }
  getUser() {
    return this.userData;
  }

  clearUser() {
    this.userData = null;
  }


}
