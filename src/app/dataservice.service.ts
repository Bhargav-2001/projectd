import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData1() {
    return this.http.get<any>('https://myapi-b7ad2-default-rtdb.asia-southeast1.firebasedatabase.app/data.json');
  }

  getDetails(empId: string) {
    return this.http.get<any>('https://myapi-b7ad2-default-rtdb.asia-southeast1.firebasedatabase.app/data/'+empId+'.json  ' );
  }
}
