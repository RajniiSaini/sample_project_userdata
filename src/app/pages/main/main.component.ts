import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/dialog/confirm-dialog/confirm-dialog.component';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AppComponent } from 'src/app/app.component';
import * as globals from '../../global'
import {
  MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';


export interface PeriodicElement {
  id: number;
  avatar: any;
  email: string;
  first_name: string;
  last_name: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AppComponent },
  ]
})

export class MainComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('createModal') createModal!: TemplateRef<any>;
  @ViewChild('updateModal') updateModal!: TemplateRef<any>;

  //grouping the commons
  searchUserForm: FormGroup;
  createUserForm: FormGroup
  updateUserForm: FormGroup

  person: any
  resultsLength = 0;

  isLoadingResults = true;
  isRateLimitReached = false;

  displayedColumns: string[] = ['sn', 'id', 'name', 'email', 'gender', 'status', 'actions']

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  genders: any = [{
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }]

  statuses: any = [{
    value: 'active',
    label: 'Active'
  },
  {
    value: 'inactive',
    label: 'Inactive'
  }]

  constructor(
    private service: CmsService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.searchUserForm = new FormGroup({
      search: new FormControl('')
    })
    this.createUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(globals.REGX_EMAIL)]),
      status: new FormControl('', [Validators.required]),
    })
    this.updateUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(globals.REGX_EMAIL)]),
      status: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getPerson()
    this.searchUserForm.controls['search'].valueChanges.pipe().subscribe((val) => {
      this.applyFilter(val)
    })
  }

  notification(value: any, splash: string = 'close') {
    this._snackBar.open(`${value}`, `${splash}`, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  getPerson() {
    this.service.getUser().subscribe((val) => {
      this.person = new MatTableDataSource<PeriodicElement>(val)
      console.log(this.person)
      this.person.sort = this.sort;
    })
  }

  deleteUser(id: number, name: string) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Person',
        message: `Are you sure, you want to remove an person ${name}`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.deleteUser(id).subscribe(() => {
          this.getPerson()
        })
      }
    });
  }

  userPatchValue(user: any) {
    this.updateUserForm.controls['name'].patchValue(user.name)
    this.updateUserForm.controls['email'].patchValue(user.email)
    this.updateUserForm.controls['gender'].patchValue(user.gender)
    this.updateUserForm.controls['status'].patchValue(user.status)
  }

  updateUser(id: any, user: any) {
    this.userPatchValue(user)
    const dialog = this.dialog
    dialog.open(this.updateModal).afterClosed().subscribe(result => {
      if (result === true) {
        delete this.updateUserForm.value.gender
        this.service.updateUser(id, this.updateUserForm.value).pipe().subscribe({
          complete: () => {
            this.getPerson()
            this.notification('User Updated Successfully!')
          },
          error: () => this.notification('Some Went Wrong')
        })
      }
    })
    console.log(user)
  }

  createUser() {
    const dialog = this.dialog
    dialog.open(this.createModal).afterClosed().subscribe(result => {
      if (result === true) {
        const personObj = this.createUserForm.value
        this.service.createUser(personObj).pipe().subscribe({
          complete: () => this.notification('User Created Successfully!'),
          error: () => this.notification('Some Went Wrong')
        })
        console.log(this.createUserForm)
        console.log(personObj)
      }
      if (result === false) console.log('not submitted')
      this.createUserForm.reset()
    })
  }


  applyFilter(value?: any) {
    const filterValue = value;
    this.person.filter = filterValue.trim().toLowerCase();
  }

}
