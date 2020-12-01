import { Component, OnInit } from '@angular/core';
import {Card} from '../../../../models/card.model';
import {CardService} from '../../../../services/user_services/card.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {ProjectsService} from '../../../../services/user_services/projects.service';
import {CreateProjectComponent} from '../../../components/dialogs/create-project/create-project.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  listCard: Card[];

  constructor(private service: CardService, private activatedRoute: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadlist();
  }

  loadlist() {
    this.service.getAllCard().subscribe(data => {
      this.listCard = data;
    });
  }
}
