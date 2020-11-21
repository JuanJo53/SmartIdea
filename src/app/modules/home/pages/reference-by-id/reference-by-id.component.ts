import { Component, OnInit } from '@angular/core';
import {Projects} from "../../../../models/projects.model";
import { ActivatedRoute } from '@angular/router';
import {ReferencesService} from "../../../../services/user_services/references.service";

@Component({
  selector: 'app-reference-by-id',
  templateUrl: './reference-by-id.component.html',
  styleUrls: ['./reference-by-id.component.css']
})
export class ReferenceByIdComponent implements OnInit {
  project: Projects;

  constructor(private service: ReferencesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarTienda();
  }
  cargarTienda(){
    const id = this.activatedRoute.snapshot.params.id;
    this.service.getProject(id).subscribe(
      data => {
        this.project = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
