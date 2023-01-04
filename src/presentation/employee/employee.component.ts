import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/domain/service/country.service';
import { EmployeeService } from 'src/domain/service/employee.service';
import { Country } from 'src/data/interface/country.interface'
import { EmployeeClass } from 'src/data/class/employee.class'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  //form: FormGroup;
  form: any;
  submitted = false;
  id: number = 0;
  dominio: any;
  countryFilter: any;
  employeeArray: EmployeeClass[];
  countryArray: Country[];

  constructor(private formBuilder: FormBuilder,
              private _employeeService: EmployeeService,
              private _countryService: CountryService) {
    this.setForm();
    this.employeeArray = [];
    this.countryArray = [];
  }

  setForm() {
    this.form = this.formBuilder.group(
      {
        identificationCard: ['', Validators.required],
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20),
            Validators.pattern('^(?=.*[A-Z])+$')
          ]
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20),
            Validators.pattern('^(?=.*[A-Z])+$')
          ]
        ],
        otherName: [
          '',
          [
            Validators.minLength(1),
            Validators.maxLength(50),
            Validators.pattern('^(?=.*[A-Z])+$')
          ]
        ],
        email: [{value: '', disabled : false},
          [
            Validators.minLength(1),
            Validators.maxLength(300)
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      }/*,
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }*/
    );
  }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    //console.log(JSON.stringify(this.form.value, null, 2));

    this._employeeService.getEmployees().subscribe(data => {
      this.employeeArray = data as unknown as EmployeeClass[]
    });

    this._countryService.getCountries().subscribe(data => {
      this.countryFilter = data as unknown as Country[]
    });

    if (this.countryFilter[0].name === 'Colombia') {
      this.dominio = 'cidenet.com.co';
    }
    else {
      this.dominio = 'cidenet.com.us';
    }

    let employeeClass: EmployeeClass = new EmployeeClass(0, this.form.get('identificationCard').value.value,
    this.form.get('firstName').value,this.form.get('lastName').value.value, 
    this.form.get('otherName').value.value, this.form.get('email').value.value, this.dominio);


    let count = this.employeeArray.filter(entry => entry.firstName === employeeClass.firstName
      && entry.lastName === employeeClass.lastName
      && entry.email.indexOf(this.dominio)>0
      ).length;

    if (count > 0) {
      this.id = count++;
    }
    else {
      this.id = 0;
    }

    let employeeEnd: EmployeeClass = new EmployeeClass(this.id, this.form.get('identificationCard').value.value,
    this.form.get('firstName').value,this.form.get('lastName').value.value, 
    this.form.get('otherName').value.value, this.form.get('email').value.value, this.dominio);

    this._employeeService.saveEmployee(employeeEnd).subscribe(
      res => {
        alert('Registro creado exitosamente');
      },
      () => {
        alert('Se presentó un error al crear el Empleado');
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
