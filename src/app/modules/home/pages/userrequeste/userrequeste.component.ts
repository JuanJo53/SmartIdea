import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model';
import {UserService} from '../../../../services/user_services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-userrequeste',
  templateUrl: './userrequeste.component.html',
  styleUrls: ['./userrequeste.component.css']
})
export class UserrequesteComponent implements OnInit {
  listuser: User[];

  constructor(private service: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    const id = this.activatedRoute.snapshot.params.id;
    this.service.getAlluserrequest(id).subscribe(data => {
      this.listuser = data;
    });
  }
}
