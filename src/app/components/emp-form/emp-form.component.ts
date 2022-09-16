import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IEmployee } from '../../employee';
import { EmpServiceService } from '../../emp-service.service';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.css'],
})
export class EmpFormComponent implements OnInit {
  employeeForm!: FormGroup;
  id: any;
  profileImage1 = '../assets/avatar2.png';
  profileImage2 = '../assets/avatar5.png';
  profileImage3 = '../assets/avatar6.png';
  profileImage4 = '../assets/img_avatar2.png';
  profileImage5 = '../assets/img_avatar.png';
  department = [
    { id: 'HR', value: 'HR' },
    { id: 'Finance', value: 'Finance' },
    { id: 'IT', value: 'IT' },
    { id: 'Sales', value: 'Sales' },
    { id: 'Other', value: 'Other' },
  ];
  department1: Array<String> = ['HR', 'Sales', 'Finance', 'IT', 'Other'];
  selectedDepartment: Array<String> = [];
  deptError: Boolean = true;
  message: any = '';
  employee: IEmployee = new IEmployee('', 0, '', '', '', new Date(), [], '');
  emp: any;

  //
  constructor(
    private _fb: FormBuilder,
    private service: EmpServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeForm = this._fb.group({
      name: [
        null,
        [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$')],
      ],
      profile: [],
      gender: [],
      email: [],
      dept: this.addDepartment(),
      salary: [
        null,
        [Validators.required, Validators.pattern('^[1-9]{1}[0-9]*$')],
      ],
      start_date: [],
      password: [],
      // isUpdate : [false]
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
  }
  getEmployeeByIds(id: number) {
    this.service
      .getEmployeeById(id)
      .subscribe((arg) => (this.emp = arg));
      this.setData(this.emp)
  }
  setData(employee: IEmployee) {
    this.employeeForm.value.name = employee.name
      this.employeeForm.value.salary = employee.salary
      this.employeeForm.value.email = employee.email
      this.employeeForm.value.password = employee.password
      this.employeeForm.value.gender = employee.gender
      this.employeeForm.value.start_date = employee.start_date
      this.selectedDepartment = employee.department
      this.employeeForm.value.profile  =employee.profile;
      // this.employeeForm.value.isUpdate = true
  }
  get departmentArray() {
    return <FormArray>this.employeeForm.get('dept');
  }
  get name() {
    return <FormGroup>this.employeeForm.controls['name'];
  }
  get start_date() {
    return <FormGroup>this.employeeForm.controls['start_date'];
  }
  get salary() {
    return <FormGroup>this.employeeForm.controls['salary'];
  }
  get email() {
    return <FormGroup>this.employeeForm.controls['email'];
  }
  get profile() {
    return <FormGroup>this.employeeForm.controls['profile'];
  }
  get gender() {
    return <FormGroup>this.employeeForm.controls['gender'];
  }
  get password() {
    return <FormGroup>this.employeeForm.controls['password'];
  }
  addDepartment() {
    const arr = this.department1.map((dep) => {
      return this._fb.control(false);
    });
    return this._fb.array(arr);
  }
  submitHandler() {
    console.log(this.employeeForm.value);
    if(this.employeeForm.value.isUpdate)
    this.employee = new IEmployee(
      this.employeeForm.value.name,
      this.employeeForm.value.salary,
      this.employeeForm.value.email,
      this.employeeForm.value.password,
      this.employeeForm.value.gender,
      this.employeeForm.value.start_date,
      this.selectedDepartment,
      this.employeeForm.value.profile
    );
    console.log(this.employee.name);

    let response = this.service.addEmployee(this.employee);
    response.subscribe((data) => (this.message = data));
  }
  getSelectedDepartment() {
    this.selectedDepartment = [];
    this.departmentArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedDepartment.push(this.department1[i]);
      }
    });
    console.log('This is dept 1 :', this.department1[1]);

    console.log(this.selectedDepartment);

    this.deptError = this.selectedDepartment.length > 0 ? false : true;
  }
  resetHandler() {
    this.employeeForm.reset();
  }
  checkIfDeptIsTouched() {
    let flag = false;
    this.departmentArray.controls.forEach((control) => {
      if (control.touched) {
        flag = true;
      }
    });
    return flag;
  }
}
