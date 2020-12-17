import { Component, OnInit } from '@angular/core';
import {ReferencesService} from "../../../../services/user_services/references.service";
import {MediaService} from "../../../../services/user_services/media.service";
import {ActivatedRoute} from "@angular/router";
import {AreaService} from "../../../../services/user_services/area.service";
import {IProjects} from "../../../../models/projects.model";
import {Media} from "../../../../models/media.model";
import {Area} from "../../../../models/area.model";
import {Tag} from "../../../../models/tag.model";
import {Skill} from '../../../../models/skill.model';
import {SkillService} from '../../../../services/user_services/skill.service';

import { TagsService } from '../../../../services/user_services/tags.service';

@Component({
  selector: 'app-project-preview-owner',
  templateUrl: './project-preview-owner.component.html',
  styleUrls: ['./project-preview-owner.component.css']
})
export class ProjectPreviewOwnerComponent implements OnInit {
  project: IProjects;
  media: Media[];
  listArea: Area[];
  listTags: Tag[];

  skills: Skill[];
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    private service: ReferencesService,
    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute,
    private areaService: AreaService,
    private tagservise: TagsService,
  private serviceSkill: SkillService,
  ) { }


  ngOnInit(): void {
    this.loadproject();
    this.loadmedia();
    this.listarea();
    this.loadSkillList();
    this.listag();
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
  loadSkillList(): Skill[] {
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id);
    this.serviceSkill.getSkillsproject(id).subscribe((data) => {
      this.skills = data;
    });
    return this.skills;
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
  debugBase64(base64URL){
    let win = window.open();
    win.document.write('<img src="' + base64URL  + '" width="500" height="500"></img>');
  }

  listag(){
     const id = this.activatedRoute.snapshot.params.id;
     console.log(id);
     this.tagservise.gettagproject(id).subscribe((data) => {
       this.listTags = data;
     });
  }
}
