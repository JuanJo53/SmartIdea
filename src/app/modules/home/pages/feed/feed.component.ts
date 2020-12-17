import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../../services/user_services/projects.service';
import { IProjects } from '../../../../models/projects.model';
import {Media} from '../../../../models/media.model';
import {ReferencesService} from '../../../../services/user_services/references.service';
import {MediaService} from '../../../../services/user_services/media.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  listProjects: IProjects[];
  projectDetails: IProjects[];
  clicked = false;
  filterProject = '';
  constructor(private service: ProjectsService, private mediaService: MediaService) {}
  media: Media[];
  ngOnInit(): void {
    this.loadlist();
  }
  loadlist() {
    this.service.getAllProjectsfeed().subscribe((data) => {
      this.listProjects = data;
    });
  }

  afilarse(idproyect: number, proyect: IProjects): void {

    const iduser = parseInt(localStorage.getItem('userId'));
    this.service
      .afiliarproyect(idproyect, iduser, proyect)
      .subscribe((projects) => {
        console.log(projects);
      });
    window.alert('logrado');
  }

  viewProject(projectId: number): void {

    const iduser = parseInt(localStorage.getItem('userId'));
    this.projectDetails = this.listProjects.filter(
      (project) => project.projectsId == projectId
    );
    this.service
      .viewProject(iduser, this.projectDetails[0], projectId)
      .subscribe((project) => {
        console.log('View increased in poject with id: ' + projectId);
        console.log(project);
      });
    console.log('VIEW');
  }

conexion(projectId: number): void{

  var iduser = parseInt(localStorage.getItem('userId'));
  this.service.yaexiste(projectId, iduser).subscribe(value => {
    console.log(value)
  return value});
}
}
