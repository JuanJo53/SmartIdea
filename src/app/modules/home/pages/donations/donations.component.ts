import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../../../services/user_services/card.service';
import { Card } from '../../../../models/card.model';
import { IProjects } from '../../../../models/projects.model';
import { ProjectsService } from '../../../../services/user_services/projects.service';
import { User} from '../../../../models/user.model';
import {UserService} from '../../../../services/user_services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
})
export class DonationsComponent implements OnInit{
  project: IProjects;
  projectid = this.activatedRoute.snapshot.params.id;
  userId: number = parseInt(localStorage.getItem('userId'));

  constructor(
    private projectService: ProjectsService,
    private cardService: CardService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.projectid);
    this.loadproject();
}
  loadproject() {
    this.projectService
      .getProject(this.projectid, this.userId)
      .subscribe((data) => {
        this.project = data;
        console.log('PROJECT: ' + this.project);
      });
  }
}
