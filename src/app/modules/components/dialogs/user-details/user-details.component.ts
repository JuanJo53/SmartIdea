import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../services/user_services/user.service";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  constructor(private userService: UserService,public matDialogRef: MatDialogRef<UserDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: {userid: number}) { }

  ngOnInit(): void {
    this.loadprofile();
  }
  cancel() {
    this.matDialogRef.close();
  }

  loadprofile(){
    this.userService.getUserDeatails(this.data.userid).subscribe(value => {
      this.user=value;
    })
  }
}
