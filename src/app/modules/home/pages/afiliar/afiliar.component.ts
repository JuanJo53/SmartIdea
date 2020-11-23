import { Component, OnInit } from '@angular/core';
import {IProjects} from '../../../../models/projects.model';
import {AfiliarService} from '../../../../services/user_services/afiliar.service';

@Component({
  selector: 'app-references',
  templateUrl: './afiliar.component.html',
  styleUrls: ['./afiliar.component.css']
})
export class AfiliarComponent implements OnInit {
  listProjects: IProjects[];
  constructor(private service: AfiliarService) { }


  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllAfiliar().subscribe(data => {
      this.listProjects = data;
    });
  }
}
