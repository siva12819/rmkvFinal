import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http : HttpClient) { }
  apiUrl = environment.apiUrl;

  getSprint() {
    return this.http.get(this.apiUrl + 'Sprint/GetAllSprints');
  }

  saveSprint(data: any) {
    return this.http.post(this.apiUrl + 'Sprint/saveSprints', data);
  }
}
