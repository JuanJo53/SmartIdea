import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../../../../services/user_services/projects.service';
import {IProjects} from '../../../../models/projects.model';

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.css']
})
export class MyprojectsComponent implements OnInit {
  listProjects: IProjects[];
  constructor(private service: ProjectsService) { }

  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllProjects().subscribe(data => {
      this.listProjects = data;
    });
}

}
