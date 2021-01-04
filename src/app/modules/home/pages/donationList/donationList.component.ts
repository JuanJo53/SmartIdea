import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../../../../services/user_services/projects.service';
import {IProjects} from '../../../../models/projects.model';
import { ActivatedRoute } from '@angular/router';
import {ReferencesService} from '../../../../services/user_services/references.service';

@Component({
  selector: 'app-donationList',
  templateUrl: './donationList.component.html',
  styleUrls: ['./donationList.component.css'],
})
export class DonationListComponent implements OnInit {
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
