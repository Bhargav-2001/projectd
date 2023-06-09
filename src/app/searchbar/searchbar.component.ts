import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  searchQuery: string = '';
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getData().subscribe(data => {
      console.log(data);
      if (typeof data === 'object') {
        const dataArray = Object.values(data);
        this.employees = dataArray.map(employee => ({ ...employee, visible: false }));
        this.filteredEmployees = this.employees;
      } else {
        console.error('Invalid data format: Expected an object.', data);
      }
    });
  }

  onInputChange() {
    if (this.searchQuery.length >= 1) {
      this.filteredEmployees.forEach(employee => {
        const query = this.searchQuery.toLowerCase();
        const match = (
          employee['Employee ID'].includes(query) ||
          employee['Employee Name'].toLowerCase().includes(query) ||
          employee['Dedalus ID'].toLowerCase().includes(query)
        );
        employee.visible = match;
      });
    } else {
      this.filteredEmployees.forEach(employee => {
        employee.visible = false;
      });
    }
  }
}
