import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../Service/master.service';
import * as alertify from 'alertifyjs'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent implements OnInit {

  constructor(private service: MasterService, public dialogref: MatDialogRef<ModalpopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  desdata: any;
  respdata: any;
  editdata: any;

  ngOnInit(): void {
    this.loadDes();
    if (this.data.empcode != null && this.data.empcode != '') {
      this.LoadEditData(this.data.empcode);
    }
  }

  loadDes() {
    this.service.GetDes().subscribe(result => {
      this.desdata = result;
    });
  }

  LoadEditData(code: any) {
    this.service.GetEmployeebycode(code).subscribe(item => {
      this.editdata = item;
      this.Reactiveform.setValue({
        username: this.editdata.username, firstname: this.editdata.firstname, lastname: this.editdata.firstname, email: this.editdata.email,
        birthdate: this.editdata.birthdate, basicsalary: this.editdata.basicsalary, status: this.editdata.status, group: this.editdata.group, description: this.editdata.description
      })
    });
  }

  Reactiveform = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    username: new FormControl("", Validators.required),
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    birthdate: new FormControl("", Validators.required),
    basicsalary: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required),
    group: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required)
  });
  SaveEmployee() {
    if (this.Reactiveform.valid) {
      this.service.Save(this.Reactiveform.value.username).subscribe(result => {
        this.respdata = result;
        if (this.respdata.result == 'pass') {
          alertify.success("saved successfully.")
          this.dialogref.close();
        }
      });

    } else {
      alertify.error("Please Enter valid data")
    }
  }

}
