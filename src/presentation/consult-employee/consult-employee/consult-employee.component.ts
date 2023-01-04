import { Component, OnInit } from '@angular/core';
import { EmployeeClass } from 'src/data/class/employee.class';
import { CountryService } from 'src/domain/service/country.service';
import { EmployeeService } from 'src/domain/service/employee.service';

@Component({
  selector: 'app-consult-employee',
  templateUrl: './consult-employee.component.html',
  styleUrls: ['./consult-employee.component.css']
})
export class ConsultEmployeeComponent implements OnInit {
  employeesArray: EmployeeClass[];
  constructor(private _employeeService: EmployeeService,
    private _countryService: CountryService) { 
    this.employeesArray = [];
    }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit(): void {
    this._employeeService.getEmployees().subscribe(data => {
      this.employeesArray = data as unknown as EmployeeClass[]
    });
  }

  deleteEmployee(IdEmployee: any): void {
    this._employeeService.deleteEmployee(IdEmployee);
  }
}
