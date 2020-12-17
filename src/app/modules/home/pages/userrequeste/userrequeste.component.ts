import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model';
import {UserService} from '../../../../services/user_services/user.service';
import {ActivatedRoute} from '@angular/router';
import {IProjects} from '../../../../models/projects.model';
import {ProjectsService} from '../../../../services/user_services/projects.service';

@Component({
  selector: 'app-userrequeste',
  templateUrl: './userrequeste.component.html',
  styleUrls: ['./userrequeste.component.css']
})
export class UserrequesteComponent implements OnInit {
  listuser: User[];
  displayedColumns: string[] = ['Nombre', 'Numero', 'Expiracion', 'id_card'
  ];

  constructor(private service: UserService, private activatedRoute: ActivatedRoute , private servi: ProjectsService) { }

  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    const id = this.activatedRoute.snapshot.params.id;
    this.service.getAlluserrequest(id).subscribe(data => {
      this.listuser = data;
    });
  }
  aceptar( iduser: number ,proyect: IProjects): void{

    const id = this.activatedRoute.snapshot.params.id;
    this.servi.aceptuser(id, iduser , proyect).subscribe((projects) => {
      console.log(projects);
    });
    window.alert("logrado");
    this.ngOnInit();
  }
  reject( iduser: number ,proyect: IProjects): void{

    const id = this.activatedRoute.snapshot.params.id;
    this.servi.rejectuser(id, iduser , proyect).subscribe((projects) => {
      console.log(projects);
    });
    window.alert("logrado");
  }
}
