import { Component, OnInit } from '@angular/core';
import {ReferencesService} from '../../../../services/user_services/references.service';
import {Projects} from '../../../../models/projects.model';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit {
  listProjects: Projects[];
  constructor(private service: ReferencesService) { }


  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllReferences().subscribe(data => {
      this.listProjects = data;
    });
  }
}
