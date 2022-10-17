import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';
import { Employee } from './Model/Employee';
import { MasterService } from './Service/master.service';
import * as alertify from 'alertifyjs'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'employee-management';
  displayedColumns: string[] = ['id', 'username', 'firstname', 'lastname', 'email', 'birthdate', 'basicsalary', 'status', 'group', 'description'];
  dataSource: any;
  empdata: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: MasterService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.GetAll();
    this.service.RequiredRefresh.subscribe(r => {
      this.GetAll();
    });
  }

  GetAll() {
    this.service.GetEmployee().subscribe(result => {
      this.empdata = result;

      this.dataSource = new MatTableDataSource<Employee>(this.empdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  getrow(row: any) {
    //console.log(row);
  }
  FunctionDetail(id: any) {
    this.OpenDialog('1000ms', '600ms', id)
  }
  FunctionEdit(id: any) {
    this.OpenDialog('1000ms', '600ms', id)
  }
  FunctionDelete(id: any) {
    alertify.confirm("Remove Employee", "Do you want to remove?", () => {
      this.service.Remove(id).subscribe(result => {
        this.GetAll();
        alertify.success("Removed successfully.")
      });

    }, function () {

    })

  }

  OpenDialog(enteranimation: any, exitanimation: any, id: any) {

    this.dialog.open(ModalpopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data: {
        empcode: id
      }
    })
  }


}
