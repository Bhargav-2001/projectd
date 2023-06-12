import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  empId: any;
  employee: any;

  constructor(
    private fs: DataService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ar.params.subscribe(params => {
      console.log(params)
      this.empId = params['empid'];
      this.readData(this.empId);
    });
  }

  readData(empId: string) {
    this.fs.getDetails(empId).subscribe(
      (employeeData: any) => {
        this.employee = employeeData;
      },
      () => (this.employee = {}) // Handle error case
    );
  }
}
