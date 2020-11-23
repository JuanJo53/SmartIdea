import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user_services/user.service";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.loadprofile();
  }

  loadprofile(){
    this.service.getUserDeatails().subscribe(data=>{
      this.user =  data;
    });
  }

}
