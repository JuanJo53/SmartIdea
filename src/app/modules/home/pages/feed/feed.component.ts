import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../../../../services/user_services/projects.service';
import {IProjects} from '../../../../models/projects.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  listProjects: IProjects[];
  constructor(private service: ProjectsService) { }

  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllProjectsfeed().subscribe(data => {
      this.listProjects = data;
    });
  }
}
