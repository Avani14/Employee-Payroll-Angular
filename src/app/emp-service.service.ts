import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {IEmployee} from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {
  private getUrl = 'http://localhost:8081/employeepayroll/getEmployee'
  private addUrl = 'http://localhost:8081/employeepayroll/addEmployee'
  private editUrl= 'http://localhost:8081/employeepayroll/editEmployee/'
  private deleteUrl = 'http://localhost:8081/employeepayroll/deleteEmployee/'
  private getByIdUrl = 'http://localhost:8081/employeepayroll/getEmployeeById/'
  constructor(private http : HttpClient) { }
  public getEmployee(){
    return this.http.get(this.getUrl)
  }
  public getEmployeeById(id:number){
    return this.http.get(this.getByIdUrl+id)
  }
  public addEmployee(employee:IEmployee){
    return this.http.post(this.addUrl,employee,{responseType:'text' as 'json'})
  }
  public editEmployee(employee:IEmployee,id:number){
    return this.http.put(this.editUrl+id,employee,{responseType:'employee' as 'json'})
  }
  public deleteEmployee(id:number){
    return this.http.delete(this.deleteUrl+id)
  }
}
