import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LocalStorageService } from '../directive/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LauncherService {

  apiUrl = environment.apiUrl;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private _httpClient: HttpClient, private _localStorage: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<any>(_localStorage.getAuthToken());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(objUserDetail: any) {
    debugger
    return this._httpClient.post<any>(this.apiUrl + "Auth/login", objUserDetail).pipe(map(result => {
      if (result) {
      }
      return result;
    }));
  }
}
