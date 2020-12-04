import { Component, OnInit } from '@angular/core';
import { ReferencesService } from '../../../../services/user_services/references.service';
import { IProjects } from '../../../../models/projects.model';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css'],
})
export class ReferencesComponent implements OnInit {
  listProjects: IProjects[];
  constructor(private service: ReferencesService) {}
  userId: number = parseInt(localStorage.getItem('userId'));

  ngOnInit(): void {
    this.loadlist();
  }
  loadlist() {
    this.service.getAllReferences(this.userId).subscribe((data) => {
      this.listProjects = data;
    });
  }
}
