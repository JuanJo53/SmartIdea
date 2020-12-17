import { Component, OnInit, OnDestroy } from '@angular/core';
import { Card } from '../../../../models/card.model';
import { CardService } from '../../../../services/user_services/card.service';
import { CreateCardComponent } from '../../../components/dialogs/create-card/create-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditCardComponent } from '../../../components/dialogs/edit-card/edit-card.component';
import { WarningDialogComponent } from '../../../components/dialogs/warning-dialog/warning-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  listCard: Card[];
  displayedColumns: string[] = [
    'Nombre',
    'Numero',
    'Expiracion',
    'id_card',
  ];
  form: FormGroup;
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    private fromBuilder: FormBuilder,
    private cardService: CardService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadlist();
  }

  loadlist() {
    this.cardService.getAllCard(this.userId).subscribe((data) => {
      this.listCard = data;
    });
  }
  createCard(): void {
    const dialogRef = this.dialog.open(CreateCardComponent, {
      width: '500px',
      data: {
        status: 1,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  editcard(card: number): void {
    console.log('CARDS:' + card);
    const dialogRef = this.dialog.open(EditCardComponent, {
      width: '500px',
      data: {
        cardId: card
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  deleteCard(id: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '500px',
      data: {
        message: '¿Esta seguro que desea eliminar la tarjeta de crédito?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.cardService.deleteCard(this.userId, id).subscribe((rta) => {
          console.log(rta);
        });
        console.log('Deleted');
      }
      location.reload();
      // this.ngOnDestroy();
    });
  }
}
