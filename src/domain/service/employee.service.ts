import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeClass } from 'src/data/class/employee.class';

/**
 * Servicio que contiene los métodos para consumir los servicios de tipo api/rest de compromisos al backEnd.
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private _httpClient: HttpClient,
    private _httpClientBypassInterceptor: HttpBackend
  ) { }

  /**
   * Este método recibe el número de identificación del Cliente y el tipo de documento para consultar los créditos del Cliente.
   * @returns Rerorna la respuesta del set de datos de los créditos del Cliente.
   */
  public getEmployees(): Observable<EmployeeClass> {
    const params = new HttpParams()
    return this._httpClient.get<EmployeeClass>('http://localhost:4200/employees', { params });
  }

  /**
   * Este método recibe el número de identificación del Cliente y el tipo de documento para consultar los créditos del Cliente.
   * @param id Número del documento del Cliente.
   * @param idType Tipo de documento del Cliente.
   * @returns Rerorna la respuesta del set de datos de los créditos del Cliente.
   */
  public getEmployeesId(id: string): Observable<EmployeeClass> {
    const params = new HttpParams()
      .set('id', id);
    return this._httpClient.get<EmployeeClass>('http://localhost:4200/employee/{id}', { params });
  }

  /**
   * En este método se recibe el modelo de los compromisos generados y se guarda las observaciones de la gestión de los compromisos del Cliente.
   * @param dataRequest Modelo con los compromisos generados.
   * @returns Retorna la respuesta de la gestión del guardado de las observaciones de los compromisos.
   */
  public saveEmployee(dataRequest: EmployeeClass) {
    return this._httpClient.post<EmployeeClass>('http://localhost:4200/employee', dataRequest);
  }

    /**
   * En este método se recibe el modelo de los compromisos generados y se guarda las observaciones de la gestión de los compromisos del Cliente.
   * @param dataRequest Modelo con los compromisos generados.
   * @returns Retorna la respuesta de la gestión del guardado de las observaciones de los compromisos.
   */
    public deleteEmployee(idEmployee: any) {
      return this._httpClient.delete('http://localhost:4200/employee/'+idEmployee);
    }
  
}
