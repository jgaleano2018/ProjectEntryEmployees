import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee.component';

/**
 * Modulo que registra los submodulos que se importan desde el component HomeComponent.
 */
@NgModule({
  declarations: [ EmployeeComponent ],
  imports: [
    ReactiveFormsModule,
    CommonModule, EmployeeComponent/*,
    PagesRoutingModule*/
  ]/*,
  exports: [PagesRoutingModule]*/
})
export class EmployeeModule {
}
