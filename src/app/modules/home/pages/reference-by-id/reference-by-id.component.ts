import { Component, OnInit } from '@angular/core';
import { IProjects } from '../../../../models/projects.model';
import { ActivatedRoute } from '@angular/router';
import { ReferencesService } from '../../../../services/user_services/references.service';
import { MediaService } from '../../../../services/user_services/media.service';
import { Media } from '../../../../models/media.model';
import {Area} from '../../../../models/area.model';
import {AreaService} from '../../../../services/user_services/area.service';

@Component({
  selector: 'app-reference-by-id',
  templateUrl: './reference-by-id.component.html',
  styleUrls: ['./reference-by-id.component.css'],
})
export class ReferenceByIdComponent implements OnInit {
  project: IProjects;
  media: Media[];
  listArea: Area[];
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    private service: ReferencesService,
    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute,
    private areaService: AreaService
  ) {}

  ngOnInit(): void {
    this.loadproject();
    this.loadmedia();
    this.listarea();
  }

  listarea(): void{
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id);
    this.areaService.getarea(id).subscribe(data => {
      console.log(data);
      this.listArea = data;
    });
    /*.subscribe((data) => {
      this.listProjects = data;
    });*/
  }
  loadproject(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.service.getProject(this.userId, id).subscribe(
      (data) => {
        this.project = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadmedia(): void {
    const idpr = this.activatedRoute.snapshot.params.id;
    this.mediaService.getmedia(idpr).subscribe((data) => {
      this.media = data;
    });
  }
}
