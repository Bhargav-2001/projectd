import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  searchQuery: string = '';
  employees: Employee[] = [];
  index:number=-1;
  showNoEmployeesFound: boolean = false;
empid:any;
  constructor(private employeeService: EmployeeService,private router: Router) {}

  ngOnInit() {
    this.employeeService.getData().subscribe(data => {
      console.log(data);
      if (typeof data === 'object') {
        const dataArray = Object.values(data);
        this.employees = dataArray.map(employee => ({ ...employee, visible: false }));
        console.log("data after", this.employees);
      } else {
        console.error('Invalid data format: Expected an object.', data);
      }
    });
  }
  navigateToEmployeeDetails(employeeId: any) {
    this.router.navigate(['/details', employeeId]);
  }
  
  onSearch() {
    if (this.searchQuery.length >= 3) {
      this.employees.forEach((employee,index) => {
        const query = this.searchQuery.toLowerCase();
        this.index=index;
        const employeeId = employee['Employee ID']?.toString().toLowerCase();
        const employeeName = employee['Employee Name']?.toString().toLowerCase();
        const dedalusId = employee['Dedalus ID']?.toString().toLowerCase();
        employee.visible =
          employeeId?.includes(query) ||
          employeeName?.includes(query) ||
          dedalusId?.includes(query);
      });

      this.showNoEmployeesFound = this.employees.every(employee => !employee.visible);
    } else {
      this.employees.forEach(employee => {
        this.index=-1;
        employee.visible = false;
      });
      this.showNoEmployeesFound = false;
    }
  }
  
}
