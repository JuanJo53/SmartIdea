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
import {Donation} from '../../../../models/donation.model';
import {DonationService} from '../../../../services/user_services/donation.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
})
export class DonationsComponent implements OnInit{
  donation: Donation;
  project: IProjects;
  projectid = this.activatedRoute.snapshot.params.id;
  donationid = this.activatedRoute.snapshot.params.did;
  userId: number = parseInt(localStorage.getItem('userId'));

  constructor(
    private service: DonationService,
    private userService: UserService,
    private projectService: ProjectsService,
    private cardService: CardService,
    private donationService: DonationService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loaddonation();
    this.loaduser();
    this.loadproject();
    this.loadcard();
}
  loaddonation(){
    const id = this.activatedRoute.snapshot.params.did;
    console.log('Donation ID:'+ id);
    this.service.getDonation(id).subscribe(
      (data)=>{
        this.donation = data;
        console.log(data);
      },
      (err) =>{
        console.log(err);
      }
    );
  }
  loaduser(){

  }
  loadproject(){

  }
  loadcard(){

  }
}
