import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  [x: string]: any;

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;

  getTickets() {
    return this.http.get(this.apiUrl + 'Sprint/ListTicket');
  }

  saveTicket(data: any) {
    return this.http.post(this.apiUrl + 'MonthlyStatement/SaveTicket', data);
  }

  getUsers() {
    return this.http.get(this.apiUrl + 'MonthlyStatement/ListUser');
  }

  saveUser(data: any) {
    return this.http.post(this.apiUrl + 'MonthlyStatement/SaveUser', data);
  }

  saveProfile(data: any) {
    return this.http.post(this.apiUrl + 'MonthlyStatement/SaveProfile', data);
  }
  getProfile() {
    return this.http.get(this.apiUrl + 'MonthlyStatement/ListProfile');
  }
  activeProfile(data: any) {
    return this.http.post(this.apiUrl + 'MonthlyStatement/ProfileActive', data);
  }

  activeUser(data: any) {
    return this.http.post(this.apiUrl + 'MonthlyStatement/UserActive', data);
  }

  uploadTempFile(formData: any) {
    return this.http.post(this.apiUrl + "Sprint/UploadTempFile", formData)
      .pipe(catchError(this['handleError']));
  }

  getDocumentPathView(obj: any) {
    return this.http.post(this.apiUrl + "Shared/GetDocumentPathView", obj)
      .pipe(catchError(this['handleError']));
  }
  getAPIWithParams(obj: any) {
    return this.http.post(this.apiUrl + "Shared/GetDocumentPathView", obj)
      .pipe(catchError(this['handleError']));
  }


}
