import { Component, OnInit } from '@angular/core';
import {Card} from '../../../../models/card.model';
import {CardService} from '../../../../services/user_services/card.service';
import {CreateCardComponent} from '../../../components/dialogs/create-card/create-card.component';
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
  constructor(private service: CardService, private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllCard().subscribe(data => {
      this.listCard = data;
    });
  }
  createCard(): void{

    const dialogRef = this.dialog.open(CreateCardComponent, {
      width: '500px',
      data: {
        status : 1
      },
    });
    dialogRef.afterClosed().subscribe((result) => {

      this.ngOnInit();
    });


  }
}
