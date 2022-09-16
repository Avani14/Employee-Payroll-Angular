export class IEmployee {
  name: string = ''
  salary: number = 0
  email: string = ''
  password:string = ''
  gender: string = ''
  start_date: Date = new Date()
  department: Array<String> = []
  profile: string = ''
  isUpdate : Boolean = false
  constructor(
  name: string,
  salary: number,
  email: string,
  password:string,
  gender: string,
  start_date: Date,
  department: Array<String>,
  profile: string,
  // isUpdate : Boolean

  ){
    this.name = name;
    this.salary = salary;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.start_date = start_date;
    this.department = department;
    this.profile = profile;
    // this.isUpdate = isUpdate
  }
}
