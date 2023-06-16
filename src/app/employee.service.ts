import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 export interface Employee { 
  
 
  'EmployeeName': any;
   'Dedalus ID': any;
   'HL Designation':any;
   'Location':any;
   'HLRole':any;
   'HLTitle':any;
   'Employee_MailId':any;
   'Manager Email':any;
   'Owning':any;
   'Product':any;
  
   

}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private dataUrl = 'http://nhsappchna6210.cscidp.net/rdb/api/employee?co=';

  constructor(private http: HttpClient) {}

  getData(id:any): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.dataUrl+id);
  }
}
