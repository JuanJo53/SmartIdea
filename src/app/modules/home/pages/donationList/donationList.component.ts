import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../../../models/card.model';
import { CardService } from '../../../../services/user_services/card.service';
import { IProjects } from '../../../../models/projects.model';
import { ProjectsService } from '../../../../services/user_services/projects.service';
import {MatDialog} from '@angular/material/dialog';
import {Donation} from '../../../../models/donation.model';
import {DonationService} from '../../../../services/user_services/donation.service';
import {BillDetailComponent} from '../../../components/dialogs/bill-detail/bill-detail.component';

@Component({
  selector: 'app-donationList',
  templateUrl: './donationList.component.html',
  styleUrls: ['./donationList.component.css'],
})
export class DonationListComponent implements OnInit {
  listDonation: Donation[];
  card: Card;
  project: IProjects;
  displayedColumns: string[] = [
    'Proyecto',
    'Descripcion',
    'Fecha de Donación',
    'Tarjeta',
    'Monto donado',
    'id_card',

  ];
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    private service: DonationService,
    private cardService: CardService,
    private projectService: ProjectsService,
    public dialog: MatDialog)
  {}

  ngOnInit() : void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllDonation(this.userId).subscribe((data)=>
    {
      this.listDonation = data;
    });
}
}
