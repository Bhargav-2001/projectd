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
  showNoEmployeesFound: boolean = false;
  searchClicked: boolean = false;
  searchErrorMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {}

  change() {
    this.searchClicked = false;
    if (this.searchQuery.length >= 3) {
      this.searchErrorMessage = '';
    }
  }

  navigateToEmployeeDetails(employee: any) {
    this.router.navigate(['/details', employee.EmployeeCode]);
  }

  onSearch() {
    if (this.searchQuery.length >= 3) {
      this.employeeService.getData(this.searchQuery).subscribe(
        (data: Employee[]) => {
          this.employees = data;
          this.showNoEmployeesFound = this.employees.length === 0;
          this.searchClicked = true;
        },
        (error) => {
          console.error('Error fetching employee data:', error);
          this.employees = [];
          this.showNoEmployeesFound = true;
          this.searchClicked = true;
        }
      );
      this.searchErrorMessage = '';
    } else {
      this.employees = [];
      this.showNoEmployeesFound = false;
      this.searchClicked = true;
      this.searchErrorMessage = 'Minimum 3 characters are required for search.';
    }
  }
}
