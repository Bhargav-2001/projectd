import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 export interface Employee { 
  'CSC_DoJ':any;
   'Employee ID': any;
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
   'Product Group':any;
   'Product Work Area':any;
   'Reporting Manager':any;
   'Unified Roles':any;
  'Unit':any;
   'Work Group':any;
   visible: boolean;

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
