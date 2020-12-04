import { Component, OnInit } from '@angular/core';
import { IProjects } from '../../../../models/projects.model';
import { ActivatedRoute } from '@angular/router';
import { ReferencesService } from '../../../../services/user_services/references.service';
import { MediaService } from '../../../../services/user_services/media.service';
import { Media } from '../../../../models/media.model';

@Component({
  selector: 'app-reference-by-id',
  templateUrl: './reference-by-id.component.html',
  styleUrls: ['./reference-by-id.component.css'],
})
export class ReferenceByIdComponent implements OnInit {
  project: IProjects;
  media: Media[];
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    private service: ReferencesService,
    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadproject();
    this.loadmedia();
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
