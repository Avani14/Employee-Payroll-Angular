import { Component, OnInit } from '@angular/core';
import { EmpServiceService } from '../../emp-service.service';
import {IEmployee} from '../../employee';

@Component({
  selector: 'app-emp-display',
  templateUrl: './emp-display.component.html',
  styleUrls: ['./emp-display.component.css']
})
export class EmpDisplayComponent implements OnInit {
  employee:any;
  message:any;
  id: any;
  constructor(private empSerive: EmpServiceService) { }
  public deleteEmployees(id:number){
    this.empSerive.deleteEmployee(id)
      .subscribe(arg => this.message = arg);
      window.location.reload();
  }
  ngOnInit(): void {
    this.empSerive.getEmployee().subscribe(arg => this.employee = arg);
    console.log(this.employee);
  }
  displayedColumns = ['name','gender','department','salary','start_date','actions']

}
